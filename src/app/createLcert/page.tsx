"use client";
import React, { useState, useEffect } from "react";
import { Box, Icon, Typography, useTheme } from "@mui/material";
import { Address } from "viem";
import { TExistingOrgProps, TCreateLCertProps, TOrg } from "@/types";
import { ExistingOrgsSection, CreateLcertSection } from "@/components";

enum ECreateLcert {
  CHOOSE_ORG = "CHOOSE_ORG",
  CREATE_LCERT = "CREATE_LCERT",
}

export default function CreateLcert() {
  const [createLcertState, setCreateLcertState] = useState<ECreateLcert>(ECreateLcert.CHOOSE_ORG);
  const [chosenOrg, setChosenOrg] = useState<TOrg>();
  const theme = useTheme();

  const handleClick = (org: TOrg) => {
    setChosenOrg(org);
    setCreateLcertState(ECreateLcert.CREATE_LCERT);
  };

  return (
    <div className="w-full bg-[#1b222d] p-4 h-full">
      <p className="font-semibold text-2xl ">Create License Certificate</p>
      {createLcertState === ECreateLcert.CHOOSE_ORG && (
        <Box>
          <ExistingOrgsSection setEnumState={handleClick} />
        </Box>
      )}

      {createLcertState === ECreateLcert.CREATE_LCERT && (
        <CreateLcertSection chosenOrg={chosenOrg} setCreateLcertState={setCreateLcertState} />
      )}
    </div>
  )
}