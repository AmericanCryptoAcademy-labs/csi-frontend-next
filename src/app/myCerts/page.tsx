"use client";
import React, { useState, useEffect } from "react";
import { Flex, Box, Button, Text, Input, Link, Heading, Card, CardBody, CardHeader, FormControl, FormLabel, FormErrorMessage, useToast } from "@chakra-ui/react";
import { useAccount, useReadContract, useWriteContract, useSimulateContract, usePrepareTransactionRequest } from "wagmi";
import { Contracts } from "@/contracts";
import { PageLayout } from "@/components";

function Page() {
    return (
        <PageLayout title="My Certificates" description="View your certificates">
            <Box>
                <Heading>My Certificates</Heading>
                <Text>View your certificates</Text>
            </Box>
        </PageLayout>
    )
}

export default Page;