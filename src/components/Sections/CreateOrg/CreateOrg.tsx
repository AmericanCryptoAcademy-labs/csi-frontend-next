"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Input } from "@mui/material";
import { useAccount, useWriteContract } from "wagmi";
import { appAtom } from "@/store/AppStore";
import { useAtom } from "jotai";
import { PrimaryButton, AccountButton, StyledCard } from "@/components";
import { TCreateOrgParams } from "@/types";
import { Contracts } from "@/contracts";
import { useFormik } from "formik";
import * as Yup from "yup";
import { validateAddresses } from "@/helpers";
import { theme } from "@/theme";

export default function CreateOrgSection() {
  const [appState, setAppState] = useAtom(appAtom);
  const [orgName, setOrgName] = useState("");
  const [orgAdmins, setOrgAdmins] = useState<any>([]);
  const [orgIssuers, setOrgIssuers] = useState<any>([]);
  const { address } = useAccount();
  const { writeContract, error: createOrgError, isSuccess: createOrgSuccess } = useWriteContract();

  const createOrgForm = useFormik({
    initialValues: {
      orgName: "",
      orgAdmins: "",
      orgIssuers: "",
    },
    validationSchema: Yup.object({
      orgName: Yup.string().required("Required"),
      orgAdmins: Yup.string().required("Admins are required").test(
        "is-valid-array",
        "Admins must beee a valid list of Ethereum addresses",
        value => validateAddresses(value)
      ),
      orgIssuers: Yup.string().required("Issuers are required").test(
        "is-valid-array",
        "Issuers must be a valid list of Ethereum addresses",
        value => validateAddresses(value)
      ),
    }),
    onSubmit: async (values) => {
      setOrgName(values.orgName);
      setOrgAdmins(values.orgAdmins);
      setOrgIssuers(values.orgIssuers);

      const args: TCreateOrgParams = {
        orgName: values.orgName,
        orgAdmins: values.orgAdmins.split(","),
        orgIssuers: values.orgIssuers.split(","),
      }
      const value = (BigInt(10000000000000000));
      try {
        await writeContract({
          abi: Contracts.CSI.abi,
          address: Contracts.CSI.address,
          functionName: "createOrginization",
          args: [args.orgName, args.orgAdmins, args.orgIssuers],
          value: value,
        });

      } catch (e) {
        console.error(e);
      }

    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: "32px",
      }}
    >
      <Typography
        variant="h1"
        sx={{ alignSelf: "flex-start" }}
      >
        Create an Organization
      </Typography>

      {/* Create Org Card */}
      <StyledCard>
        <Typography variant="h2">
          Organization Details
        </Typography>
        <form onSubmit={createOrgForm.handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
          {/* Org Name */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "8px",
             
              minWidth: "100%",
            }}
          >
            <label 
              htmlFor="orgName"
              style={{ color: theme.palette.text.primary, fontSize: "22px" }}
            >
                Organization Name
            </label>
            <Input
              id="orgName"
              name="orgName"
              type="text"
              onChange={createOrgForm.handleChange}
              value={createOrgForm.values.orgName}
              sx={{ 
                width: "100%",
                padding: "8px",
                border: "1px solid",
                borderColor: createOrgForm.errors.orgName && createOrgForm.touched.orgName ? "red" : "black",
                borderRadius: "6px",
                background: theme.palette.primary.main,
                color: "#000",
              }}
            />
            {createOrgForm.errors.orgName && createOrgForm.touched.orgName && (
              <div>{createOrgForm.errors.orgName}</div>
            )}
          </Box>

          {/* Org Admins */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "8px",
             
              minWidth: "100%",
            }}
          >
            <label 
              htmlFor="orgAdmins"
              style={{ color: theme.palette.text.primary, fontSize: "22px" }}
            >
                Admins
            </label>
            <Input
              id="orgAdmins"
              name="orgAdmins"
              type="text"
              onChange={createOrgForm.handleChange}
              value={createOrgForm.values.orgAdmins}
              sx={{ 
                width: "100%",
                padding: "8px",
                border: "1px solid",
                borderColor: createOrgForm.errors.orgAdmins && createOrgForm.touched.orgAdmins ? "red" : "black",
                borderRadius: "6px",
                background: theme.palette.primary.main,
                color: "#000",
              }}
            />
            {createOrgForm.errors.orgAdmins && createOrgForm.touched.orgAdmins && (
              <div>{createOrgForm.errors.orgAdmins}</div>
            )}
          </Box>

          {/* Org Issuers */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "8px",
             
              minWidth: "100%",
            }}
          >
            <label 
              htmlFor="orgIssuers"
              style={{ color: theme.palette.text.primary, fontSize: "22px" }}
            >
                Issuers
            </label>
            <Input
              id="orgIssuers"
              name="orgIssuers"
              type="text"
              onChange={createOrgForm.handleChange}
              value={createOrgForm.values.orgIssuers}
              sx={{ 
                width: "100%",
                padding: "8px",
                border: "1px solid",
                borderColor: createOrgForm.errors.orgIssuers && createOrgForm.touched.orgIssuers ? "red" : "black",
                borderRadius: "6px",
                background: theme.palette.primary.main,
                color: "#000",
              }}
            />
            {createOrgForm.errors.orgIssuers && createOrgForm.touched.orgIssuers && (
              <div>{createOrgForm.errors.orgIssuers}</div>
            )}
          </Box>

          <PrimaryButton type="submit">Create Organization</PrimaryButton>
        </form>

      </StyledCard>
    </Box>
  )
}