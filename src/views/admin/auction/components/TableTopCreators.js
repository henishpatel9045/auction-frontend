import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

function TableTopCreators({ data }) {
  console.log(data);

  return (
    <TableContainer>
      <Table>
        <TableCaption>{data?.length == 0 && "No bids yet"}</TableCaption>
        <Thead>
          <Tr>
            <Th fontSize="1rem" fontWeight="700">
              Username
            </Th>
            <Th fontSize="1rem" fontWeight="700">
              amount
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((item, index) => {
            return (
              <Tr key={index}>
                <Td>@{item?.bidder}</Td>
                <Td>{item?.amount}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default TableTopCreators;
