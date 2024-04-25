'use client';
import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/system";
import { TPrimaryButtonProps } from "@/types";

// how to add on click to this button?
const PrimaryButton = styled(Button)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  minWidth: "172px",
  minHeight: "42px",
  borderRadius: "6px",
  padding: "8px 16px",
  "&:hover": {
    background: theme.palette.background.default,
    color: theme.palette.text.secondary,
    border: `1px solid ${theme.palette.text.secondary}`,
  },
}));

const AccountButton = styled(Button)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  minWidth: "172px",
  minHeight: "42px",
  borderRadius: "6px",
  padding: "8px 16px",
  "&:hover": {
    background: theme.palette.background.default,
    color: theme.palette.text.secondary,
    border: `1px solid ${theme.palette.text.secondary}`,
  },  
}));

export { PrimaryButton, AccountButton };