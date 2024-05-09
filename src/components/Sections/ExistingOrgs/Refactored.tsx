"use client";
import React from "react";
import { Box, Button, Icon, Typography } from "@mui/material";
import { appAtom } from "@/store/AppStore";
import { useAtom } from "jotai";
import { Address } from "viem";
import { StyledCard } from "@/components/Cards/Cards";
import { TExistingOrgProps, TOrg } from "@/types";

export default function Refactored(props: TExistingOrgProps) {
  const [appState, setAppState] = useAtom(appAtom);
  console.log(appState);

  return (
    <div className="w-1/2 py-2">
      <div className="">
        {appState.allOrgs.map((org: TOrg, index: number) => (
          <div
            className="w-full bg-[#24303F] my-2 py-3 flex rounded-lg px-5 justify-between"
            key={index}
          >
            <p className="text-lg my-auto">{org.orgName}</p>
            <button
              className="bg-[#3d51e0] py-2 px-4 rounded"
              color="primary"
              onClick={() => props.setEnumState(org)}
            >
              Create License Certificate
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
