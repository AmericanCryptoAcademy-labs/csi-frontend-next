'use client';
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Box, Button, Typography, Collapse, Input, Select } from "@mui/material";
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
import createCertificate, { certData, dataURLtoBlob } from "./createCertificate";
import { NFTStorage, File } from "nft.storage"

import certbg1 from '../../../../public/images/certBackrounds/1.png'
import certbg2 from '../../../../public/images/certBackrounds/2.png'
import certbg3 from '../../../../public/images/certBackrounds/3.png'
import certbg4 from '../../../../public/images/certBackrounds/4.png'
import certbg5 from '../../../../public/images/certBackrounds/5.png'
import certbg6 from '../../../../public/images/certBackrounds/6.png'
import certbg7 from '../../../../public/images/certBackrounds/7.png'
import certbg8 from '../../../../public/images/certBackrounds/8.png'
import certbg9 from '../../../../public/images/certBackrounds/9.png'
import certbg10 from '../../../../public/images/certBackrounds/10.png'

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
  certbg10
]

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
  const [open, setOpen] = useState(false);
  const [appState, setAppState] = useAtom(appAtom);
  const [lCerts, setLCerts] = useState<TLCert[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [chosenCertBackground, setChosenCertBackground] = useState<string>("");
  const [certificateSrc, setCertificateSrc] = useState<string | null>("")
  const config = useConfig();
  const instituteRef = useRef(null);
  const [url, seturl] = useState<string>('')
  const { writeContract: mintCertificate, error: mintCertificateError, isSuccess: mintCertificateSuccess } = useWriteContract()

  console.log("Chosen Cert Background", chosenCertBackground)
  const issueLCertForm = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      certName: lCerts[expandedIndex as number]?.certName,
      remarks: "",
      issuedTo: "",
      orgName: props.org?.orgName || "",
      description: "",
      dateIssued: new Date().toISOString(),
      expInDays: "",
      selectedBackground: "",
    },
    validationSchema: yup.object({
      firstName: yup.string().required("Required"),
      lastName: yup.string().required("Required"),
      certName: yup.string().required("Required"),
      remarks: yup.string().required("Required"),
      issuedTo: yup.string().required("Required"),
      orgName: yup.string().required("Required"),
      description: yup.string().required("Required"),
      // dateIssued: yup.string().required("Required"),
      expInDays: yup.string().required("Required"),
      // selectedBackground: yup.string().required("Required"),
    }),
    onSubmit: async (values: any) => {
      console.log(values);
      MintCertificate(values);
    }
  });

  const MintCertificate = async (values: any) => {
    values.certName = lCerts[expandedIndex as number].certName;
    console.log(values);

    const tokenURI = `ipfs://${url}`;
    console.log(tokenURI, "tokenURI max");

    mintCertificate({
      abi: Contracts.Cert.abi,
      address: lCerts[expandedIndex as number].certAddress,
      functionName: "mint",
      args: [
        values.issuedTo,
        tokenURI,
        values.expInDays,
      ],
    });
    console.log(mintCertificateError, "mintCertificateError");
    console.log(mintCertificateSuccess, "mintCertificateSuccess");
  }


  const handleCreateCanvas = async (event: React.FormEvent) => {
    event.preventDefault();
    await createCanvas(event);
    setOpen(true);
  }

  const generateCertificate = async (): Promise<string | null> => {
    const instituteValue: string = issueLCertForm.getFieldProps("orgName").value;
    try {
      const certData: certData = {
        Organization: issueLCertForm.getFieldProps("orgName").value,
        StudentName: issueLCertForm.getFieldProps("firstName").value + " " + issueLCertForm.getFieldProps("lastName").value,
        CertificateName: lCerts[expandedIndex as number].certName,
        Duration: issueLCertForm.getFieldProps("expInDays").value, // Assuming validity is a string that needs to be parsed as an integer
        certBg: chosenCertBackground
      };

      const imageSrc = await createCertificate(certData);
      // console.log("settled the cert src", imageSrc);
      return imageSrc; // Directly return the generated src
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const createCanvas = async (event: React.FormEvent) => {
    event.preventDefault();
    const files = await generateCertificate(); // This will return the image src
    setCertificateSrc(files)

    try {
      const blobfile = files && dataURLtoBlob(files); // This will convert the image src to a blob file
      if (blobfile) {
        const ipnft = await uploadImage(blobfile); // This will upload the image to IPFS and return the IPFS link
        console.log(ipnft, "this is Ipnt");
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  const uploadImage = async (imageData: Blob): Promise<string> => {
    // setloading(true)
    const nftstorage = new NFTStorage({ token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDAzM2Y5Mzc1ZEQ5ODY1YzhmN2FiODVENGRiRTM3NDhERWI4NTljRkYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4NTc3MTE1MDk5NiwibmFtZSI6IlBBUkszIn0.eHLoAl-RBIxAqXmHm_KTQ553Ha-_18sZrnoxuXpGxMI` })

    // Check if instituteRef.current is not null
    const instituteValue: string = issueLCertForm.getFieldProps("orgName").value

    // Send request to store image
    const { ipnft } = await nftstorage.store({
      image: new File([imageData], "image.jpeg", { type: "image/jpeg" }),
      name: issueLCertForm.getFieldProps("firstName").value,
      lastname: issueLCertForm.getFieldProps("lastName").value,
      certName: issueLCertForm.getFieldProps("certName").value,
      remarks: issueLCertForm.getFieldProps("remarks").value,
      validity: issueLCertForm.getFieldProps("expInDays").value,
      issuedTo: issueLCertForm.getFieldProps("issuedTo").value,
      issuerName: instituteValue,
      description: `
              ${issueLCertForm.getFieldProps("firstName").value} +' ' +
              ${issueLCertForm.getFieldProps("lastName").value} +' ' + 
              ${issueLCertForm.getFieldProps("certName").value} +' ' + 
              ${issueLCertForm.getFieldProps("remarks").value} +' ' + 
              ${issueLCertForm.getFieldProps("expInDays").value} +' ' + 
              ${issueLCertForm.getFieldProps("issuedTo").value} +' ' + 
              ${instituteValue} +' ' + 
              ${issueLCertForm.getFieldProps("description").value} +' ' + 
              ${issueLCertForm.getFieldProps("selectedBackground").value}`
    }) // This will store the image and return the IPFS link

    // Save the URL
    // const NFturl = `https://ipfs.io/ipfs/${ipnft}/metadata.json`
    seturl(ipnft)
    // Set showUploadAlert to true after uploadImage function is completed
    return ipnft
  }

  // IF YOU NEED TO FETCH THE NEXT TOKEN ID USE THIS DONT HARD CODE IT
  const fetchNextTokenId = async (address: Address) => {
    const nextTokenId = await readContract(config, {
      abi: Contracts.Cert.abi,
      address: address,
      functionName: "totalSupply",
      args: []
    });
    
    if (nextTokenId) {
      return Number(nextTokenId) + 1;
    } else {
      return 1;
    }
  }

  const fetchLCertsForOrg = async (org: TOrg) => {
    const lcertAddresses: any = await readContract(config, {
      abi: Contracts.CSIOrg.abi,
      address: org.orgAddress,
      functionName: "getCertificates",
      args: []
    });

    const promises = lcertAddresses?.map((certAddress: Address) => fetchLCertData(certAddress));
    const lcertData = await Promise.all(promises);
    setLCerts(lcertData);
  }

  const fetchLCertData = async (certAddress: Address): Promise<TLCert> => {
    const lCertNamePromise = readContract(config, {
      abi: Contracts.Cert.abi,
      address: certAddress,
      functionName: "name",
      args: []
    });

    const lCertSymbolPromise = readContract(config, {
      abi: Contracts.Cert.abi,
      address: certAddress,
      functionName: "symbol",
      args: []
    });

    const [lCertName, lCertSymbol] = await Promise.all([lCertNamePromise, lCertSymbolPromise]);

    return {
      certName: lCertName as string,
      certSymbol: lCertSymbol as string,
      certAddress: certAddress
    };
  }

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  useEffect(() => {
    if (props.org) {
      fetchLCertsForOrg(props.org);
    }
  }, [props.org]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      {
        open && <PreviewAndIssueModal 
          open={open} 
          onClose={() => setOpen(false)} 
          certData={issueLCertForm.values} 
          imgSrc={certificateSrc || ""} 
          mintCertificate={() => MintCertificate(issueLCertForm.values)}
        />
      }
      {lCerts.map((lCert, index) => (
        <StyledCard key={index}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Typography variant="h6">Certificate Name: {lCert.certName}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleToggle(index)}
            >
              {expandedIndex === index ? 'Close Form' : 'Issue a LCert'}
            </Button>
            <Collapse in={expandedIndex === index}>
              <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: 2
              }}>

                {/* First Name */}
                <Box>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    security="true"
                    sx={{
                      margin: 1,
                      borderRadius: "6px",
                      backgroundColor: "white",
                      color: "black",
                      width: "100%",
                      height: "40px",
                      padding: "10px",
                    }}
                    {...issueLCertForm.getFieldProps("firstName")}
                  />
                  {issueLCertForm.touched.firstName && issueLCertForm.errors.firstName ? (
                    <div>{issueLCertForm.errors.firstName}</div>
                  ) : null}
                </Box>

                {/* Last Name */}
                <Box>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    security="true"
                    sx={{
                      margin: 1,
                      borderRadius: "6px",
                      backgroundColor: "white",
                      color: "black",
                      width: "100%",
                      height: "40px",
                      padding: "10px",
                    }}
                    {...issueLCertForm.getFieldProps("lastName")}
                  />
                  {issueLCertForm.touched.lastName && issueLCertForm.errors.lastName ? (
                    <div>{issueLCertForm.errors.lastName}</div>
                  ) : null}
                </Box>

                {/* Certificate Name */}
                <Box>
                  <Input
                    id="certName"
                    type="text"
                    security="true"
                    disabled
                    sx={{
                      margin: 1,
                      borderRadius: "6px",
                      backgroundColor: "white",
                      color: "black",
                      width: "100%",
                      height: "40px",
                      padding: "10px",
                    }}
                    value={lCert.certName}
                  />

                </Box>

                {/* Remarks */}
                <Box>
                  <Input
                    id="remarks"
                    type="text"
                    placeholder="Remarks"
                    security="true"
                    sx={{
                      margin: 1,
                      borderRadius: "6px",
                      backgroundColor: "white",
                      color: "black",
                      width: "100%",
                      height: "40px",
                      padding: "10px",
                    }}
                    {...issueLCertForm.getFieldProps("remarks")}
                  />
                  {issueLCertForm.touched.remarks && issueLCertForm.errors.remarks ? (
                    <div>{issueLCertForm.errors.remarks}</div>
                  ) : null}
                </Box>

                {/* Issued To */}
                <Box>
                  <Input
                    id="issuedTo"
                    type="text"
                    placeholder="Issued To"
                    security="true"
                    sx={{
                      margin: 1,
                      borderRadius: "6px",
                      backgroundColor: "white",
                      color: "black",
                      width: "100%",
                      height: "40px",
                      padding: "10px",
                    }}
                    {...issueLCertForm.getFieldProps("issuedTo")}
                  />
                  {issueLCertForm.touched.issuedTo && issueLCertForm.errors.issuedTo ? (
                    <div>{issueLCertForm.errors.issuedTo}</div>
                  ) : null}

                </Box>

                {/* Organization Name */}
                <Box>
                  <Input
                    id="orgName"
                    type="text"
                    value={props.org?.orgName}
                    disabled
                    security="true"
                    sx={{
                      margin: 1,
                      borderRadius: "6px",
                      backgroundColor: "white",
                      color: "black",
                      width: "100%",
                      height: "40px",
                      padding: "10px",
                    }}
                  />
                  {issueLCertForm.touched.orgName && issueLCertForm.errors.orgName ? (
                    <div>{issueLCertForm.errors.orgName}</div>
                  ) : null}
                </Box>

                {/* Description */}
                <Box>
                  <Input
                    id="description"
                    type="text"
                    placeholder="Description"
                    security="true"
                    sx={{
                      margin: 1,
                      borderRadius: "6px",
                      backgroundColor: "white",
                      color: "black",
                      width: "100%",
                      height: "40px",
                      padding: "10px",
                    }}
                    {...issueLCertForm.getFieldProps("description")}
                  />
                  {issueLCertForm.touched.description && issueLCertForm.errors.description ? (
                    <div>{issueLCertForm.errors.description}</div>
                  ) : null}
                </Box>

                {/* Exp in Days */}
                <Box>
                  <Input
                    id="expInDays"
                    type="text"
                    placeholder="Exp in Days"
                    security="true"
                    sx={{
                      margin: 1,
                      borderRadius: "6px",
                      backgroundColor: "white",
                      color: "black",
                      width: "100%",
                      height: "40px",
                      padding: "10px",
                    }}
                    {...issueLCertForm.getFieldProps("expInDays")}
                  />
                  {issueLCertForm.touched.expInDays && issueLCertForm.errors.expInDays ? (
                    <div>{issueLCertForm.errors.expInDays}</div>
                  ) : null}

                </Box>

                {/* Background */}
                {/* let user choose backrounds from pulic/image/certBackgrounds */}
                <Collapse in={expandedIndex === index}>
                  <Select
                    id="selectedBackground"
                    sx={{
                      margin: 1,
                      borderRadius: "6px",
                      backgroundColor: "white",
                      color: "black",
                      width: "100%",
                      height: "40px",
                      padding: "10px",
                    }}
                    {...issueLCertForm.getFieldProps("selectedBackground")}
                  >
                    {
                      Backgrounds.map((background, index) => (
                        <Box key={index} onClick={() => setChosenCertBackground(background.src)}>
                          <Image src={background.src} alt="Certificate" width={100} height={100} />
                        </Box>
                      ))
                    }
                  </Select>
                </Collapse>
             
                <Button 
                  onClick={(e) => handleCreateCanvas(e)}
                >
                  Create Certificate
                </Button>
              </Box>
            </Collapse>
          </Box>
        </StyledCard>
      ))}
    </Box>
  );
}
