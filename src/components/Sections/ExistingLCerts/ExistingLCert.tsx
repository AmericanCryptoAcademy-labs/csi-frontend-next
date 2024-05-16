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
import { StyledCard } from "@/components/Cards/Cards";
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

/*
TODO: 
  1. Fix The ui make it nice Obvs i rushed it
  2. Add the ability to choose background images for the certificate
  3. Add Loading states to buttons so user cant multi click
  4. YOU ABOSLUTELY NEED TO ADD THE IPFS LINK TO THE CERTIFICATE METADATA and then the TOKENURI is the META DATA LINK that is uploaded to IPFS
  YOU CAN NOT HAVE THE IMAGE DIRECTLY AS THE TOKENURI IF YOU WANT THE CERT TO BE VIEWABLE ON OPENSEA OR ANY OTHER NFT MARKETPLACE
  PLEASE REFER TO METADATA STANDARDS FOR NFTS = https://docs.opensea.io/docs/metadata-standards
  TOKEN URI SHOULD BE SOMETHING LIKE
  {
    "name": "Certificate",
    "description": "This is a certificate",
    "image": "ipfs://ipfs.io/ipfs/QmZK2Xc1b7vXjZv5R6q4T5t6X.../image.jpeg",
    attributes: [
      {
        "trait_type": "Student Name",
        "value": "John Doe"
      },
      {
        "trait_type": "Certificate Name",
        "value": "Certificate of Completion"
      },
      {
        "trait_type": "Duration",
        "value": "30"
      },
      {
        "trait_type": "Organization",
        "value": "XYZ Institute"
      }
    ]
  }

PLEASE NOTE: YOU MUST ACTUALLY ADD THE IMAGE PATH TO THE METADATA BEFORE UPLOADING TO IPFS AND IT SHOULD HAVE THE IPFS PREFIX and FILE EXTENSION

WRONG:
  "image": "QmZK2Xc1b7vXjZv5R6q4T5t6X.../image.jpeg",
  OR
  "image": "ipfs://QmZK2Xc1b7vXjZv5R6q4T5t6X...",
RIGHT:
  image: "ipfs://ipfs.io/ipfs/QmZK2Xc1b7vXjZv5R6q4T5t6X.../image.jpeg",
  OR
  image: "ipfs://QmZK2Xc1b7vXjZv5R6q4T5t6X.../image.jpeg",


  STEPS TO ACCOMPLISH THIS:
  1. Create and upload the image function 
  2. once image create metadata and use metadata ipfs link as tokenuri
  3. mint the certificate with the tokenuri as the metadata link

*/

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
  const [url, seturl] = useState<string>("");
  const [tokenURI, setTokenURI] = useState<string>("");
  const [issuedTo, setIssuedTo] = useState<Address>('0x');
  const {
    writeContract: mintCertificate,
    error: mintCertificateError,
    isSuccess: mintCertificateSuccess,
    status:mintstatus
  } = useWriteContract();

  useEffect(()=>{
    if(mintstatus==="success"){
      saveIpfsTokenAtSupabase(tokenURI, issuedTo);
    }
  },[mintstatus])

  const MintCertificate = async (values: any) => {
    values.certName = lCerts[expandedIndex as number].certName;
    const tokenURI = `${url}`;

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
      // let existingTokens= data[0]?.ipfs_token;
    if (data?.length === 0) {
      //need to insert some data along with address which will newly add

      const { error } = await supabase
        .from("Lcerts")
        .insert({ wallet_address: issueuser, ipfs_token: [ipfsToken] });
      console.log(data, error, "data and error2");
    } else {
      // need to update the data
      let existingCerts = data?.[0]?.ipfs_token
      existingCerts.push(ipfsToken)
      console.log(existingCerts, "existingCerts");
      
      const { error } = await supabase
        .from("Lcerts")
        .update({ ipfs_token: existingCerts})
        .eq("wallet_address", issueuser);
        console.log(error, "error");
    }
    console.log(data, error, "data and error");
  };

  const handleCreateCanvas = async (event: React.FormEvent) => {
    // event.preventDefault();
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
        Duration: values.expInDays, // Assuming validity is a string that needs to be parsed as an integer
        certBg: values.certBg,
      };
      const imageSrc = await createCertificate(certData);
      return imageSrc; // Directly return the generated src
    } catch (error) {
      console.log("Error generating certificate", error);
      console.error(error);
      return null;
    }
  };

  const createCanvas = async (values: any) => {
    // event.preventDefault();
    const files = await generateCertificate(values); // This will return the image src
    console.log("Files", files);
    setCertificateSrc(files);

    try {
      const blobfile = files && dataURLtoBlob(files); // This will convert the image src to a blob file
      if (blobfile) {
        const ipnft = await uploadImage(blobfile, values); // This will upload the image to IPFS and return the IPFS link
      }
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImage = async (imageData: Blob, values: any): Promise<string> => {
    // setloading(true)
    const nftstorage = new NFTStorage({
      token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDAzM2Y5Mzc1ZEQ5ODY1YzhmN2FiODVENGRiRTM3NDhERWI4NTljRkYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4NTc3MTE1MDk5NiwibmFtZSI6IlBBUkszIn0.eHLoAl-RBIxAqXmHm_KTQ553Ha-_18sZrnoxuXpGxMI`,
    });

    // Check if instituteRef.current is not null
    const instituteValue: string = values.orgName;

    // Send request to store image
    const { ipnft } = await nftstorage.store({
      image: new File([imageData], "image.jpeg", { type: "image/jpeg" }),
      name: values.firstName,
      lastname: values.lastName,
      certName: values.certName,
      remarks: values.remarks,
      validity: values.expInDays,
      issuedTo: values.issuedTo,
      issuerName: instituteValue,
      description: `
              ${values.firstName} +' ' +
              ${values.lastName} +' ' + 
              ${values.certName} +' ' + 
              ${values.remarks} +' ' + 
              ${values.expInDays} +' ' + 
              ${values.issuedTo} +' ' + 
              ${instituteValue} +' ' + 
              ${values.description} +' ' + 
              ${values.selectedBackground}`,
    }); // This will store the image and return the IPFS link

    // Save the URL
    // const NFturl = `https://ipfs.io/ipfs/${ipnft}/metadata.json`
    seturl(ipnft);
    // Set showUploadAlert to true after uploadImage function is completed
    return ipnft;
  };

  // IF YOU NEED TO FETCH THE NEXT TOKEN ID USE THIS DONT HARD CODE IT
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

  return (
    <div>
      {lCerts.map((lCert, index) => (
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

        // <StyledCard key={index}>
        //   <Box
        //     sx={{
        //       display: "flex",
        //       flexDirection: "column",
        //       alignItems: "center",
        //       justifyContent: "center",
        //       minWidth: "100%",
        //     }}
        //   >
        //     <Typography variant="h6">Certificate Name: {lCert.certName}</Typography>
        //     <Button
        //       variant="contained"
        //       color="primary"
        //       onClick={() => handleToggle(index)}
        //     >
        //       {expandedIndex === index ? 'Close Form' : 'Issue a LCert'}
        //     </Button>
        //     <Collapse in={expandedIndex === index} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
        //       <CertificateForm
        //         index={index}
        //         certData={lCert}
        //         certName={lCert.certName}
        //         certificateSrc={certificateSrc}
        //         orgName={props.org?.orgName}
        //         orgData={props.org}
        //         mintCert={MintCertificate}
        //         createCanvas={handleCreateCanvas}
        //         open={open}
        //         onClose={() => setOpen(false)}
        //       />
        //     </Collapse>
        //   </Box>
        // </StyledCard>
      ))}
    </div>
  );
}
