"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Box,
  Button,
  Typography,
  Collapse,
  Input,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import { useAtom } from "jotai";
import { appAtom } from "@/store/AppStore";
import { readContract } from "wagmi/actions";
import { useConfig, useWriteContract } from "wagmi";
import { TExistingLCertProps, TOrg, TLCert, TIssueLCertParams } from "@/types";
import { Contracts } from "@/contracts";
import { Address } from "viem";
import { useFormik } from "formik";
import * as yup from "yup";
import PreviewAndIssueModal from "./modal/PreviewAndIssue";
import createCertificate, {
  certData,
  dataURLtoBlob,
} from "./createCertificate";
import { NFTStorage, File } from "nft.storage";
import CertificateForm from "./common/CertificateForm";

import certbg1 from "../../../../public/images/certBackrounds/1.png";
import certbg2 from "../../../../public/images/certBackrounds/2.png";
import certbg3 from "../../../../public/images/certBackrounds/3.png";
import certbg4 from "../../../../public/images/certBackrounds/4.png";
import certbg5 from "../../../../public/images/certBackrounds/5.png";
import certbg6 from "../../../../public/images/certBackrounds/6.png";
import certbg7 from "../../../../public/images/certBackrounds/7.png";
import certbg8 from "../../../../public/images/certBackrounds/8.png";
import certbg9 from "../../../../public/images/certBackrounds/9.png";
import certbg10 from "../../../../public/images/certBackrounds/10.png";
import { supabase } from "@/config/supabase.config";

const Backgrounds = [
  certbg1,
  certbg2,
  certbg3,
  certbg4,
  certbg5,
  certbg6,
  certbg7,
  certbg8,
  certbg9,
  certbg10,
];

