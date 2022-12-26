import React from 'react';
import { Box } from '@chakra-ui/react';
import { useAuth } from 'contexts';
import { Header } from 'layouts';
import { Login, Setup } from 'views';
import { useLocation } from 'react-router';
import { VerifyPartner } from 'views/verify-partner/VerifyPartner';

export const Container = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  if (location.pathname.includes('verify-partner')) {
    return <VerifyPartner />;
  }

  if (Object.keys(user).length === 0) return <Login />;
  if (user && user.is_new === 0) return <Setup />;

  return (
    <Box
      maxW="md"
      height="100vh"
      minH={'-webkit-fill-available'}
      padding={4}
      margin={'auto'}
      position="relative"
    >
      <Header />
      {children}
    </Box>
  );
};
