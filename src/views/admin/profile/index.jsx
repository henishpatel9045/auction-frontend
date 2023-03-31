import { Box } from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/profile/components/Banner";
import Projects from "views/admin/profile/components/Projects";

// Assets
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/avatar4.png";
import React, { useEffect, useState } from "react";
import api from "api/api";

export default function Overview() {
  const [data, setData] = useState({})

  useEffect(() => {
    let token =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");
    api.setHeaders({
      Authorization: `JWT ${token}`,
    });
    api
      .get("api/auth/user")
      .then(res => {
        if (res.ok){
          setData(res.data)
        }else{
          console.log(res.data)
        }
      })
  })

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Banner
        gridArea='1 / 1 / 2 / 2'
        banner={banner}
        // avatar={avatar}
        name={data?.name || data?.username}
        totalBids={data?.total_bids}
        auctionWon={data?.auction_won}
        maxBid={data?.max_bid}
        totalItems={data?.total_items}
      />

      {/* <Projects
        gridArea='1 / 2 / 2 / 2'
        banner={banner}
        avatar={avatar}
        name='Adela Parkson'
        job='Product Designer'
        posts='17'
        followers='9.7k'
        following='274'
      /> */}
    </Box>
  );
}
