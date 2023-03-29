// Chakra imports
import { Avatar, Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React from "react";

export default function Banner(props) {
  const { banner, avatar, name="User's Name", totalBids=0, auctionWon=0, maxBid=0, totalItems=0 } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );
  return (
    <Card mb={{ base: "0px", lg: "20px" }} align='center'>
      <Box
        bg={`url(${banner})`}
        bgSize='cover'
        borderRadius='16px'
        h='40vh'
        w='100%'
      />
      <Avatar
        mx='auto'
        // src={avatar}
        h='10rem'
        w='10rem'
        mt='-43px'
        border='4px solid'
        borderColor={borderColor}
      />
      <Text color={textColorPrimary} fontWeight='bold' fontSize='xl' mt='10px'>
        {name}
      </Text>
      {/* <Text color={textColorSecondary} fontSize='sm'>
        {job}
      </Text> */}
      <Flex w='max-content' mx='auto' mt='26px'>
        <Flex mx='auto' me='60px' align='center' direction='column'>
          <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
            {totalBids}
          </Text>
          <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
            Total Bids
          </Text>
        </Flex>
        <Flex mx='auto' me='60px' align='center' direction='column'>
          <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
            {auctionWon}
          </Text>
          <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
            Auction Won
          </Text>
        </Flex>
        <Flex mx='auto' me='60px' align='center' direction='column'>
          <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
            {maxBid} ₹
          </Text>
          <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
            Max Bid Placed
          </Text>
        </Flex>
        <Flex mx='auto' align='center' direction='column'>
          <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
            {totalItems}
          </Text>
          <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
            Total Items
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}
