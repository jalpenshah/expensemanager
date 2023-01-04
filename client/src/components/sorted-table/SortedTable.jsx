import React from 'react';
import { useTable, useSortBy } from 'react-table';

import { Table, Thead, Tbody, Tr, Th, Td, Flex } from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';

export const SortedTable = ({ columns, data, sortByColumn }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        initialState: {
          sortBy: sortByColumn
            ? [
                {
                  id: sortByColumn,
                  desc: true,
                },
              ]
            : [],
        },
      },
      useSortBy
    );

  return (
    <Table size="sm" {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => {
              return (
                <Th
                  userSelect="none"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <Flex
                    justifyContent={
                      column.isNumeric ? 'flex-end' : 'flex-start'
                    }
                  >
                    {column.render('Header')}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ChevronDownIcon ml={1} w={4} h={4} />
                      ) : (
                        <ChevronUpIcon ml={1} w={4} h={4} />
                      )
                    ) : (
                      ''
                    )}
                  </Flex>
                </Th>
              );
            })}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <Td {...cell.getCellProps()}>
                    <Flex
                      justifyContent={
                        cell.column.isNumeric ? 'flex-end' : 'flex-start'
                      }
                    >
                      {cell.render('Cell')}
                    </Flex>
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
