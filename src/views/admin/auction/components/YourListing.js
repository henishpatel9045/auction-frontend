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
import api from "api/api";

export default function YourListing() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const [data, setData] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
    api.setHeaders({
      Authorization: `JWT ${token}`
    })
    api.get("api/auction/listing?type=personal")
         .then(res => {
            if (res.ok){
              console.log(res.data);
              setData(res.data)
            }else{
              console.log(res.data)
              alert("Something went wrong!")
            }
         }).catch(err => {
            console.log(err)
            alert("Something went wrong!")
         })
  }, []);

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
                Your Listings
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

            {data?.length > 0 ? <SimpleGrid
              columns={{ base: 1, lg: 4, md: 3 }}
              gap='20px'
              mb={{ base: "20px", xl: "0px" }}>
              {
                data?.map((item, index) => {
                  return (
                    <NFT
                      key={index}
                      name={item.title}
                      author={item.owner_name}
                      image={item.images[0] || [Nft1, Nft2, Nft3][item.id % 3]}
                      currentbid={item.currentbid}
                      auctionId={item.id}
                      download='#'
                    />
                  )
                })}
            </SimpleGrid> : <Box alignItems="center" justifyContent="center" width="100%">
              <Text
                color="blackAlpha.700"
                fontSize='1.5rem'
                ms='24px'
                fontWeight='700'
                textAlign="center"
              >
                You don't have any item for auction.
              </Text>
            </Box>
            }
          </Flex>
        </Flex>
      </Grid>
    </Box>
  );
}
