"use client";
import React, { useState, useEffect } from "react";
import { Box, Icon, Typography } from "@mui/material";
import { Address } from "viem";
import { TExistingOrgProps } from "@/types";
import { ExistingOrgsSection } from "@/components";

enum ECreateLcert {
  CHOOSE_ORG = "CHOOSE_ORG",
  CREATE_LCERT = "CREATE_LCERT",
}

export default function CreateLcert(props: TExistingOrgProps) {
  const [createLcertState, setCreateLcertState] = useState<ECreateLcert>(ECreateLcert.CHOOSE_ORG);

  return (
    <Box>
      <Typography variant="h4">Create License Certificate</Typography>
      {createLcertState === ECreateLcert.CHOOSE_ORG && (
        <Box>
          <ExistingOrgsSection setCreateLcertState={setCreateLcertState} />
        </Box>
      )}

      {createLcertState === ECreateLcert.CREATE_LCERT && (
        <Box>
          <Icon 
            sx={{ marginRight: 1 }}
            onClick={() => setCreateLcertState(ECreateLcert.CHOOSE_ORG)}
          >Back</Icon>
          <Typography variant="h6">Create License Certificate</Typography>
        </Box>
      )}
    </Box>
  )
}