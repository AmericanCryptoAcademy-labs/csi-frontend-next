"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Box, Typography, Button } from "@mui/material";
import { useAccount, useReadContract, useReadContracts, useConfig } from "wagmi";
import { readContracts } from "wagmi/actions";
import { Address } from "viem";
import { appAtom } from "@/store/AppStore";
import { useAtom } from "jotai";
import { PrimaryButton, AccountButton } from "@/components";
import { shortenAddress } from "@/helpers";
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { Contracts, CSI_DELEGATE_ROLE, ORG_ADMIN_ROLE } from '@/contracts';
import allowedAddresses from "../../../helpers/allowedAddresses.json";
import { TOrg } from "@/types";


export default function Header() {
  const [appState, setAppState] = useAtom(appAtom);
  const { address, isConnected } = useAccount();
  const { open, close } = useWeb3Modal()
  const [orgsInfo, setOrgsInfo] = useState([]);
  const config = useConfig();


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    isConnected ? open({ view: 'Account' }) : open();
  };

  const _isCsiAdmin = useReadContract({
    abi: Contracts.CSI.abi,
    address: Contracts.CSI.address,
    functionName: 'hasRole',
    args: [CSI_DELEGATE_ROLE, address ?? "" as Address],
  })

  const { data: _allOrgs }: any = useReadContract({
    abi: Contracts.CSI.abi,
    address: Contracts.CSI.address,
    functionName: 'getAllOrgs',    
  })
  

  const canCreateOrg = allowedAddresses.includes(address as Address)

  const fetchData = async () => {
    let userOrgs: any[] = [];
    const contractCalls = await _allOrgs?.map((org: TOrg) => ({
      abi: Contracts.CSIOrg.abi,
      address: org.orgAddress,
      functionName: 'hasRole',
      args: [ORG_ADMIN_ROLE, address],
    }));
    
    if (contractCalls) {
      const res = await  readContracts(config, {
        contracts: [
          ...contractCalls
        ]
      });

      userOrgs = res.map((result: any, index: number) => {
        if (result) {
          return {
            orgName: _allOrgs[index].name,
            orgDeployer: _allOrgs[index].deployer,
            orgAddress: _allOrgs[index].orgAddress,
          }
        }
      })
    }

    const isAdmin: boolean = await _isCsiAdmin.data as boolean;
    const allOrgs: TOrg[] = await _allOrgs.map((org: any) => ({
      orgName: org.name,
      orgDeployer: org.deployer,
      orgAddress: org.orgAddress,
    }));

    setAppState(
      (prev) => ({
        ...prev,
        address: address as Address,
        canCreateOrg: canCreateOrg,
        isCsiDelegate: isAdmin,
        allOrgs: allOrgs,
        userOrgs: userOrgs as TOrg[],
      })
    )
  }

  useEffect(() => {
    if (!isConnected) return;
    fetchData();
  }, [_allOrgs])

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        minHeight: "72px",
        alignItems: "center",
        padding: "16px",
        zIndex: 1,
      }}
    >
      <Image src="/images/logos/whiteLcertsLogo.png" alt="Lcerts Logo" width={250} height={72} />
      <Box>
        {isConnected ? (
          <AccountButton onClick={handleClick}>{shortenAddress(address ?? "" as Address)}</AccountButton>
        ) : (
          <PrimaryButton onClick={handleClick}>Connect Wallet</PrimaryButton>
        )}
      </Box>

    </Box>
  );
}