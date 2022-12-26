import React, { useEffect } from 'react';
import { Text, Box, Center, Flex, useColorMode } from '@chakra-ui/react';
import useGoogleLogin from 'hooks/useGoogleLogin';
import { Logo } from 'assets/images';
import { LoadingText } from 'components';

export const Login = () => {
  const { fetchGoogleLoginResponse, isLoading, error } = useGoogleLogin();
  const { colorMode } = useColorMode();
  useEffect(() => {
    if (window.google) {
      /* global google */
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: fetchGoogleLoginResponse,
      });

      google.accounts.id.renderButton(
        document.getElementById('continue-with-google'),
        {
          width: '250',
          type: 'standard',
          theme: 'filled_black',
          text: 'continue_with',
          shape: 'circle',
        }
      );
    }
  }, [fetchGoogleLoginResponse]);

  return (
    <Box
      maxW="md"
      height="100vh"
      minH={'-webkit-fill-available'}
      margin={'auto'}
      overflow={'hidden'}
    >
      <Center height="100vh" minH={'-webkit-fill-available'}>
        <Flex
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
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
              width="180px"
            />
          </Box>
          {error && (
            <Box color={colorMode === 'dark' ? '#9b9b9b' : '#707070'}>
              <Text>We faced issue while trying to login</Text>
              <Text marginBottom={4}> Please try again!</Text>
            </Box>
          )}
          {isLoading ? (
            <LoadingText color={colorMode === 'dark' ? '#9b9b9b' : '#707070'} />
          ) : (
            <div
              id="continue-with-google"
              data-text="continue-with-google"
            ></div>
          )}
        </Flex>
      </Center>
    </Box>
  );
};
