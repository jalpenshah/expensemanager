import React from 'react';
import { Box } from '@chakra-ui/react';

export const FullScreen = ({ opacity = 1, children }) => {
  return (
    <Box
      width="100%"
      minH="100%"
      margin={'auto'}
      padding={4}
      position="absolute"
      background="var(--chakra-colors-chakra-body-bg)"
      top={0}
      left={0}
      zIndex={1}
      opacity={opacity}
    >
      {children}
    </Box>
  );
};
