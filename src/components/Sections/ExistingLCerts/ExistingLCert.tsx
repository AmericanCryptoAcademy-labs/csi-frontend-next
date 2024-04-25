'use client';
import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Collapse, Input } from "@mui/material";
import { useAtom } from "jotai";
import { appAtom } from "@/store/AppStore";
import { StyledCard } from "@/components/Cards/Cards";
import { readContract } from "wagmi/actions";
import { useConfig, useWriteContract } from "wagmi";
import { TExistingLCertProps, TOrg, TLCert, TIssueLCertParams } from "@/types";
import { Contracts } from "@/contracts";
import { Address } from "viem";
import { useFormik } from "formik";
import * as yup from "yup";

export default function ExistingOrgsSection(props: TExistingLCertProps) {
  const [appState, setAppState] = useAtom(appAtom);
  const [lCerts, setLCerts] = useState<TLCert[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const config = useConfig();
  const { writeContract: writeIssueCert, error } = useWriteContract();

  const issueLCertForm = useFormik({
    initialValues: {
      to: "" as Address,
      tokenURI: "",
      expInDays: 0,
    },
    validationSchema: yup.object({
      to: yup.string().required("Required"),
      tokenURI: yup.string().required("Required"),
      expInDays: yup.number().required("Required").min(1),
    }),
    onSubmit: async (values: TIssueLCertParams) => {
      console.log(values);
      await writeIssueCert({
        abi: Contracts.Cert.abi,
        address: lCerts[expandedIndex as number].certAddress,
        functionName: "mint",
        args: [values.to, values.tokenURI, values.expInDays],
      });
    }
  });

  const createCanvas = async (event: React.FormEvent) => {
    event.preventDefault();
    const files = await generateCertificate();
    setCertificateSrc(files)

    try {
      const blobfile = dataURLtoBlob(files);
      const ipnft = await uploadImage(blobfile);
      console.log(ipnft, "this is Ipnt");

    }
    catch (err) {
      console.log(err);
    }
  }

  const fetchLCertsForOrg = async (org: TOrg) => {
    const lcertAddresses: any = await readContract(config, {
      abi: Contracts.CSIOrg.abi,
      address: org.orgAddress,
      functionName: "getCertificates",
      args: []
    });

    const promises = lcertAddresses?.map((certAddress: Address) => fetchLCertData(certAddress));
    const lcertData = await Promise.all(promises);
    setLCerts(lcertData);
  }

  const fetchLCertData = async (certAddress: Address): Promise<TLCert> => {
    const lCertNamePromise = readContract(config, {
      abi: Contracts.Cert.abi,
      address: certAddress,
      functionName: "name",
      args: []
    });

    const lCertSymbolPromise = readContract(config, {
      abi: Contracts.Cert.abi,
      address: certAddress,
      functionName: "symbol",
      args: []
    });

    const [lCertName, lCertSymbol] = await Promise.all([lCertNamePromise, lCertSymbolPromise]);

    return {
      certName: lCertName as string,
      certSymbol: lCertSymbol as string,
      certAddress: certAddress
    };
  }

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  useEffect(() => {
    if (props.org) {
      fetchLCertsForOrg(props.org);
    }
  }, [props.org]);

  return (
    <Box>
      {lCerts.map((lCert, index) => (
        <StyledCard key={index}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6">Certificate Name: {lCert.certName}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleToggle(index)}
            >
              {expandedIndex === index ? 'Close Form' : 'Issue a LCert'}
            </Button>
            <Collapse in={expandedIndex === index}>
              <Box sx={{ margin: 2 }}>
                <Input
                  placeholder="Address"
                  value={issueLCertForm.values.to}
                  onChange={issueLCertForm.handleChange('to')}
                  error={issueLCertForm.touched.to && Boolean(issueLCertForm.errors.to)}
                  fullWidth
                />
                <Input
                  placeholder="Token URI"
                  value={issueLCertForm.values.tokenURI}
                  onChange={issueLCertForm.handleChange('tokenURI')}
                  error={issueLCertForm.touched.tokenURI && Boolean(issueLCertForm.errors.tokenURI)}
                  fullWidth
                />
                <Input
                  placeholder="Expiration in Days"
                  type="number"
                  value={issueLCertForm.values.expInDays}
                  onChange={issueLCertForm.handleChange('expInDays')}
                  error={issueLCertForm.touched.expInDays && Boolean(issueLCertForm.errors.expInDays)}
                  fullWidth
                />
                <Button onClick={() => issueLCertForm.handleSubmit()} variant="contained" sx={{ marginTop: 2 }}>Submit</Button>
              </Box>
            </Collapse>
          </Box>
        </StyledCard>
      ))}
    </Box>
  );
}
