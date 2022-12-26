import React, { useEffect, useState } from 'react';
import { getAxios } from 'utils';
import {
  Box,
  Flex,
  Select,
  Image,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useToast,
} from '@chakra-ui/react';
import { Pie } from '@ant-design/plots';
import { DeleteIcon } from '@chakra-ui/icons';
import { PageHeader, Loading } from 'components';
import { useAuth } from 'contexts';
import { roundUpNumber, formatDate } from 'utils';
import { color20, color10 } from 'config/colors';
import { NoDataFound } from 'assets/images';

export const Dashboard = () => {
  const toast = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [paidBy, setPaidBy] = useState('we');

  const [transactionData, setTransactionData] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const token = user?.token;
    if (user) {
      setLoading(true);
      if (paidBy === 'we') {
        getAxios(token)
          .get(`/api/v1/expenses/monthly/${selectedYear}-${selectedMonth}`)
          .then((res) => {
            setLoading(false);
            setTransactionData(res.data.data);
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
            setTransactionData(res.data.data);
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
      }
    }
  }, [user, selectedMonth, selectedYear, paidBy]);

  useEffect(() => {
    setLoading(true);
    const categoryMap = {};
    const chartDataInternal = [];
    transactionData.forEach((data) => {
      const amount = parseFloat(data.amount);
      categoryMap[data.category] = categoryMap[data.category]
        ? parseFloat(categoryMap[data.category]) + amount
        : amount;
    });
    Object.keys(categoryMap).forEach((category) => {
      chartDataInternal.push({ type: category, value: categoryMap[category] });
    });
    setChartData(chartDataInternal);
    setLoading(false);
  }, [transactionData]);

  const chartConfig = {
    appendPadding: 10,
    data: chartData,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    legend: false,
    theme: {
      colors20: color20,
      colors10: color10,
    },
    label: {
      type: 'inner',
      offset: '-8%',
      formatter: (data) => {
        return `${data.type} (${roundUpNumber(data.percent * 100, 2)}%) 
${data.value}`;
      },
      style: {
        fontSize: 12,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
  };

  const updateMonth = (e) => {
    setSelectedMonth(e.target.value);
  };

  const updateYear = (e) => {
    setSelectedYear(e.target.value);
  };

  const removeExpense = (id) => {
    const token = user?.token;
    getAxios(token)
      .post(`/api/v1/expenses/remove`, {
        id: id,
      })
      .then((res) => {
        setTransactionData(transactionData.filter((data) => data.id !== id));
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

  if (loading) return <Loading />;

  return (
    <Box>
      <PageHeader title="Dashboard" />
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
      {transactionData.length > 0 ? (
        <>
          <Box>
            {Object.keys(chartConfig).length > 0 && <Pie {...chartConfig} />}
          </Box>
          <TableContainer>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Category</Th>
                  <Th isNumeric>Amount</Th>
                  <Th>Title</Th>
                  <Th>Paid By</Th>
                  <Th>Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {transactionData.map((data, index) => (
                  <Tr key={index}>
                    <Td>{formatDate(new Date(data.date), 'DD MMM')}</Td>
                    <Td>{data.category}</Td>
                    <Td isNumeric>{data.amount}</Td>
                    <Td overflowWrap={'break-word'} wordBreak={'break-word'}>
                      <Text>{data.title}</Text>
                    </Td>
                    <Td>{data.paid_by === user.email ? 'Me' : 'Partner'}</Td>
                    <Td>
                      <DeleteIcon onClick={() => removeExpense(data.id)} />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
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
