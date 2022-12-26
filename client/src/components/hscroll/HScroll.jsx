import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Flex } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const ScrollBox = styled.div`
  white-space: nowrap;
  ::-webkit-scrollbar {
    display: none;
  }
  overflow: hidden;
  width: 100%;
`;

export const HScroll = ({ children }) => {
  const ref = useRef(null);
  const [showScrollArrow, setShowScrollArrow] = useState(false);

  useEffect(() => {
    setShowScrollArrow(ref.current.scrollWidth > ref.current.clientWidth);
  }, [children, ref]);

  const sideScroll = (element, speed, distance, step) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
    }, speed);
  };
  return (
    <Flex justifyContent={'center'} alignItems={'center'}>
      {showScrollArrow && (
        <ChevronLeftIcon
          fontSize={'30px'}
          onClick={() => sideScroll(ref.current, 25, 100, -10)}
        />
      )}
      <ScrollBox ref={ref}>{children}</ScrollBox>
      {showScrollArrow && (
        <ChevronRightIcon
          fontSize={'30px'}
          onClick={() => sideScroll(ref.current, 25, 100, 10)}
        />
      )}
    </Flex>
  );
};
