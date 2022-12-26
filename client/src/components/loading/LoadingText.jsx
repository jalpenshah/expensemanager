import React from 'react';
import { Text } from '@chakra-ui/react';
import './LoadingText.css';

export const LoadingText = ({ color }) => {
  return (
    <Text color={color} className="loading">
      Loading...
    </Text>
  );
};
