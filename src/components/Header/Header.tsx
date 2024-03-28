"use client";
import React from "react";
import Link from "next/link";
import { Flex, Heading } from "@chakra-ui/react";

function Header() {
  return (
    <Flex
      position="fixed"
      direction="row"
      justify="space-between"
      align="center"
      w="100vw"
      h="8vh"
      bg="background"
      px={6}
      color="primaryText"
      zIndex={10}
    >
      <Link href="/">
      <Heading>LCerts</Heading>
      </Link>

      <Flex
        direction="row"
        align="center"
        gap={4}
      >
        <Flex
          direction="column"
          align="right"
          justify="center"
        >
          <w3m-button />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Header;