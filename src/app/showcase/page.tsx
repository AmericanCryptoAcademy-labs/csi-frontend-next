"use client";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ipfsMetadata } from "@/types/commonTypes";
import { supabase } from "@/config/supabase.config";
import { fetchIPFSDataWithAxios } from "@/helpers/fetchIpfsMetadata";
import Showcase from "@/components/showcase.page.components/showcase";
import SpecificCertificate from "@/components/showcase.page.components/SpecificCertificate";

const Page: React.FC = () => {
  const { address } = useAccount();
  const [certificates, setCertificates] = useState<string[]>([]);
  const [showSpecificCertificate, setShowSpecificCertificate] = useState<ipfsMetadata|undefined>();

  const fetchCertificatesFromSupabase = async () => {
    if (!address) return;
    const { data, error } = await supabase
      .from("Lcerts")
      .select()
      .eq("wallet_address", address);

    if (error) {
      console.error("Error fetching certificates:", error);
      return;
    }
    // console.log(data);

    setCertificates(data[0]?.ipfs_token || []);
  };

  return (
    showSpecificCertificate === undefined ? 
    <Showcase fetchCertificatesFromSupabase={fetchCertificatesFromSupabase} certificates={certificates} setShowSpecificCertificate={setShowSpecificCertificate} /> :
    <SpecificCertificate certificateToken={showSpecificCertificate}/>
    
  );
};

export default Page;
