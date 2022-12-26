import React, { forwardRef } from 'react';
import { CalendarIcon } from '@chakra-ui/icons';
import ReactDatePicker from 'react-datepicker';
import styled from 'styled-components';
import { Flex } from '@chakra-ui/react';

const DatePickerWrapper = styled.div`
  -webkit-padding-start: var(--chakra-space-4);
  padding-inline-start: var(--chakra-space-4);
  -webkit-padding-end: var(--chakra-space-4);
  padding-inline-end: var(--chakra-space-4);
  height: var(--chakra-sizes-10);
  border-radius: var(--chakra-radii-md);
  border: 1px solid;
  border-color: inherit;
  width: 100%;
  padding-top: var(--chakra-space-2);
`;

export const DatePicker = ({ ...rest }) => {
  const DatePickerContainer = forwardRef(({ value, onClick }, ref) => (
    <DatePickerWrapper
      className="date-picker-wrapper"
      onClick={onClick}
      ref={ref}
    >
      <Flex justifyContent={'space-between'} alignItems="center">
        {value}
        <CalendarIcon />
      </Flex>
    </DatePickerWrapper>
  ));

  return <ReactDatePicker {...rest} customInput={<DatePickerContainer />} />;
};
