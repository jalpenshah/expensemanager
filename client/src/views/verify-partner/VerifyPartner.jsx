import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import {
  Text,
  Box,
  useToast,
  Flex,
  Button,
  useColorMode,
} from '@chakra-ui/react';
import { getAxios } from 'utils';
import { Logo } from 'assets/images';
import { LoadingText } from 'components';

export const VerifyPartner = () => {
  const { colorMode } = useColorMode();
  const toast = useToast();
  const location = useLocation();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const id = location.pathname.includes('verify-partner')
      ? location.pathname.split('/verify-partner/')[1]
      : '';
    if (id) {
      getAxios()
        .post(`/api/v1/verify/partner/${id}`)
        .then((res) => {
          toast({
            title: 'Verification successful',
            description: 'Please login to continue',
            status: 'success',
            duration: 6000,
            isClosable: false,
          });
          setDataLoaded(true);
          setIsSuccess(true);
        })
        .catch((err) => {
          toast({
            title: 'Verification failed',
            description: 'Please try verifying again!',
            status: 'error',
            duration: 6000,
            isClosable: false,
          });
          setDataLoaded(true);
          setIsSuccess(false);
        });
    } else {
      setDataLoaded(true);
      setIsSuccess(false);
    }
  }, []);

  const handleloginClick = () => {
    navigate('/');
  };

  return (
    <Box
      maxW="md"
      height="100vh"
      minH={'-webkit-fill-available'}
      margin={'auto'}
      overflow={'hidden'}
    >
      <Flex
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        height="100vh"
        minH={'-webkit-fill-available'}
      >
        <Text
          color={'var(--chakra-colors-chakra-body-text)'}
          marginBottom={10}
          fontSize={26}
        >
          Expense Manager
        </Text>
        <Box marginBottom={10}>
          <Logo
            alt="Jalpen Shah"
            stroke={colorMode === 'dark' ? '#fff' : '#36454F'}
            strokeWidth="10"
            width="130px"
          />
        </Box>

        <Flex
          justifyContent={'center'}
          alignItems="center"
          flexDirection={'column'}
        >
          {dataLoaded ? (
            isSuccess && <Text>Verification complete!</Text>
          ) : (
            <LoadingText color={colorMode === 'dark' ? '#9b9b9b' : '#707070'} />
          )}
          <Button marginTop={2} onClick={() => handleloginClick()}>
            Login
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};
