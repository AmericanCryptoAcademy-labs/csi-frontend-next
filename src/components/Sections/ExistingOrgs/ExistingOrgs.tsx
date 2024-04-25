'use client';
import React from "react";
import { Box, Button, Icon, Typography } from "@mui/material";
import { appAtom } from "@/store/AppStore";
import { useAtom } from "jotai";
import { Address } from "viem";
import { StyledCard } from "@/components/Cards/Cards";
import { TExistingOrgProps, TOrg } from "@/types";

export default function ExistingOrgsSection(props: TExistingOrgProps) {
  const [appState, setAppState] = useAtom(appAtom);

  return (
    <Box>
        {appState.allOrgs.map((org: TOrg, index: number) => (
          <StyledCard
            key={index}
          >
          <Box 
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}  
          >
            <Typography variant="h6">Org Name: {org.orgName}</Typography>
            <Typography variant="body1">Deployer: {org.orgDeployer}</Typography>
            <Typography variant="body1">Address: {org.orgAddress}</Typography>
           
            
            <Button
              variant="contained"
              color="primary"
              onClick={() => props.setEnumState(org)}
            >
              Create License Certificate
            </Button>
          </Box>
      </StyledCard>
        ))}
    </Box>
  )
}