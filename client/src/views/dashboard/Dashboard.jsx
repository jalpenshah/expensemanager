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
  Stack,
  Badge,
  Center,
  TableContainer,
} from '@chakra-ui/react';
import { Pie } from '@ant-design/plots';
import { PageHeader, Loading } from 'components';
import { useAuth } from 'contexts';
import { roundUpNumber } from 'utils';
import { color20, color10 } from 'config/colors';
import { NoDataFound } from 'assets/images';

export const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [paidBy, setPaidBy] = useState('we');

  const [transactionData, setTransactionData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

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
    let sum = 0;
    transactionData.forEach((data) => {
      const amount = parseFloat(data.amount);
      sum += amount;
      categoryMap[data.category] = categoryMap[data.category]
        ? parseFloat(categoryMap[data.category]) + amount
        : amount;
    });
    setTotalAmount(sum);
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
    legend: {
      type: 'continue',
      layout: 'vertical',
      position: 'bottom',
      flipPage: false,
    },
    theme: {
      colors20: color20,
      colors10: color10,
    },
    label: {
      type: 'inner',
      offset: '-8%',
      formatter: (data) => {
        return `${data.type} (${roundUpNumber(data.percent * 100, 2)}%) 
${roundUpNumber(data.value, 2)}`;
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
      {chartData.length > 0 ? (
        <>
          <Box>
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
          <Box>
            {Object.keys(chartConfig).length > 0 && <Pie {...chartConfig} />}
          </Box>
          <Box>
            <TableContainer>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Category</Th>
                    <Th isNumeric>Amount</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {chartData.map((data, index) => (
                    <Tr key={index}>
                      <Td>{data.type}</Td>
                      <Td isNumeric>{roundUpNumber(data.value, 2)}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
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
