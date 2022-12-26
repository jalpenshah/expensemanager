import React from "react";
import { Center, Heading } from "@chakra-ui/react";

export const PageHeader = ({ title }) => {
  return (
    <Center paddingBottom={4}>
      <Heading as="h3" size="lg">
        {title}
      </Heading>
    </Center>
  );
};
