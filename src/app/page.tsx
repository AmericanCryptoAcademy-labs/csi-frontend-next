"use client";
import Image from "next/image";
import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { CreateOrgSection, ApplySection, ExistingOrgsSection } from "@/components";
import { Address } from "viem";
import { appAtom } from "@/store/AppStore";
import { useAtom } from "jotai";
import OrganizationList from "@/components/Sections/ExistingOrgs/OrganizationList";

export default function Home() {
  const [appState, setAppState] = useAtom(appAtom);
  const theme = useTheme();

  
  
  return (

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          minHeight: "100vh",
          background: theme.palette.background.paper,
        }}
      >
        {appState.canCreateOrg ? (
          <div className="flex w-full">
            <CreateOrgSection />
            <OrganizationList />
            {/* <ExistingOrgsSection /> */}
          </div>
          
        ) : (
          <ApplySection />
        )}
      </Box>
  );
}
