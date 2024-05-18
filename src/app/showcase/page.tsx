"use client";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ipfsMetadata } from "@/types/commonTypes";
import { supabase } from "@/config/supabase.config";
import { fetchIPFSDataWithAxios } from "@/helpers/fetchIpfsMetadata";

const Page: React.FC = () => {
  const { address } = useAccount();
  const [certificates, setCertificates] = useState<string[]>([]);
  const [ipnftTokens, setIpnftTokens] = useState<ipfsMetadata[]>([]);

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

    setCertificates(data[0]?.ipfs_token || []);
  };

  useEffect(() => {
    fetchCertificatesFromSupabase();
  }, [address]);

  useEffect(() => {
    if (certificates.length > 0) {
      fetchIPFSDataWithAxios(certificates).then(setIpnftTokens);
    }
  }, [certificates]);

  return (
    <div className="bg-[#1b222d] h-full p-10 pt-5">
      <p className="font-semibold text-2xl mb-5 text-white">My Certificates</p>
      <div className="grid grid-cols-3 gap-4">
        {ipnftTokens.map((cert, index) => (
          <div className="">
            <img
              key={index} 
              src={`https://nftstorage.link/ipfs/${cert.image}/image.jpeg`}
              alt={`Certificate ${index}`}
              className="w-full h-auto rounded-2xl" // This ensures the image takes the full width of the column and height adjusts automatically
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
