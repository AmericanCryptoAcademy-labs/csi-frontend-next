"use client";
import React from "react";
import { Box, Button, Icon, Typography } from "@mui/material";
import { appAtom } from "@/store/AppStore";
import { useAtom } from "jotai";
import { Address } from "viem";
import { StyledCard } from "@/components/Cards/Cards";
import { TExistingOrgProps, TOrg } from "@/types";

export default function ExistingOrgsSection(props: TExistingOrgProps) {
  const [appState, setAppState] = useAtom(appAtom);

  return (
    <div>
      {appState.allOrgs.map((org: TOrg, index: number) => (
        <div key={index}>
          <div className="w-1/2 bg-[#24303F] my-2 py-3 rounded-lg px-5 justify-between">
            <div className="flex justify-center">
              <p className="text-xl">Organization Name: {org.orgName}</p>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              <p className="text-md">Deployer:</p>
              <p className="text-md text-[#d2d3dc]">{org.orgDeployer}</p>
            </div>
            <div className="flex justify-center gap-2 mt-1">
              <p className="text-md">Address:</p>
              <p className="text-md text-[#d2d3dc]">{org.orgAddress}</p>
            </div>

            <div className="w-full flex justify-center">
              <button
                className="bg-[#3d51e0] py-2 px-10 rounded mt-4   "
                onClick={() => props.setEnumState(org)}
              >
                Create License Certificate
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
