import {
  // Grid,
  // Box,
  // Avatar,
  // VStack,
  // IconButton,
  useDisclosure,
  // Button,
  // Drawer,
  // DrawerBody,
  // DrawerFooter,
  // DrawerHeader,
  // DrawerOverlay,
  // DrawerContent,
  // DrawerCloseButton,
  // Heading,
  // List,
  // ListItem,
  Divider,
  Flex,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import {
  FaUserPlus,
  FaInbox,
  FaMicrophone,
  FaHeadset,
  FaChevronDown,
} from "react-icons/fa";

import { Page } from "lib/layout/Page";

import { SwapActions } from "./Swap/SwapActions";
// @ts-ignore
import backgroundImage from "lib/assets/background/background.png"; // Adjust the path

const Home = () => {
  localStorage.setItem("chakra-ui-color-mode", "dark");
  return (
    <Page>
      <Stack
        flex={1}
        justifyContent="center"
        alignItems="center"
        position="relative" // Set position to relative
        zIndex={1} // Set a higher z-index to keep the header above the background
      >
        <SwapActions />
      </Stack>
      <Flex
        backgroundImage={`url(${backgroundImage})`} // Replace with the actual image path
        backgroundSize="cover"
        backgroundPosition="center"
        position="absolute" // Set position to absolute
        top={100}
        right={0}
        bottom={0}
        left={0}
        zIndex={0} // Set a lower z-index for the background
      />
    </Page>
  );
};

export default Home;
