'use client';
import React from "react";
import { Box, Icon, Typography, useTheme } from "@mui/material";
import { useAccount } from "wagmi";
import { appAtom } from "@/store/AppStore";
import { useAtom } from "jotai";
import Link from "next/link";

export default function SideBar() {
  const theme = useTheme();
  const [appState, setAppState] = useAtom(appAtom);
  const { address, isConnected } = useAccount();


  return (
    <Box
      sx={{
        width: 300,  // Fixed width for sidebar
        height: "100%",
        zIndex: 1,
        background: theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          height: 100,
          borderBottom: "1px solid #2c3e50",
        }}
      >
        <Typography variant="h4">Menu</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",

          height: "100%",
          padding: 2,
          gap: 2,
        }}
      >
        {/* Create Org */}
        <Link href="/">
          <Typography variant="body1">
            <Icon sx={{ marginRight: 1 }}>home</Icon>
            Create Org
          </Typography>
        </Link>

        {/* Create LCret */}
        <Link href="/createLcert">
          <Typography variant="body1">
            <Icon sx={{ marginRight: 1 }}>add</Icon>
            Create LCret
          </Typography>
        </Link>

        {/* Issue LCret */}
        <Link href="/issueLCert">
          <Typography variant="body1">
            <Icon sx={{ marginRight: 1 }}>add</Icon>
            Issue LCret
          </Typography>
        </Link>
          
        {/* View My LCrets */}
        <Typography variant="body1">
          View My LCrets
        </Typography>

        <Typography variant="body1">
          Manage Org
        </Typography>

        <Typography variant="body1">
          Manage LCret
        </Typography>

        <Typography variant="body1">
          Manage Users
        </Typography>

      </Box>

    </Box>
  );
}