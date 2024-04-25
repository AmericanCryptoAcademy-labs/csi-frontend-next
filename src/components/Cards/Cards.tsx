'use client';
import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { TPrimaryButtonProps } from "@/types";

// how to add on click to this button?
const StyledCard = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "75%",
  padding: "32px",
  marginTop: "32px",
  borderRadius: "8px",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  gap: "16px",
  color: theme.palette.text.primary,
  background: theme.palette.background.default,
}));

export { StyledCard }