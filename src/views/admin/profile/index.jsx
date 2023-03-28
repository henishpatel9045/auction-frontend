import { Box } from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/profile/components/Banner";
import Projects from "views/admin/profile/components/Projects";

// Assets
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/avatar4.png";
import React from "react";

export default function Overview() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Banner
        gridArea='1 / 1 / 2 / 2'
        banner={banner}
        avatar={avatar}
        name='Adela Parkson'
        job='Product Designer'
        posts='17'
        followers='9.7k'
        following='274'
      />

      <Projects
        gridArea='1 / 2 / 2 / 2'
        banner={banner}
        avatar={avatar}
        name='Adela Parkson'
        job='Product Designer'
        posts='17'
        followers='9.7k'
        following='274'
      />
    </Box>
  );
}
