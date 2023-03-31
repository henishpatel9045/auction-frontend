import React from "react";

// Chakra imports
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      {/* <HorizonLogo h='26px' w='175px' my='32px' color={logoColor} /> */}
      <Flex 
        height="100%"
        width="100%"
        align="center"
        justify="center"
        mb="1rem"
      >
        <Text
          fontSize="2rem"
          _dark={{
            color: "white",
          }}
        >
          <b>Auction</b>Work
        </Text>
      </Flex>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
