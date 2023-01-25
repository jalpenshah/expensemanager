import React, { useEffect, useState } from 'react';
import { getAxios } from 'utils';
import {
  Box,
  Flex,
  Select,
  Image,
  Text,
  Stack,
  Badge,
  Center,
  CloseButton,
  Button,
} from '@chakra-ui/react';
import { Pie } from '@ant-design/plots';
import { PageHeader, Loading, SortedTable, FullScreen } from 'components';
import { useAuth } from 'contexts';
import { formatDate, roundUpNumber } from 'utils';
import { randomColors } from 'config/colors';
import { NoDataFound } from 'assets/images';

export const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [paidBy, setPaidBy] = useState('we');
  const [categoryView, setCategoryView] = useState(false);
  const [categoricalData, setCategoricalData] = useState([]);

  const categoricalHeader = [
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
  ];

  const [transactionData, setTransactionData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const tableCategory = [
    {
      Header: 'Category',
      accessor: 'category',
    },
    {
      Header: 'Amount',
      accessor: 'amount',
      isNumeric: true,
      isSorted: true,
      sortDescFirst: true,
    },
    {
      Header: '',
      accessor: 'action',
    },
  ];
  const [tableData, setTableData] = useState([]);

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

  const handleCategoryView = (category) => {
    const internalData = [];
    transactionData
      .filter((data) => data.category === category)
      .forEach((data) => {
        internalData.push({
          date: formatDate(new Date(data.date), 'DD MMM'),
          category: data.category,
          amount: data.amount,
          title: data.title,
        });
      });
    setCategoricalData(internalData);
    setCategoryView(true);
  };

  useEffect(() => {
    setLoading(true);
    const categoryMap = {};
    const chartDataInternal = [];
    const tableDataInternal = [];
    let sum = 0;
    transactionData.forEach((data) => {
      const amount = parseFloat(data.amount);
      sum += amount;
      categoryMap[data.category] = categoryMap[data.category]
        ? parseFloat(categoryMap[data.category]) + amount
        : amount;
    });
    setTotalAmount(roundUpNumber(sum, 2));

    Object.keys(categoryMap).forEach((category) => {
      chartDataInternal.push({ type: category, value: categoryMap[category] });
      tableDataInternal.push({
        category: category,
        amount: roundUpNumber(categoryMap[category], 2),
        action: (
          <Box>
            <Button
              title="View"
              colorScheme="blue"
              size="xs"
              variant={'outline'}
              onClick={() => handleCategoryView(category)}
            >
              View
            </Button>
          </Box>
        ),
      });
    });
    setChartData(chartDataInternal);
    setTableData(tableDataInternal);
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
      position: 'top',
      flipPage: false,
      reversed: true,
      slidable: true,
    },
    theme: {
      colors20: randomColors,
      colors10: randomColors,
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
          <Box>
            {Object.keys(chartConfig).length > 0 && <Pie {...chartConfig} />}
          </Box>
          <Box paddingTop={2}>
            <SortedTable
              columns={tableCategory}
              data={tableData}
              sortByColumn="amount"
            />
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

      {categoryView && (
        <FullScreen>
          <Flex justifyContent={'end'}>
            <CloseButton fontSize={20} onClick={() => setCategoryView(false)} />
          </Flex>
          <Center margin={4}>
            <Text fontSize="xl">{categoricalData[0].category}</Text>
          </Center>
          <Box>
            <SortedTable columns={categoricalHeader} data={categoricalData} />
          </Box>
        </FullScreen>
      )}
    </Box>
  );
};
