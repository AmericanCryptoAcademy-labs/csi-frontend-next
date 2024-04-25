"use client";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { TOrg } from "@/types";
import { ExistingLCertsSection, ExistingOrgsSection } from "@/components";

enum EIssueCerts {
  CHOOSE_ORG = "CHOOSE_ORG",
  CHOOSE_LCERT = "CHOOSE_LCERT",
}

export default function IssueCerts() {
  const [issueCertsState, setIssueCertsState] = useState<EIssueCerts>(EIssueCerts.CHOOSE_ORG);
  const [chosenOrg, setChosenOrg] = useState<TOrg>();
  const [chosenLcert, setChosenLcert] = useState<any>();


  const handleClickChoseOrg = (org: TOrg) => {
    setChosenOrg(org);
    setIssueCertsState(EIssueCerts.CHOOSE_LCERT);
  };


  return (
    <Box>
      {issueCertsState === EIssueCerts.CHOOSE_ORG && (
        <ExistingOrgsSection setEnumState={handleClickChoseOrg} />  
      )}

      {issueCertsState === EIssueCerts.CHOOSE_LCERT && (
        <Box>
          <ExistingLCertsSection org={chosenOrg} />
        </Box>
      )}

    </Box>
  );
}