export default function ExistingOrgsSection(props: TExistingLCertProps) {
  const [appState, setAppState] = useAtom(appAtom);
  const [open, setOpen] = useState(false);
  const [lCerts, setLCerts] = useState<TLCert[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>();
  const [chosenCertBackground, setChosenCertBackground] = useState(
    Backgrounds[0].src
  );
  const [certificateSrc, setCertificateSrc] = useState<string | null>("");
  const config = useConfig();
  const instituteRef = useRef(null);
  const [url, setUrl] = useState<string>("");
  const [tokenURI, setTokenURI] = useState<string>("");
  const [issuedTo, setIssuedTo] = useState<Address>('0x');
  const {
    writeContract: mintCertificate,
    error: mintCertificateError,
    isSuccess: mintCertificateSuccess,
    status: mintstatus
  } = useWriteContract();

  useEffect(() => {
    if (mintstatus === "success") {
      saveIpfsTokenAtSupabase(tokenURI, issuedTo);
    }
  }, [mintstatus]);

  const MintCertificate = async (values: any) => {
    values.certName = lCerts[expandedIndex as number].certName;
    const tokenURI = `${url}`;
    console.log("Token URI", tokenURI);
    console.log("Values", values);

    mintCertificate({
      abi: Contracts.Cert.abi,
      address: lCerts[expandedIndex as number].certAddress,
      functionName: "mint",
      args: [values.issuedTo, tokenURI, values.expInDays],
    });

    setTokenURI(tokenURI);
    setIssuedTo(values.issuedTo);

    console.log(mintCertificateError, "mintCertificateError");
    console.log(mintCertificateSuccess, "mintCertificateSuccess");
  };

  const saveIpfsTokenAtSupabase = async (
    ipfsToken: string,
    issueuser: string
  ) => {
    const { data, error } = await supabase
      .from("Lcerts")
      .select()
      .eq("wallet_address", issueuser);

    if (data?.length === 0) {
      const { error } = await supabase
        .from("Lcerts")
        .insert({ wallet_address: issueuser, ipfs_token: [ipfsToken] });
      console.log(data, error, "data and error2");
    } else {
      let existingCerts = data?.[0]?.ipfs_token;
      existingCerts.push(ipfsToken);
      console.log(existingCerts, "existingCerts");

      const { error } = await supabase
        .from("Lcerts")
        .update({ ipfs_token: existingCerts })
        .eq("wallet_address", issueuser);
      console.log(error, "error");
    }
    console.log(data, error, "data and error");
  };

  const handleCreateCanvas = async (event: React.FormEvent) => {
    await createCanvas(event).then(() => {
      setOpen(true);
    });
  };

  const generateCertificate = async (values: any): Promise<string | null> => {
    console.log("Values", values);
    console.log("Trying to generate certificate");
    const instituteValue: string = values.orgName;
    try {
      const certData: certData = {
        Organization: values.orgName,
        StudentName: values.firstName + " " + values.lastName,
        CertificateName: lCerts[expandedIndex as number].certName,
        Duration: values.expInDays,
        certBg: values.certBg,
      };
      const imageSrc = await createCertificate(certData);
      return imageSrc;
    } catch (error) {
      console.log("Error generating certificate", error);
      console.error(error);
      return null;
    }
  };

  const createCanvas = async (values: any) => {
    const files = await generateCertificate(values);
    console.log("Files", files);
    setCertificateSrc(files);

    try {
      const blobfile = files && dataURLtoBlob(files);
      if (blobfile) {
        const ipnft = await uploadImage(blobfile, values);
        return ipnft;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const uploadImage = async (imageData: Blob, values: any): Promise<string> => {
    const nftstorage = new NFTStorage({
      token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDAzM2Y5Mzc1ZEQ5ODY1YzhmN2FiODVENGRiRTM3NDhERWI4NTljRkYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4NTc3MTE1MDk5NiwibmFtZSI6IlBBUkszIn0.eHLoAl-RBIxAqXmHm_KTQ553Ha-_18sZrnoxuXpGxMI`,
    });

    const instituteValue: string = values.orgName;

    // Upload the image to IPFS and get the image URL
    const imageFile = new File([imageData], "image.jpeg", { type: "image/jpeg" });
    const imageCID = await nftstorage.storeBlob(imageFile);
    const imageUrl = `https://nftstorage.link/ipfs/${imageCID}`;
    const nextTokenId = await fetchNextTokenId(lCerts[expandedIndex as number].certAddress);
    console.log(imageCID, " ", imageUrl, " ", nextTokenId," ",  "Image CID and URL");
    

    const metadata = {
      name: `${values.certName} #${nextTokenId}`, 
      description: `Certificate issued to ${values.firstName} ${values.lastName} by ${instituteValue}, for achieving ${values.certName}.`,
      image: imageUrl,
      attributes: [
        {
          trait_type: "Student Name",
          value: `${values.firstName} ${values.lastName}`
        },
        {
          trait_type: "Certificate Name",
          value: `${values.certName}`
        },
        {
          trait_type: "Remarks",
          value: `${values.remarks}`
        },
        {
          trait_type: "Issued By",
          value: `${instituteValue}`
        },
        {
          trait_type: "Issued To",
          value: `${values.issuedTo}`
        },
        {
          display_type: "date",
          trait_type: "Valid for",
          value: new Date(Date.now() + values.expInDays * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          display_type: "date",
          trait_type: "Issue Date",
          value: new Date().toISOString()
        },
        {
          trait_type: "Description",
          value: `${values.description}`
        },
      ]
    };

    const metadataFile = new File([JSON.stringify(metadata)], "metadata.json", {
      type: "application/json"
    });
    
    
    const metadataCID = await nftstorage.storeBlob(metadataFile);
    const metadataUrl = `https://nftstorage.link/ipfs/${metadataCID}/`
    setUrl(metadataUrl);
    console.log(metadataUrl, "Metadata File");

    return metadataUrl;
  };

  const fetchNextTokenId = async (address: Address) => {
    const nextTokenId = await readContract(config, {
      abi: Contracts.Cert.abi,
      address: address,
      functionName: "totalSupply",
      args: [],
    });

    if (nextTokenId) {
      return Number(nextTokenId) + 1;
    } else {
      return 1;
    }
  };

  const fetchLCertsForOrg = async (org: TOrg) => {
    const lcertAddresses: any = await readContract(config, {
      abi: Contracts.CSIOrg.abi,
      address: org.orgAddress,
      functionName: "getCertificates",
      args: [],
    });

    const promises = lcertAddresses?.map((certAddress: Address) =>
      fetchLCertData(certAddress)
    );
    const lcertData = await Promise.all(promises);
    console.log("LCert Data", lcertData)
    setLCerts(lcertData);
  };

  const fetchLCertData = async (certAddress: Address): Promise<TLCert> => {
    const lCertNamePromise = readContract(config, {
      abi: Contracts.Cert.abi,
      address: certAddress,
      functionName: "name",
      args: [],
    });

    const lCertSymbolPromise = readContract(config, {
      abi: Contracts.Cert.abi,
      address: certAddress,
      functionName: "symbol",
      args: [],
    });

    const [lCertName, lCertSymbol] = await Promise.all([
      lCertNamePromise,
      lCertSymbolPromise,
    ]);

    return {
      certName: lCertName as string,
      certSymbol: lCertSymbol as string,
      certAddress: certAddress,
    };
  };

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  useEffect(() => {
    if (props.org) {
      fetchLCertsForOrg(props.org);
    }
  }, [props.org]);

  console.log("LCerts", lCerts);

  return (
    <div>
      {lCerts.length > 0 ? lCerts.map((lCert, index) => (
        <div key={index} className="w-full">
          <div className="w-1/2 bg-[#24303F] my-2 py-3 rounded-lg px-5 justify-between">
            <div className=" flex my-2 py- rounded-lg px-5 justify-between">
              <p className="my-auto text-2xl font-semibold">
                {" "}
                Certificate Name:{" "}
                <span className="text-[#b2b1b1]">{lCert.certName}</span>
              </p>
              <button
                className="bg-[#3d51e0] py-2 px-4 rounded text-lg"
                color="primary"
                onClick={() => handleToggle(index)}
              >
                Issue a LCert
              </button>
            </div>
            <Collapse
              in={expandedIndex === index}
              timeout="auto"
              unmountOnExit
              sx={{ width: "100%" }}
            >
              <CertificateForm
                index={index}
                certData={lCert}
                certName={lCert.certName}
                certificateSrc={certificateSrc}
                orgName={props.org?.orgName}
                orgData={props.org}
                mintCert={MintCertificate}
                createCanvas={handleCreateCanvas}
                open={open}
                onClose={() => setOpen(false)}
              />
            </Collapse>
          </div>
        </div>
      )) : (
        <div className="w-full">
          <div className="w-1/2 bg-[#24303F] my-2 py-3 rounded-lg px-5 justify-between">
            <p className="my-auto text-2xl font-semibold">
              No Certificates Found
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
