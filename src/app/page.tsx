"use client";
import React from "react";
import { Flex, Box, Button, Text, Input, Link, Heading, Card, CardBody, CardHeader, FormControl, FormLabel, FormErrorMessage, Switch, useToast } from "@chakra-ui/react";
import { useAccount, useReadContract, useWriteContract, useSimulateContract, usePrepareTransactionRequest } from "wagmi";
import { PageLayout } from "@/components";
import { useFormik } from "formik";
import { Contracts } from "@/contracts";
import * as Yup from "yup";
import Image from "next/image";
import styles from "./page.module.css";
import { create } from "domain";

type CertificateParams = {
  name: string;
  symbol: string;
  uri: string;
  transferable: boolean;
  maxSupply: number;
  expiration: number;
  creator: `0x${string}` | undefined;
}

export default function Home() {
  const toast = useToast()
  const { isConnected, address } = useAccount()
  const { writeContract: createCertificate, error: createCertificateError, status } = useWriteContract()

  const createCertificateForm = useFormik({
    initialValues: {
      name: "",
      symbol: "",
      uri: "", // This will be dynamically set in the onSubmit
      transferable: false,
      maxSupply: 0,
      expiration: 0,
      creator: address,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      symbol: Yup.string().required("Symbol is required"),
      transferable: Yup.boolean().required("Transferable is required"),
      maxSupply: Yup.number().min(1, "Max Supply must be at least 1").required("Max Supply is required"),
      expiration: Yup.number().min(1, "Expiration must be at least 1 day").required("Expiration is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const args: CertificateParams = {
        name: values.name,
        symbol: values.symbol,
        uri: "http://localhost:3000/api/certificate/1", // This will be dynamically set in the onSubmit
        transferable: values.transferable,
        maxSupply: values.maxSupply,
        expiration: values.expiration,
        creator: address,
      }
      
      console.log("Creating certificate", args)
      try {
        createCertificate({
          abi: Contracts.csi.abi,
          address: Contracts.csi.address,
          functionName: "deployCertificate",
          args: [{
            name: values.name,
            symbol: values.symbol,
            contractURI: values.uri, 
            transferable: values.transferable,
            maxTotalSupply: values.maxSupply,
            expire: values.expiration, 
            creator: values.creator,
          }],
          chainId: 80001,
        });

        console.log(createCertificate)
        console.log(createCertificateError)
        // Handle success
        toast({
          title: "Certificate Created",
          description: "The certificate has been successfully created.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });

      } catch (error: any) {
        // Handle error
        console.log( error)
        toast({
          title: "Error creating certificate",
          description: error.message || "An error occurred while creating the certificate.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <PageLayout title="Issue Certificate" description="Issue a certificate to a student">
      <Flex direction="column" ml="" align="flex-start" justify="center" h="100%" w="100%" pl={16} mt={12}>
        <Heading
          textAlign="right"
          size="lg"
        >
          Issue Certificate
        </Heading>
        <form onSubmit={createCertificateForm.handleSubmit}>
        <Flex
          direction="row"
          justify="space-between"
          w="100%"
          mt={8}
          gap={4}
        >
          <Card
            w="100%"
            borderRadius={8}
            bg="background"
            color="primaryText"
          >
            <CardHeader py={4}>
              <Text>
                Certificate Details
              </Text>
            </CardHeader>
            <CardBody>
              <Flex
                direction="row"
                justify="space-between"
                align="center"
                gap={8}
                mb={4}
              >
                <FormControl id="name" isRequired isInvalid={!!createCertificateForm.errors.name && createCertificateForm.touched.name}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Name"
                    {...createCertificateForm.getFieldProps("name")}
                  />
                  <FormErrorMessage>{createCertificateForm.errors.name}</FormErrorMessage>
                </FormControl>

                <FormControl id="symbol" isRequired isInvalid={!!createCertificateForm.errors.symbol && createCertificateForm.touched.symbol}>
                  <FormLabel>Symbol</FormLabel>
                  <Input
                    type="text"
                    placeholder="Symbol"
                    {...createCertificateForm.getFieldProps("symbol")}
                  />
                  <FormErrorMessage>{createCertificateForm.errors.symbol}</FormErrorMessage>
                </FormControl>
              </Flex>

              <FormControl id="transferable" isInvalid={!!createCertificateForm.errors.transferable}>
                <FormLabel>Transferable</FormLabel>
                <Flex direction="row" justify="flex-start" align="center" gap={4}>
                  <Switch
                    {...createCertificateForm.getFieldProps("transferable")}
                  />
                  <Text>{createCertificateForm.values.transferable ? "Yes" : "No"}</Text>
                </Flex>
                <FormErrorMessage>{createCertificateForm.errors.transferable}</FormErrorMessage>
              </FormControl>

            </CardBody>
          </Card>

          <Card
            w="100%"
            borderRadius={8}
            bg="background"
            color="primaryText"
          >
            <CardHeader py={6} ></CardHeader>
            <CardBody>
              <Flex
                direction="row"
                justify="space-between"
                align="center"
                gap={4}
                mb={4}
              >
                <FormControl id="expiration" isRequired isInvalid={!!createCertificateForm.errors.expiration && createCertificateForm.touched.expiration}>
                  <FormLabel>Expiration in days</FormLabel>
                  <Input
                    type="number"
                    placeholder="Expiration"
                    {...createCertificateForm.getFieldProps("expiration")}
                  />
                  <FormErrorMessage>{createCertificateForm.errors.expiration}</FormErrorMessage>
                </FormControl>

                <FormControl id="maxSupply" isRequired isInvalid={!!createCertificateForm.errors.maxSupply && createCertificateForm.touched.maxSupply}>
                  <FormLabel>Max Supply</FormLabel>
                  <Input
                    type="number"
                    placeholder="Max Supply"
                    {...createCertificateForm.getFieldProps("maxSupply")}
                  />
                  <FormErrorMessage>{createCertificateForm.errors.maxSupply}</FormErrorMessage>
                </FormControl>
              </Flex>

              <Button
                w="100%"
                p={4}
                colorScheme="blue"
                type="submit"
                onClick={() => console.log("BUTTON WORKS?")}
                isLoading={createCertificateForm.isSubmitting}
              >
                <Text size="sm">
                  Create Certificate
                </Text>
              </Button>

            </CardBody>
          </Card>
        </Flex>
        </form>
      </Flex>
    </PageLayout >
  );
}

// Path: src/app/page.tsx