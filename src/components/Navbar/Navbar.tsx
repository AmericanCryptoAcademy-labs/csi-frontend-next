"use client";
import React from "react";
import Link from "next/link";
import { Flex, Heading, Text, Button, Box, Icon } from "@chakra-ui/react";
import { RiShieldCheckLine } from "react-icons/ri";
import { MdManageAccounts } from "react-icons/md";
import { PiCertificateDuotone } from "react-icons/pi";



function Navbar() {


  return (
    <Flex
      left={0}
      direction="column"
      p={8}
      bg="background"
      color="primaryText"
      h="100vh"
      w={72}
    >

      {/* Nav Bar Menu */}
      <Flex
        direction="column"
        align="left"
        justify="center"
        w="100%"
        mt={28}
        p={2}
      >
        <Text
          fontSize="md"
          opacity={0.5}
          mb={8}
        >
          Menu
        </Text>
        <Flex
          direction="column"
          align="left"
          justify="center"
          w="100%"
          gap={8}
        >
          <Link href="/">
            <Flex
              direction="row"
              justify="start"
              align="center"
              gap={2}
              cursor="pointer"
            >
              <Icon as={PiCertificateDuotone} boxSize={6} />
              <Text>
                Issue Certificate
              </Text>
            </Flex>
          </Link>


          <Link href="/myCerts">
            <Flex
              direction="row"
              justify="start"
              align="center"
              gap={2}
              cursor="pointer"
            >
              <Icon as={RiShieldCheckLine} boxSize={6} />
              <Text>
                My Certificates
              </Text>
            </Flex>
          </Link>

          <Link href="/authorize">
            <Flex
              direction="row"
              justify="start"
              align="center"
              gap={2}
              cursor="pointer"
            >
              <Icon as={MdManageAccounts} boxSize={6} />
              <Text>
                Manage Teachers
              </Text>
            </Flex>
          </Link>
        </Flex>

      </Flex>
    </Flex>
  )
}

export default Navbar;