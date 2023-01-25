import React, { useEffect, useState } from 'react';
import { getAxios, roundUpNumber } from 'utils';
import {
  Box,
  Flex,
  Select,
  Image,
  Text,
  Stack,
  Badge,
  Center,
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { PageHeader, Loading, SortedTable } from 'components';
import { useAuth } from 'contexts';
import { formatDate } from 'utils';
import { NoDataFound } from 'assets/images';

export const Transactions = () => {
  const toast = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [paidBy, setPaidBy] = useState('we');
  const [totalAmount, setTotalAmount] = useState(0);

  const tableHeader = [
    {
      Header: 'Date',
      accessor: 'date',
      isSorted: true,
      sortDescFirst: true,
    },
    {
      Header: 'Category',
      accessor: 'category',
    },
    {
      Header: 'Amount',
      accessor: 'amount',
      isNumeric: true,
    },
    {
      Header: 'Title',
      accessor: 'title',
    },
    {
      Header: 'Paid By',
      accessor: 'paidBy',
    },
    {
      Header: 'Delete',
      accessor: 'delete',
    },
  ];
  const [tableData, setTableData] = useState([]);

  const removeExpense = (id) => {
    const token = user?.token;
    getAxios(token)
      .post(`/api/v1/expenses/remove`, {
        id: id,
      })
      .then((res) => {
        setTableData(tableData.filter((data) => data.id !== id));
        toast({
          title: 'Success!',
          description: 'Delete record successfully!',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: 'Failed!',
          description:
            'We faced some issue removing the row. Please try later!',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    const token = user?.token;
    if (user) {
      setLoading(true);
      if (paidBy === 'we') {
        getAxios(token)
          .get(`/api/v1/expenses/monthly/${selectedYear}-${selectedMonth}`)
          .then((res) => {
            const internalData = [];
            setLoading(false);
            let sum = 0;
            res.data.data.forEach((data) => {
              internalData.push({
                date: formatDate(new Date(data.date), 'DD MMM'),
                category: data.category,
                amount: data.amount,
                title: data.title,
                paidBy: data.paid_by === user.email ? 'Me' : 'Partner',
                delete: <DeleteIcon onClick={() => removeExpense(data.id)} />,
              });
              sum = sum + parseFloat(data.amount);
            });
            setTableData(internalData);
            setTotalAmount(roundUpNumber(sum, 2));
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
      } else {
        getAxios(token)
          .get(
            `/api/v1/expenses/monthly/${selectedYear}-${selectedMonth}/${paidBy}`
          )
          .then((res) => {
            setLoading(false);
            const internalData = [];
            res.data.data.forEach((data) => {
              internalData.push({
                date: formatDate(new Date(data.date), 'DD MMM'),
                category: data.category,
                amount: data.amount,
                title: data.title,
                paidBy: data.paid_by === user.email ? 'Me' : 'Partner',
                delete: <DeleteIcon onClick={() => removeExpense(data.id)} />,
              });
            });
            setTableData(internalData);
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
      }
    }
  }, [user, selectedMonth, selectedYear, paidBy]);

  const updateMonth = (e) => {
    setSelectedMonth(e.target.value);
  };

  const updateYear = (e) => {
    setSelectedYear(e.target.value);
  };

  if (loading) return <Loading />;

  return (
    <Box>
      <PageHeader title="Transactions" />
      <Box paddingBottom={2}>
        <Text> Select Month and Year</Text>
        <Flex gap={2}>
          <Select value={selectedMonth} onChange={(e) => updateMonth(e)}>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </Select>
          <Select value={selectedYear} onChange={(e) => updateYear(e)}>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </Select>
          <Select value={paidBy} onChange={(e) => setPaidBy(e.target.value)}>
            <option value="we">We</option>
            <option value="me">Me</option>
            <option value="partner">Partner</option>
          </Select>
        </Flex>
      </Box>
      {tableData.length > 0 ? (
        <>
          <Box paddingTop={2} paddingBottom={2}>
            <Center>
              <Stack direction="row">
                <Badge variant="outline" colorScheme="green">
                  Total Expense
                </Badge>
                <Badge variant="solid" colorScheme="green">
                  {totalAmount}
                </Badge>
              </Stack>
            </Center>
          </Box>
          <Box maxWidth={'100%'} overflow={'scroll'}>
            <SortedTable columns={tableHeader} data={tableData} />
          </Box>
        </>
      ) : (
        <Box>
          <Flex
            width="100%"
            height="280px"
            justifyContent={'center'}
            alignItems="center"
          >
            <Image height="100%" src={NoDataFound} />
          </Flex>
        </Box>
      )}
    </Box>
  );
};
