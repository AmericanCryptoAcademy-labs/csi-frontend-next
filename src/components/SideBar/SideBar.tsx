"use client";
import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useAccount } from "wagmi";
import { appAtom } from "@/store/AppStore";
import { useAtom } from "jotai";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function SideBar() {
  const theme = useTheme();
  const [appState, setAppState] = useAtom(appAtom);
  const { address, isConnected } = useAccount();

  return (
    <Box
      sx={{
        width: 300, // Fixed width for sidebar
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

          height: "100%",
          padding: 2,
          marginTop: 5,
          gap: 2,
        }}
      >
        {/* Create Org */}
        <Link href="/">
          <Typography className="flex gap-1.5" variant="body1">
            <Icon className="text-2xl" icon="bi:building-fill-add" />
            Create Organization
          </Typography>
        </Link>

        {/* Create LCert */}
        <Link href="/createLcert">
          <Typography className="flex gap-1.5" variant="body1">
            <Icon className="text-2xl" icon="uil:create-dashboard" />
            Create Certificate
          </Typography>
        </Link>

        {/* Issue LCert */}
        <Link href="/issueLCert">
          <Typography className="flex gap-1.5" variant="body1">
            <Icon
              className="text-2xl"
              icon="clarity:certificate-outline-badged"
            />
            Issue Certificate
          </Typography>
        </Link>

        {/* View My LCrets */}
        <Link href="/showcase">
          <Typography className="flex gap-1.5" variant="body1">
            <Icon
              className="text-2xl"
              icon="ant-design:safety-certificate-outlined"
            />
            View My Certificates
          </Typography>
        </Link>

        {/* <Typography variant="body1">Manage Org</Typography>

        <Typography variant="body1">Manage LCret</Typography>

        <Typography variant="body1">Manage Users</Typography> */}
      </Box>
    </Box>
  );
}
