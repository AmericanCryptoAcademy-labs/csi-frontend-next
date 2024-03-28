"use client";
import React, { useState, useEffect } from "react";
import { Flex, Box, Button, Text, Input, Link, Heading, Card, CardBody, CardHeader, FormControl, FormLabel, FormErrorMessage, useToast } from "@chakra-ui/react";
import { useAccount, useReadContract, useWriteContract, useSimulateContract, usePrepareTransactionRequest } from "wagmi";
import { Contracts } from "@/contracts";
import { PageLayout } from "@/components";
import * as Yup from "yup";
import { useFormik } from "formik";

function Page() {
  const [addAddress, setAddAddress] = useState("");
  const [removeAddress, setRemoveAddress] = useState("");
  const { isConnected, address } = useAccount();
  const [teachers, setTeachers] = useState([]);
  const toast = useToast();

  const { isSuccess: addIssuerSimSuccess, data, error, status } = useSimulateContract({
    abi: Contracts.csi.abi,
    address: Contracts.csi.address,
    functionName: "addTeacher",
    args: ["0x8122D786Aae279E8684aE8d75d658117Bac4e8a9"],
    chainId: 80001,
  })
  const { writeContract: addIssuer, error: addIssuerError } = useWriteContract()

  const { isSuccess: removeIssuerSimSuccess } = useSimulateContract({
    abi: Contracts.csi.abi,
    address: Contracts.csi.address,
    functionName: "removeTeacher",
    args: [removeAddress],
    chainId: 80001,
  })
  const { writeContract: removeIssuer, error: removeIssuerError } = useWriteContract()


  const authTeachers: any = useReadContract({
    abi: Contracts.csi.abi,
    address: Contracts.csi.address,
    functionName: "getTeachers",
    args: [],
    chainId: 80001,
  }).data

  const addIssuerForm = useFormik({
    initialValues: { address: "" },
    validationSchema: Yup.object({
      address: Yup.string().required("Address is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      console.log("Calling addIssuer", values.address)
      await addIssuer({
        abi: Contracts.csi.abi,
        address: Contracts.csi.address,
        functionName: "addTeacher",
        args: [values.address],
        chainId: 80001,
      })

      if (addIssuerError) {
        toast({
          title: "Error",
          description: addIssuerError?.message.slice(0, 43) || "An error occurred",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  });

  const removeIssuerForm = useFormik({
    initialValues: { address: "" },
    validationSchema: Yup.object({
      address: Yup.string().required("Address is required"),
    }),
    onSubmit: async (values) => {
      // Remove issuer
      console.log("Calling removeIssuer", values.address)
      await removeIssuer({
        abi: Contracts.csi.abi,
        address: Contracts.csi.address,
        functionName: "removeTeacher",
        args: [values.address],
        chainId: 80001,
      })

      if (removeIssuerError) {
        toast({
          title: "Error",
          description: removeIssuerError?.message.slice(0, 46) || "An error occurred",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }

    },
  });

  return (
    <PageLayout title="Authorize" description="Authorize an address to perform actions on your behalf">
      <Flex direction="column" ml="" align="flex-start" justify="center" h="100%" w="100%" px={16} mt={12}>
        <Heading
          textAlign="right"
          size="lg"
        >
          Authorize
        </Heading>

        <Flex
          direction="row"
          justify="center"
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
            <CardHeader borderBottom={"2px"} borderColor="gray.700">
              <Heading size="md" py={1} px={2}>
                Manage Issuers
              </Heading>
            </CardHeader>

            <CardBody
            >
              {/* Address of Issuer to add */}
              <FormControl id="address" isInvalid={addIssuerForm.touched.address && !!addIssuerForm.errors.address}>
                <FormLabel htmlFor="address" color="secondaryText" >Address of issuer to add</FormLabel>
                <Flex
                  direction="row"
                  justify="center"
                  align="center"
                  w="100%"
                  gap={2}
                >
                  <Input
                    type="text"
                    placeholder="0x"
                    {...addIssuerForm.getFieldProps("address")}
                  />
                  <FormErrorMessage>{addIssuerForm.errors.address}</FormErrorMessage>
                  <Button
                    w="120px"
                    p={4}
                    colorScheme="blue"
                    onClick={() => addIssuerForm.handleSubmit()}
                  >
                    <Text size="sm">
                      Add
                    </Text>
                  </Button>
                </Flex>
              </FormControl>

              {/* Address of Issuer to remove */}
              <FormControl mt={4} id="address" isInvalid={removeIssuerForm.touched.address && !!removeIssuerForm.errors.address} >
                <FormLabel htmlFor="address" >Address</FormLabel>
                <Flex
                  direction="row"
                  justify="center"
                  align="center"
                  w="100%"
                  gap={2}
                >
                  <Input
                    type="text"
                    placeholder="0x"
                    {...removeIssuerForm.getFieldProps("address")}
                  />
                  <FormErrorMessage>{removeIssuerForm.errors.address}</FormErrorMessage>
                  <Button
                    w="120px"
                    p={4}
                    colorScheme="blue"
                    onClick={() => removeIssuerForm.handleSubmit()}
                  >
                    <Text size="sm">
                      Remove
                    </Text>
                  </Button>
                </Flex>
              </FormControl>


            </CardBody>
          </Card>

          <Card
            w="80%"
            borderRadius={8}
            bg="background"
            color="primaryText"

          >
            <CardHeader>
              <Heading size="md" mb={4}>
                Authorized Issuers
              </Heading>
            </CardHeader>

            <CardBody
              h='fit-content'
              maxH="600px"
              overflowY="scroll"
            >
              {authTeachers && authTeachers?.map((teacher: any, index: number) => (
                <Flex
                  key={index}
                  direction="row"
                  align="center"
                  justify="space-between"
                  w="100%"
                  p={4}
                >
                  <Text>
                    {teacher}
                  </Text>
                </Flex>
              ))}
            </CardBody>
          </Card>
        </Flex>
      </Flex>
    </PageLayout>
  );
}

export default Page;
