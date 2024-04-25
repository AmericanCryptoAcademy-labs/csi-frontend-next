'use client'; 
import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff", /// Change
      900: "#000000", // Change
    },
    secondary: {
      main: "#000000", // Change
    },
    background: {
      default: "#25313f",
      paper: "#1a232d", // Darker background
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0bec5",
      disabled: "#b0bec5",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif", // Change
    h1: {
      fontSize: "48px",
      fontWeight: 600,
      color: "#ffffff",
    },
    h2: {
      fontSize: "36px",
      fontWeight: 600,
      color: "#ffffff",
    },
    h3: {
      fontSize: "24px",
      fontWeight: 600,
      color: "#ffffff",
    },
    h4: {
      fontSize: "20px",
      fontWeight: 600,
      color: "#ffffff",
    },
    h5: {
      fontSize: "18px",
      fontWeight: 600,
      color: "#ffffff",
    },
    h6: {
      fontSize: "16px",
      fontWeight: 600,
      color: "#ffffff",
    },
    body1: {
      fontSize: "16px",
      color: "#ffffff",
    },
    body2: {
      fontSize: "14px",
      color: "#ffffff",
    },
    button: {
      fontSize: "16px",
      textTransform: "none",
      color: "#ffffff",
    },
  },
  transitions: {
    duration: {
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});