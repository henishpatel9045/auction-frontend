import React from "react";

// Chakra imports
import { Flex, Box, Image } from "@chakra-ui/react";

// Assets
import banner from "assets/img/nfts/NftBanner1.png";
import IMG1 from "assets/img/nfts/Nft1.png";
import IMG2 from "assets/img/nfts/Nft2.png";
import IMG3 from "assets/img/nfts/Nft3.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export default function Banner() {
  // Chakra Color Mode
  return (
    <Flex
      direction="column"
      // bgImage={banner}
      bgSize="cover"
      borderRadius="30px"
      alignItems="center"
      overflow={"hidden"}
    >
      <Carousel
        showArrows={false}
        showStatus={false}
        centerMode={false}
        showThumbs={false}
      >
        <Image
          objectFit="cover"
          borderRadius="30px" 
          src={IMG1}
        />
        <Image
          objectFit="cover"
          borderRadius="30px"
          src={IMG2}
        />
        <Image
          objectFit="cover"
          borderRadius="30px"
          src={IMG3}
        />
      </Carousel>

      {/* <Flex align='center'>
        <Button
          bg='white'
          color='black'
          _hover={{ bg: "whiteAlpha.900" }}
          _active={{ bg: "white" }}
          _focus={{ bg: "white" }}
          fontWeight='500'
          fontSize='14px'
          py='20px'
          px='27'
          me='38px'>
          Discover now
        </Button>
      </Flex> */}
    </Flex>
  );
}
