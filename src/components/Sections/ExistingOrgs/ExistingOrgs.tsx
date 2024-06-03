"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Icon, Typography } from "@mui/material";
import { appAtom } from "@/store/AppStore";
import { useAtom } from "jotai";
import { Address } from "viem";
import { TExistingOrgProps, TOrg } from "@/types";

export default function ExistingOrgsSection(props: TExistingOrgProps) {
  const [appState] = useAtom(appAtom);
  const [reversedOrgs, setReversedOrgs] = useState<TOrg[]>([]);

  // Effect to reverse the organization list whenever it changes
  useEffect(() => {
    if (appState.allOrgs) {
      setReversedOrgs([...appState.allOrgs].reverse());
    }
  }, [appState.allOrgs]);

  return (
    <div>
      {reversedOrgs.map((org: TOrg, index: number) => (
        <div key={index}>
          <div className="w-1/2 bg-[#24303F] my-2 py-3 rounded-lg px-5 justify-between">
            <div className="text-lg mb-2 font-semibold">
              {" "}
              Organization Name: {org.orgName}
            </div>
            <div className="text-base text-gray-300 mb-1">
              {" "}
              Deployer: {org.orgDeployer}
            </div>
            <div className="text-base text-gray-300 mb-4">
              {" "}
              Address:{" "}
              <span className="font-mono text-primary-500">
                {org.orgAddress}
              </span>{" "}
            </div>

            <div className="w-full flex justify-center">
              <button
                className="bg-[#3d51e0] py-2 px-10 rounded mt-4"
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
