'use client'
import React from "react";
import { Box, useTheme } from "@mui/material";
import { Header, SideBar } from "@/components"

export default function PageLayout({ children, theme }: { children: React.ReactNode, theme?: any }) {
  return (
    <Box sx={{
      position: 'absolute',
      top:0,
      left:0,
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      zIndex: 0,
      background: theme.palette.background.default,
    }}>
      <Header />
      <Box sx={{
        display: 'flex',
        flexGrow: 1,
      }}>
        <SideBar />
        <Box sx={{
          flexGrow: 1,
        }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
