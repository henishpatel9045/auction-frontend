
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
import api from "api/api";

export default function Marketplace() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");

  const [data, setData] = useState([]);
  const [upcomingData, setUpcomingData] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
    api.setHeaders({
      Authorization: `JWT ${token}`
    })
    api.get("api/auction/listing?type=live")
      .then(res => {
        if (res.ok) {
          console.log(res.data);
          setData(res.data)
        } else {
          console.log(res.data)
          alert("Something went wrong!")
        }
      }).catch(err => {
        console.log(err)
        alert("Something went wrong!")
      })
    api.get("api/auction/listing?type=upcoming")
      .then(res => {
        if (res.ok) {
          console.log(res.data);
          setUpcomingData(res.data)
        } else {
          console.log(res.data)
          alert("Something went wrong!")
        }
      }).catch(err => {
        console.log(err)
        alert("Something went wrong!")
      })
  }, [])


  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        mb='20px'
        gridTemplateColumns={{ xl: "repeat(3, 1fr)" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}>
        <Flex
          flexDirection='column'
          gridArea={{ xl: "1 / 1 / 2 / 4", "2xl": "1 / 1 / 2 / 4" }}>
          {/* <Banner /> */}
          <Flex direction='column'>
            <Flex
              mt='45px'
              mb='20px'
              justifyContent='space-between'
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}>
              <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                Ongoing Auction
              </Text>
              <Flex
                align='center'
                me='20px'
                ms={{ base: "24px", md: "0px" }}
                mt={{ base: "20px", md: "0px" }}>
                {/* <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#art'>
                  Art
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#music'>
                  Music
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#collectibles'>
                  Collectibles
                </Link>
                <Link color={textColorBrand} fontWeight='500' to='#sports'>
                  Sports
                </Link> */}
              </Flex>
            </Flex>
            <SimpleGrid columns={{ base: 1, lg: 4, md: 3 }} gap='20px'>
              {
                data?.length > 0 ? data?.map((item, index) => {
                  return (
                    <NFT
                      key={index}
                      name={item.title}
                      author={item.owner}
                      image={item.images[0] || [Nft1, Nft2, Nft3][item.id % 3]}
                      currentbid={item.currentbid}
                      auctionId={item.id}
                      download='#'
                    />
                  )
                }) : <>
                  <Box alignItems="center" justifyContent="center">
                    <Text 
                      color="blackAlpha.700"
                      fontSize='2xl'
                      ms='24px'
                      fontWeight='700'
                      textAlign="center"
                    >
                      No ongoing auction
                    </Text>
                  </Box>
                </>
              }
            </SimpleGrid>
            <Text
              mt='45px'
              mb='36px'
              color={textColor}
              fontSize='2xl'
              ms='24px'
              fontWeight='700'>
              Upcoming Auction
            </Text>
            <SimpleGrid
              columns={{ base: 1, lg: 4, md: 3 }}
              gap='20px'
              mb={{ base: "20px", xl: "0px" }}>
              {
                upcomingData?.length > 0 ? upcomingData?.map((item, index) => {
                  return (
                    <NFT
                      key={index}
                      name={item.title}
                      author={item.owner}
                      image={item.images[0] || [Nft1, Nft2, Nft3][item.id % 3]}
                      currentbid={item.currentbid}
                      auctionId={item.id}
                      download='#'
                    />
                  )
                }) : <>
                  <Box alignItems="center" justifyContent="center" width="100%">
                    <Text 
                      color="blackAlpha.700"
                      fontSize='1.5rem'
                      ms='24px'
                      fontWeight='700'
                      textAlign="center"
                    >
                      No upcoming auction
                    </Text>
                  </Box>
                </>
              }
            </SimpleGrid>
          </Flex>
        </Flex>
        {/* <Flex
          flexDirection='column'
          gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}>
          <Card px='0px' mb='20px'>
            <TableTopCreators
              tableData={tableDataTopCreators}
              columnsData={tableColumnsTopCreators}
            />
          </Card>
          <Card p='0px'>
            <Flex
              align={{ sm: "flex-start", lg: "center" }}
              justify='space-between'
              w='100%'
              px='22px'
              py='18px'>
              <Text color={textColor} fontSize='xl' fontWeight='600'>
                History
              </Text>
              <Button variant='action'>See all</Button>
            </Flex>

            <HistoryItem
              name='Colorful Heaven'
              author='By Mark Benjamin'
              date='30s ago'
              image={Nft5}
              price='0.91 ETH'
            />
            <HistoryItem
              name='Abstract Colors'
              author='By Esthera Jackson'
              date='58s ago'
              image={Nft1}
              price='0.91 ETH'
            />
            <HistoryItem
              name='ETH AI Brain'
              author='By Nick Wilson'
              date='1m ago'
              image={Nft2}
              price='0.91 ETH'
            />
            <HistoryItem
              name='Swipe Circles'
              author='By Peter Will'
              date='1m ago'
              image={Nft4}
              price='0.91 ETH'
            />
            <HistoryItem
              name='Mesh Gradients '
              author='By Will Smith'
              date='2m ago'
              image={Nft3}
              price='0.91 ETH'
            />
            <HistoryItem
              name='3D Cubes Art'
              author='By Manny Gates'
              date='3m ago'
              image={Nft6}
              price='0.91 ETH'
            />
          </Card>
        </Flex> */}
      </Grid>
      {/* Delete Product */}
    </Box>
  );
}
