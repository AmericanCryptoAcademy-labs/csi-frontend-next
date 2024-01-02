"use client";
import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";

// importing Chakra
import {ChakraProvider } from "@chakra-ui/react";

// Importing Thirdweb Providers
import {ThirdwebProvider,} from "@thirdweb-dev/react";

export default function Home() {
  return (
    <>
      <ChakraProvider>
        <ThirdwebProvider>

        <ECommerce />

        </ThirdwebProvider>
    
      </ChakraProvider>     
    </>
  );
}
