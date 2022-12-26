import React from 'react';
import { Icon } from '@chakra-ui/react';

export const GradientIcon = ({ ...props }) => {
  return (
    <>
      <svg width="0" height="0">
        <linearGradient
          id="ping-purple-gradient"
          x1="100%"
          y1="100%"
          x2="0%"
          y2="0%"
        >
          <stop stopColor="#7928CA" offset="0%" />
          <stop stopColor="#FF0080" offset="100%" />
        </linearGradient>
      </svg>
      <Icon
        {...props}
        style={{
          stroke: 'url(#ping-purple-gradient)',
          fill: 'url(#ping-purple-gradient)',
        }}
      />
    </>
  );
};
