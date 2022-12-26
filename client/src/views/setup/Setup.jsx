import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Select,
  Input,
  Flex,
  Spacer,
  Center,
  Card,
  Button,
  useToast,
} from '@chakra-ui/react';
import { PageHeader, GradientIcon, Loading } from 'components';
import { currencies } from 'config/currencies';
import { commonCategories } from 'config/common-categories';
import { getAxios } from 'utils';
import { useAuth } from 'contexts';

export const Setup = () => {
  const toast = useToast();
  const { user, updateUser } = useAuth();
  const token = user?.token;
  const [currency, setCurrency] = useState('GBP');
  const [selectedCategories, setSelectedCategories] =
    useState(commonCategories);
  const [partnerAccount, setPartnerAccount] = useState('');
  const [isPartnerVerified, setIsPartnerVerified] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch partner id
  useEffect(() => {
    getAxios(token)
      .get(`/api/v1/users/fetchPartnerId`)
      .then((res) => {
        if (Object.keys(res?.data).length > 0) {
          setPartnerAccount(res?.data?.partnerId);
          setIsPartnerVerified(res?.data?.isVerified !== 1);
        }
      });
  }, [token]);

  // Save setup preferences
  const saveSetupPreference = () => {
    setIsLoading(true);
    getAxios(token)
      .post('/api/v1/users/setup', {
        categories: selectedCategories
          .filter((category) => category.enabled)
          .map((category) => {
            return category.title;
          }),
        currency: currency,
        partnerEmail: partnerAccount,
      })
      .then((res) => {
        setIsLoading(false);
        updateUser({ ...user, is_new: 1 });
        if (res.data?.isPartnerValid) {
          toast({
            title: 'Success!',
            description: 'Your preferences are updated!',
            status: 'success',
            duration: 1000,
            isClosable: true,
          });
          toast({
            title: 'Partner confirmed!',
            description:
              'We have sent an email to your partner for verification!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: 'Failed!',
          description:
            'We faced some issue removing the row. Please try later!',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      })
      .finally(() => setIsLoading(false));
  };

  const handleCardAction = (selectedCategory) => {
    setSelectedCategories(
      selectedCategories.map((category) => ({
        ...category,
        enabled:
          category.title === selectedCategory.title
            ? !category.enabled
            : category.enabled,
      }))
    );
  };

  //if (isLoading) return <Loading />;

  return (
    <Box>
      <PageHeader title="Setup" />
      <Box>
        <Box paddingBottom={8}>
          <Text mb="4px" fontWeight={500}>
            Select Currency
          </Text>
          <Select
            name="type"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            {Object.keys(currencies).map((type, typeIndex) =>
              Object.keys(currencies[type]).map((cur, index) => (
                <option key={`${index}-${typeIndex}`} value={cur}>
                  {currencies[type][cur].symbol} - {currencies[type][cur].name}{' '}
                  ({cur})
                </option>
              ))
            )}
          </Select>
          <Text fontStyle={'italic'}>
            Note: You will not be able to update the currency later.
          </Text>
        </Box>

        <Box paddingBottom={8}>
          <Text mb="4px" fontWeight={500}>
            Add Partner Account
            <Input
              name="partner"
              disabled={!isPartnerVerified}
              value={partnerAccount}
              onChange={(e) => setPartnerAccount(e.target.value)}
              placeholder="Add partner email Id"
            />
          </Text>
        </Box>

        <Box paddingBottom={8} width="100%">
          <Text mb="4px" fontWeight={500}>
            Select Categories
          </Text>
          <Flex wrap={'wrap'} justifyContent="space-between">
            {selectedCategories.map((category, index) => (
              <Card
                width="17%"
                padding={2}
                margin="5px"
                key={index}
                cursor={'pointer'}
                opacity={category.enabled ? 1 : 0.4}
                onClick={() => handleCardAction(category)}
              >
                <Flex
                  flexDirection={'column'}
                  justifyContent="center"
                  alignItems={'center'}
                >
                  <GradientIcon as={category.icon} fontSize={'40px'} />
                  <Text fontSize={'0.8rem'}>{category.title}</Text>
                  <Spacer />
                </Flex>
              </Card>
            ))}
          </Flex>
          <Text fontStyle={'italic'}>
            Note: You can add/remove cateogies later.
          </Text>
        </Box>

        <Box>
          <Center>
            <Button onClick={() => saveSetupPreference()}>Continue</Button>
          </Center>
        </Box>
      </Box>
    </Box>
  );
};
