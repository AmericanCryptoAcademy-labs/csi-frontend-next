'use client';
import React from "react";
import { Box, Icon, Typography, useTheme } from "@mui/material";
import { appAtom } from "@/store/AppStore";
import { useAtom } from "jotai";

export default function ApplySection() {
  const theme = useTheme();
  const [appState, setAppState] = useAtom(appAtom);

  return (
/*

 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex gap-1" role="alert">
                    <span className="block sm:inline">Lcerts.com is coming out of stealth soon. To become an authorized lcerts user contact
                        <span className="font-bold">{` hello@standardsinstitute.org `} </span>and we will setup your account.</span>
                </div>
*/
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: 2,
        padding: 2,
        width: "100%",
      }}
    >
      <Typography variant="h4">Apply</Typography>
      <Typography variant="body1">
        Lcerts.com is coming out of stealth soon. To become an authorized lcerts user contact <span className="font-bold">
          <a href="mailto:hello@standardsinstitute.org">
            email
          </a>
        </span> and we will setup your account.
      </Typography>
    </Box>
  );
}