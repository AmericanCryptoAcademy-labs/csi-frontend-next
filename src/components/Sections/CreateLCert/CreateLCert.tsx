"use client";
import React from "react";
import { Box, Button, Icon, Typography, Input, useTheme, Checkbox } from "@mui/material";
import { Address } from "viem";
import { TCreateLCertParams, TCreateLCertProps } from "@/types";
import { validateAddresses } from "@/helpers";
import { Contracts } from "@/contracts";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useWriteContract, useAccount } from "wagmi";
import { StyledCard } from "@/components/Cards/Cards";
import { PrimaryButton } from "@/components/Buttons/Buttons";


enum ECreateLcert {
  CHOOSE_ORG = "CHOOSE_ORG",
  CREATE_LCERT = "CREATE_LCERT",
}

export default function CreateLCertSection(props: TCreateLCertProps) {
  const theme = useTheme();
  const { isConnected, address } = useAccount();
  const { writeContract: writeCreateLCert, error } = useWriteContract();

  const createLCertForm = useFormik({
    initialValues: {
      name: "",
      symbol: "",
      maxSupply: 0,
      transferable: false,
      revocable: false,
      creator: address,
      issuersForCertificate: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      symbol: Yup.string().required("Required"),
      maxSupply: Yup.number().required("Required"),
      transferable: Yup.boolean().required("Required"),
      revocable: Yup.boolean().required("Required"),
      creator: Yup.string().required("Required"),
      issuersForCertificate: Yup.string().required("Issuers are required").test(
        "is-valid-array",
        "Issuers must be a valid list of Ethereum addresses",
        value => validateAddresses(value)
      ),
    }),
    onSubmit: async (values) => {
      const args: TCreateLCertParams = {
        name: values.name,
        symbol: values.symbol,
        maxSupply: values.maxSupply,
        transferable: values.transferable,
        revocable: values.revocable,
        creator: address as Address,
        issuersForCertificate: values.issuersForCertificate.split(',').map((address: string) => address.trim())
      }

      try {
        await writeCreateLCert({
          abi: Contracts.CSIOrg.abi,
          address: props?.chosenOrg?.orgAddress as Address,
          functionName: "createLCert",
          args: [args.name, args.symbol, args.maxSupply, args.transferable, args.revocable, args.creator, args.issuersForCertificate],
        });

      } catch (e) {
        console.error(e);
      }
    }
  });

  return (
    <Box>
      <StyledCard>
        <Icon
          sx={{
            position: "absolute",
            top: "0",
            left: "0",
            fontSize: "2rem",
            color: "green",
          }}
          onClick={() => props.setCreateLcertState(ECreateLcert.CHOOSE_ORG)}
        >
          back
        </Icon>
        {/* Contract Org Info */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            background: "blue",
            minWidth: "100%",
          }}
        >
          <Typography variant="h6">
            Organization Info
          </Typography>
          <Typography variant="body1">
            Name: {props?.chosenOrg?.orgName}
          </Typography>
          <Typography variant="body1">
            Org Address: {props?.chosenOrg?.orgAddress}
          </Typography>
        </Box>

        {/* Create LCert Form */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "16px",
            width: "100%",
          }}
        >
          <form onSubmit={createLCertForm.handleSubmit}>

            {/* Name */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                width: "100%",
              }}
            >
              <label htmlFor="name">Name</label>
              <Input
                id="name"
                name="name"
                type="text"
                onChange={createLCertForm.handleChange}
                value={createLCertForm.values.name}
                sx={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid",
                  borderColor: createLCertForm.errors.name && createLCertForm.touched.name ? "red" : "black",
                  borderRadius: "6px",
                  background: theme.palette.primary.main,
                  color: "#000",
                }}
              />
              {createLCertForm.errors.name && createLCertForm.touched.name && (
                <div>{createLCertForm.errors.name}</div>
              )}
            </Box>

            {/* Symbol */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                width: "100%",
              }}
            >
              <label htmlFor="symbol">Symbol</label>
              <Input
                id="symbol"
                name="symbol"
                type="text"
                onChange={createLCertForm.handleChange}
                value={createLCertForm.values.symbol}
                sx={{ 
                  width: "100%",
                  padding: "8px",
                  border: "1px solid",
                  borderColor: createLCertForm.errors.symbol && createLCertForm.touched.symbol ? "red" : "black",
                  borderRadius: "6px",
                  background: theme.palette.primary.main,
                  color: "#000",
                }}
              />
              {createLCertForm.errors.symbol && createLCertForm.touched.symbol && (
                <div>{createLCertForm.errors.symbol}</div>
              )}
            </Box>

            {/* Max Supply */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                width: "100%",
              }}
            >
              <label htmlFor="maxSupply">Max Supply</label>
              <Input
                id="maxSupply"
                name="maxSupply"
                type="number"
                onChange={createLCertForm.handleChange}
                value={createLCertForm.values.maxSupply}
                sx={{ 
                  width: "100%",
                  padding: "8px",
                  border: "1px solid",
                  borderColor: createLCertForm.errors.maxSupply && createLCertForm.touched.maxSupply ? "red" : "black",
                  borderRadius: "6px",
                  background: theme.palette.primary.main,
                  color: "#000",
                }}
              />
              {createLCertForm.errors.maxSupply && createLCertForm.touched.maxSupply && (
                <div>{createLCertForm.errors.maxSupply}</div>
              )}
            </Box>

            {/* Transferable */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                width: "100%",
              }}
            >
              <label htmlFor="transferable">Transferable</label>
              <Checkbox
                id="transferable"
                name="transferable"
                onChange={createLCertForm.handleChange}
                checked={createLCertForm.values.transferable}
                sx={{ 
                  width: "100%",
                  padding: "8px",
                  border: "1px solid",
                  borderColor: createLCertForm.errors.transferable && createLCertForm.touched.transferable ? "red" : "black",
                  borderRadius: "6px",
                  background: theme.palette.primary.main,
                  color: "#000",
                }}
              />
              {createLCertForm.errors.transferable && createLCertForm.touched.transferable && (
                <div>{createLCertForm.errors.transferable}</div>
              )}
            </Box>

            {/* Revocable */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                width: "100%",
              }}
            >
              <label htmlFor="revocable">Revocable</label>
              <Checkbox
                id="revocable"
                name="revocable"
                onChange={createLCertForm.handleChange}
                checked={createLCertForm.values.revocable}
                sx={{ 
                  width: "100%",
                  padding: "8px",
                  border: "1px solid",
                  borderColor: createLCertForm.errors.revocable && createLCertForm.touched.revocable ? "red" : "black",
                  borderRadius: "6px",
                  background: theme.palette.primary.main,
                  color: "#000",
                }}
              />
              {createLCertForm.errors.revocable && createLCertForm.touched.revocable && (
                <div>{createLCertForm.errors.revocable}</div>
              )}
            </Box>

            {/* Issuers For Certificate */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                minWidth: "100%",
              }}
            >
              <label htmlFor="issuersForCertificate">Issuers</label>
              <Input
                id="issuersForCertificate"
                name="issuersForCertificate"
                type="text"
                onChange={createLCertForm.handleChange}
                value={createLCertForm.values.issuersForCertificate}
                sx={{ 
                  width: "100%",
                  padding: "8px",
                  border: "1px solid",
                  borderColor: createLCertForm.errors.issuersForCertificate && createLCertForm.touched.issuersForCertificate ? "red" : "black",
                  borderRadius: "6px",
                  background: theme.palette.primary.main,
                  color: "#000",
                }}
              />
              {createLCertForm.errors.issuersForCertificate && createLCertForm.touched.issuersForCertificate && (
                <div>{createLCertForm.errors.issuersForCertificate}</div>
              )}
            </Box>

            <PrimaryButton type="submit">Create LCert</PrimaryButton>
          </form>
        </Box>
      </StyledCard>

    </Box>
  )
}
