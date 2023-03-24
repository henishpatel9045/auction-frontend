import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import {
  Grid,
  Box,
  Flex,
  Text,
  InputLeftElement,
  InputGroup,
  Input,
  InputRightElement,
  Alert,
  Button,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { CheckIcon, NotAllowedIcon } from "@chakra-ui/icons";

import tableDataTopCreators from "../variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "../variables/tableColumnsTopCreators";
import TopCreatorTable from "./TableTopCreators";

function AuctionDetail() {
  const [data, setData] = useState([]);
  const { auctionId } = useParams();
  const [isBidAcceptable, setIsBidAcceptable] = useState(false);
  const [bidAmount, setBidAmount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setData({
      title: "Magic Carpet",
      desc: "Enter in this creative world. Discover now the latest NFTs or start creating your own!",
      currentbid: 5000,
    });
  }, []);

  const handleBid = () => {
    if (!isBidAcceptable) {
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
      setShowAlert(true);
    } else {
      console.log("Bid Accepted");
    }
  };

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        mb="20px"
        gridTemplateColumns={{ xl: "70% 30%" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}
      >
        {/* <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 1 / 2 / 4", "2xl": "1 / 1 / 2 / 4" }}
        >
            
        </Flex> */}
        <Box>
          <Banner />
          <Box pl={"5"}>
            <Text
              fontSize={{ base: "24px", md: "34px" }}
              color="#343434"
              mb="14px"
              maxW={{
                base: "100%",
                md: "64%",
                lg: "46%",
                xl: "70%",
                "2xl": "50%",
                "3xl": "42%",
              }}
              fontWeight="700"
              lineHeight={{ base: "32px", md: "42px" }}
            >
              {data?.title}
            </Text>
            <Text
              fontSize="md"
              color="#242424"
              maxW={{
                base: "100%",
                md: "64%",
                lg: "40%",
                xl: "56%",
                "2xl": "46%",
                "3xl": "34%",
              }}
              fontWeight="500"
              mb="40px"
              lineHeight="28px"
            >
              {data?.desc}
            </Text>
            <Box>
              <Text
                fontSize="xxx-large"
                color="#242424"
                fontWeight="700"
                mb="2rem"
                lineHeight="2rem"
              >
                CurrentBid: {data?.currentbid} ₹
              </Text>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children="$"
                  borderRadius="16px"
                />
                <Input
                  placeholder="Enter amount"
                  borderRadius="16px"
                  onChange={(e) => {
                    if (e.target.value > data?.currentbid) {
                      setIsBidAcceptable(true);
                      setBidAmount(e.target.value);
                    } else {
                      setIsBidAcceptable(false);
                    }
                  }}
                />
                <InputRightElement
                  borderRadius="16px"
                  children={
                    isBidAcceptable == true ? (
                      <CheckIcon color="green.500" />
                    ) : (
                      <NotAllowedIcon color="red.500" />
                    )
                  }
                />
              </InputGroup>
              <Button
                onClick={handleBid}
                colorScheme="twitter"
                mt="1rem"
                color="white"
                fontWeight="700"
                fontSize="1.5rem"
                px="1.5rem"
                py="1.2rem"
                me="2rem"
              >
                Place Bid
              </Button>
              <Box
                position={"fixed"}
                top="50"
                transition="all 0.3s ease-out"
                zIndex={999}
                width="100vw"
                left={0}
                display={showAlert == true ? "flex" : "none"}
                alignItems="center"
                justifyContent="center"
              >
                <Alert
                  width="fit-content"
                  status={isBidAcceptable == true ? "success" : "error"}
                  borderRadius="16px"
                >
                  {isBidAcceptable == true
                    ? "Bid is acceptable"
                    : "Bid is not acceptable"}
                </Alert>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box mt={
          {base: "2.5rem", xl: "0px"}
        }>
          <TopCreatorTable
            columnsData={tableColumnsTopCreators}
            tableData={tableDataTopCreators}
           />
        </Box>
      </Grid>
    </Box>
  );
}

export default AuctionDetail;
