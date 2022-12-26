import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, theme, ColorModeProvider } from '@chakra-ui/react';
import { AuthProvider, AppProvider } from 'contexts';
import { RouterProvider, Container } from 'layouts';
import 'assets/styles/global.css';

const Application = () => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeProvider>
        <AuthProvider>
          <AppProvider>
            <BrowserRouter>
              <Container>
                <RouterProvider />
              </Container>
            </BrowserRouter>
          </AppProvider>
        </AuthProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
};

export default Application;
