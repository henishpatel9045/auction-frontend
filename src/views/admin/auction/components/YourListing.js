import React, { useEffect, useState } from "react";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";

// Custom components
import NFT from "components/card/NFT";

// Assets
import Nft1 from "assets/img/nfts/Nft1.png";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft3 from "assets/img/nfts/Nft3.png";
import { NavLink } from "react-router-dom";

export default function YourListing() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");

  const [data, setData] = useState([]);
  const [upcomingData, setUpcomingData] = useState([]);

  useEffect(() => {
    setData([
      {
        id: 1,
        name: "ETH AI Brain",
        author: "Henish Patel",
        image: Nft1,
        currentbid: "1500 ₹",
      },
      {
        id: 2,
        name: "ETH AI Brain",
        author: "Vansh Patel",
        image: Nft2,
        currentbid: "3500 ₹",
      },
      {
        id: 45,
        name: "ETH AI Brain",
        author: "Om Patel",
        image: Nft3,
        currentbid: "500 ₹",
      },
      {
        id: 101,
        name: "ETH AI Brain",
        author: "Rohit Patel",
        image: Nft1,
        currentbid: "9500 ₹",
      },
    ]);
    setUpcomingData(data);
  });

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        mb="20px"
        gridTemplateColumns={{ xl: "repeat(3, 1fr)" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}
      >
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 1 / 2 / 4", "2xl": "1 / 1 / 2 / 4" }}
        >
          {/* <Banner /> */}
          <Flex direction="column">
            <Flex
              mt="45px"
              mb="20px"
              justifyContent="space-between"
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}
            >
              <Text color={textColor} fontSize="2xl" ms="24px" fontWeight="700">
                Trending NFTs
              </Text>
              <Flex
                align="center"
                me="20px"
                ms={{ base: "24px", md: "0px" }}
                mt={{ base: "20px", md: "0px" }}
              >
                <Button
                  backgroundColor="#422afb"
                  color="white"
                  _hover={{ backgroundColor: "#422afbdd" }}
                  fontWeight="600"
                  me={{ base: "34px", md: "44px" }}
                >
                  <NavLink to="/admin/listing/addNew">Add Item</NavLink>
                </Button>
              </Flex>
            </Flex>
            <SimpleGrid columns={{ base: 1, lg: 4, md: 3 }} gap="20px">
              {data?.map((item, index) => {
                return (
                  <NFT
                    key={index}
                    name={item.name}
                    author={item.author}
                    image={item.image}
                    currentbid={item.currentbid}
                    auctionId={item.id}
                    download="#"
                  />
                );
              })}
            </SimpleGrid>
          </Flex>
        </Flex>
      </Grid>
    </Box>
  );
}
