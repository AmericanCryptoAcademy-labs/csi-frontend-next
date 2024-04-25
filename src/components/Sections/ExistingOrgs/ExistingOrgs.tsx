'use client';
import React from "react";
import { Box, Button, Icon, Typography } from "@mui/material";
import { appAtom } from "@/store/AppStore";
import { useAtom } from "jotai";
import { Address } from "viem";
import { StyledCard } from "@/components/Cards/Cards";
import { TExistingOrgProps } from "@/types";

export default function ExistingOrgsSection(props: TExistingOrgProps) {
  const [appState, setAppState] = useAtom(appAtom);

  return (
    <Box>
      <Typography variant="h4">Existing Organizations</Typography>
      <StyledCard>
        {appState.allOrgs.map((org: any) => (
          console.log("org", org),
          <Box key={org.orgAddress}>
            <Typography variant="h6">{org.name}</Typography>
            <Typography variant="body1">{org.deployer}</Typography>
            <Typography variant="body1">{org.orgAddress}</Typography>
            
            <Button
              variant="contained"
              color="primary"
              onClick={() => props.setCreateLcertState("CREATE_LCERT")}
            >
              Create License Certificate
            </Button>
          </Box>
        ))}
      </StyledCard>
    </Box>
  )
}