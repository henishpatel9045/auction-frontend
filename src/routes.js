import React from "react";

import { Icon } from "@chakra-ui/react";
import { MdPerson, MdLock, MdOutlineShoppingCart } from "react-icons/md";

// Admin Imports
import Profile from "views/admin/profile";
import Auction from "views/admin/auction";

// Auth Imports
import SignInCentered from "views/auth/signIn";
import YourListing from "views/admin/auction/components/YourListing";

const routes = [
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: Profile,
  },
  {
    name: "Auction",
    layout: "/admin",
    path: "/auction",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: Auction,
  },
  {
    name: "Your Listing",
    layout: "/admin",
    path: "/items",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: YourListing,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  },
];

export default routes;
