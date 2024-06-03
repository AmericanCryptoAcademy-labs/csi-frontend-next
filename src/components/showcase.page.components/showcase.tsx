"use client";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ipfsMetadata } from "@/types/commonTypes";
import { supabase } from "@/config/supabase.config";
import { fetchIPFSDataWithAxios } from "@/helpers/fetchIpfsMetadata";

interface Props{
  fetchCertificatesFromSupabase: () => void;
  certificates: string[];
  setShowSpecificCertificate: (value: ipfsMetadata) => void;
}

const Showcase = ( {fetchCertificatesFromSupabase,certificates,setShowSpecificCertificate}:Props) => {
  const { address } = useAccount();
  const [ipnftTokens, setIpnftTokens] = useState<ipfsMetadata[]>([]);


  useEffect(() => {
    fetchCertificatesFromSupabase();
  }, [address]);

  useEffect(() => {
    if (certificates.length > 0) {
      fetchIPFSDataWithAxios(certificates).then(setIpnftTokens);
      console.log(ipnftTokens,"ipnftTokens");
    }
  }, [certificates]);
  


  // todos
  // fix the sequence of certificate to for onclick event

  return (
    <div className="bg-[#1b222d] h-full p-10 pt-5">
      <p className="font-semibold text-2xl mb-5 text-white">My Certificates</p>
      <div className="grid grid-cols-3 gap-4">
        {ipnftTokens.map((cert, index) => (
          <div key={index} className="">
            <img
              key={index} 
              src={cert.image}
              alt={`Certificate ${index}`}
              onClick={() => setShowSpecificCertificate(cert)}
              className="w-full h-auto rounded-2xl" // This ensures the image takes the full width of the column and height adjusts automatically
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Showcase;
