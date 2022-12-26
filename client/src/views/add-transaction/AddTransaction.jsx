import React, { useState } from 'react';
import {
  Box,
  Text,
  Select,
  Input,
  Tag,
  Center,
  Button,
  useToast,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';

import 'react-datepicker/dist/react-datepicker.css';
import { Loading, HScroll, PageHeader, DatePicker } from 'components';
import { useAppContent } from 'contexts';
import { useEffect } from 'react';
import {
  getAxios,
  nullCheck,
  capitalizeFirstLetter,
  fetchLocalStorageData,
  formatDate,
} from 'utils';

const blankFormInputs = () => {
  return {
    type: 'expense',
    category: '',
    amount: 0.0,
    title: '',
    description: '',
    date: new Date(),
  };
};

export const AddTransaction = () => {
  const toast = useToast();
  const { categories, setCategories } = useAppContent();

  const [filteredCategory, setFilteredCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formInputs, setFormInputs] = useState(blankFormInputs);

  useEffect(() => {
    const token = fetchLocalStorageData('user').token;
    getAxios(token)
      .get('/api/v1/categories/list')
      .then((response) => {
        setCategories(
          response?.data?.data.length > 0 ? response.data.data : []
        );
      });
  }, [setCategories]);

  const onChangeHandler = (e) => {
    if (e.target.name === 'category') {
      const categoryInput = e.target.value;
      categoryInput.length > 0
        ? setFilteredCategory(
            categories.filter((obj) =>
              obj.category.toLowerCase().includes(categoryInput.toLowerCase())
            )
          )
        : setFilteredCategory([]);
    }
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
  };

  const onSelectTag = (cat) => {
    setFormInputs({
      ...formInputs,
      category: cat,
    });
  };

  const validateInput = () => {
    const error = [];
    Object.keys(formInputs).forEach((key) => {
      if (
        !['description', 'date'].includes(key) &&
        nullCheck(formInputs[key])
      ) {
        error.push(capitalizeFirstLetter(key));
      }
    });
    return error;
  };

  const saveTransactionDetails = (e) => {
    e.preventDefault();
    const error = validateInput();
    if (error.length === 0) {
      setIsLoading(true);
      const token = fetchLocalStorageData('user').token;
      getAxios(token)
        .post('/api/v1/expenses/create', {
          ...formInputs,
          date: formatDate(formInputs.date, 'dd/MM/yyyy'),
          add_category: !categories.includes(formInputs.category),
        })
        .then(() => {
          toast({
            title: 'Transaction added',
            description: 'We have saved your details',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          setFormInputs(blankFormInputs);
          setFilteredCategory([]);
          if (!categories.includes(formInputs.category)) {
            setCategories([...categories, { category: formInputs.category }]);
          }
        })
        .catch((err) => {
          toast({
            title: 'Transaction failed',
            description: `Some issue while svaing the transaction ${err.toString()}`,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      toast({
        title: 'Invalid inputs',
        description: `Please fix ${error.join(', ')} fields`,
        status: 'error',
        duration: 10000,
        isClosable: true,
      });
    }
  };

  if (isLoading) return <Loading />;

  return (
    <Box>
      <PageHeader title="Add Transaction" />
      <Box>
        <Box paddingBottom={2}>
          <Text mb="4px">Date</Text>
          <DatePicker
            onChange={(date) =>
              onChangeHandler({
                target: { value: new Date(date), name: 'date' },
              })
            }
            dateFormat="dd/MM/yyyy"
            selected={formInputs.date}
          />
        </Box>
        <Box paddingBottom={2}>
          <Text mb="4px">Type</Text>
          <Select
            name="type"
            value={formInputs.type}
            onChange={onChangeHandler}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </Select>
        </Box>
        <Box paddingBottom={2}>
          <Text mb="4px">Category</Text>
          <Input
            name="category"
            value={formInputs.category}
            onChange={onChangeHandler}
            placeholder="Select or start typing.."
            marginBottom={
              filteredCategory.length > 0 || categories.length > 0 ? 2 : 0
            }
          />
          <HScroll>
            {(filteredCategory.length > 0 ? filteredCategory : categories).map(
              (obj, index) => (
                <Tag
                  key={index}
                  marginRight={2}
                  fontSize={16}
                  padding={2.5}
                  onClick={() => onSelectTag(obj.category)}
                >
                  {obj.category}
                </Tag>
              )
            )}
          </HScroll>
        </Box>
        <Box paddingBottom={2}>
          <Text mb="4px">Title</Text>
          <Input
            name="title"
            value={formInputs.title}
            onChange={onChangeHandler}
            placeholder="Tell me about the transaction"
          />
        </Box>
        <Box paddingBottom={2}>
          <Text mb="4px">Amount</Text>
          <NumberInput>
            <NumberInputField
              value={formInputs.amount}
              onChange={onChangeHandler}
              name="amount"
              placeholder="Amount"
            />
          </NumberInput>
        </Box>
        <Box paddingBottom={2}>
          <Text mb="4px">Description</Text>
          <Input
            name="description"
            value={formInputs.description}
            onChange={onChangeHandler}
            placeholder="Optional: Do you want to add more details?"
          />
        </Box>
        <Center paddingTop={4}>
          <Button onClick={saveTransactionDetails}>Add</Button>
        </Center>
      </Box>
    </Box>
  );
};
