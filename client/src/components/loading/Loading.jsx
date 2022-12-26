import React from 'react';
import { Flex, Spinner } from '@chakra-ui/react';
import { FullScreen } from 'components';

export const Loading = () => {
  return (
    <FullScreen>
      <Flex justifyContent={'center'} alignItems="center" height="100vh">
        <Spinner
          thickness="10px"
          speed="0.65s"
          emptyColor="gray.200"
          size="xl"
        />
      </Flex>
    </FullScreen>
  );
};
