"use client";
import React from "react";
import Head from 'next/head';
import { PageProps } from "@/types/PageLayoutProps";
import { useAccount } from "wagmi";
import { VStack, Flex } from "@chakra-ui/react";
import { Header, Navbar } from "@/components";

function PageLayout({
  title,
  description,
  children,
}: PageProps) {
  return (
    <VStack
      position="relative"
      bg="darkBackground"
      color="primaryText"
      minH="100vh"
      maxW="100vw"
      overflowX="hidden"
      zIndex={0}
    >
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Header />
      <Flex
        direction="row"
        align="flex-start"
        justify="center"
        w="100%"
      >
        <Navbar />
        <Flex w="100%" h="100%" mt={20}>
          {children}
        </Flex>
      </Flex>
    </VStack>
  );
}

export default PageLayout;