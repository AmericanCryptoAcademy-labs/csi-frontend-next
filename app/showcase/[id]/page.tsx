"use client";


import React, { useEffect, useState } from 'react';
import { Breadcrumb } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../../../utils/constant';
import { Alert , AlertIcon , Box , Text , Input ,VStack ,  Button } from '@chakra-ui/react';

function page({params}) {

    const [nftdata, setnftdata] = useState<string>('');
    const [tokenuri, settokenuri] = useState<string>('');
    const [owner, setowner] = useState<string>('');
    const [name, setname] = useState<string>('');
    const [description, setdescription] = useState<string>('');
    const [image, setimage] = useState<string>('');
    const [loading, setloading] = useState<boolean>(false);
    const [certType , setcerttype] = useState<string>('')
    const [showMetamaskAlert, setShowMetamaskAlert] = useState<boolean>(false);
    const [status, setStatus] = useState('');
    const [type, setType] = useState('');
    const [issuedTo , setissuedTo] = useState<string>("");
    const [ institute , setinstitute] = useState<string>("");
    const [issuer , setissuer] = useState<string>('');
    const [validdate , setvaliddate] = useState<string>("");
    const [certName , setcertName] = useState<string>("");
    const [remarks , setremarks] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [date , setdate] = useState<number>(0);

    // Function for Getting Data of Cert from Contract
    const getNftInfo  = async() => {

        try{

            setloading(true);
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const aift = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        
            const tx = await aift.getCertificateDetails(params.id);
            setnftdata(tx);
          
            console.log( "nft data" , tx);
            setissuer(tx.issuer);
            setloading(false);
            settokenuri(tx.tokenURI);
            setissuedTo(tx.candidate);
            setvaliddate(tx.validTill.toString());
            setcerttype(tx.status.toString());
            console.log(certType);

        }catch(error){
            console.log('getNftInfo Function Error -> ' , error)
        }

    }


    // getting data from ipfs using tokenURI
    const fetchMetadata = async (tokenURI) => {
        try {
          setloading(true)
          const response = await fetch(`https://ipfs.io/ipfs/${tokenURI}/metadata.json`);
          const metadata = await response.json();
          const metadataName = metadata.name;
          setname(metadataName)
          setdescription(metadata.description)
          setimage(metadata.image);
          setissuedTo(metadata.issuedTo);
          setloading(false)
          let tokenImagex = metadata.image;
          setimage(tokenImagex);
          setinstitute(metadata.issuerName);
          setcertName(metadata.certName);
          setremarks(metadata.remarks);
    
        } catch (error) {
          console.error('Error fetching metadata:', error);
        }
    };

    // Converting Date to Human Readable Form
    function getHumanReadableDateFromContract(timestamp) {
        // 2. Convert the Unix timestamp to a JavaScript Date object
        const dateObject = new Date(Number(timestamp) * 1000);
    
        // 3. Convert the Date object to a human-readable string
        return dateObject.toISOString().slice(0,19).replace("T", " ");
    }

    // getting the Current Status of Cert
    const certTypeReturn = (type : string) => {
    if(type === "0"){
      return "Active"
    }else if (type === "1"){
      return "Expired"
    }else{
      return "Revoked"
    }
    }


    const revokeButton = async() =>{

        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          const signer = provider.getSigner()
          const aift = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
          const tx = await aift.revokeCertificate(params.id)
          console.log(tx)
    
          const txhash = tx.hash 
    
          signer.provider.on(txhash, (receipt) => {
              console.log('Transaction confirmed:', receipt);
              setStatus('             AIFT Unisted Succesfully')
              setType('success')
              setShowMetamaskAlert(true)
            });
        } catch (error) {
          console.log(error)
          setStatus(' Transaction Rejected... Please Try Again')
          setType('error')
          setShowMetamaskAlert(true)
        } 
    
    
    }

    const extendValiditybtn = async() =>{

        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          const signer = provider.getSigner()
          const aift = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
          const tx = await aift.updateCertificateValidity(params.id , Number(date));
          console.log(tx)
    
          const txhash = tx.hash 
    
          signer.provider.on(txhash, (receipt) => {
              console.log('Transaction confirmed:', receipt);
              setStatus('             AIFT Unisted Succesfully')
              setType('success')
              setShowMetamaskAlert(true)
            });
        } catch (error) {
          console.log(error)
          setStatus(' Transaction Rejected... Please Try Again')
          setType('error')
          setShowMetamaskAlert(true)
        } 
    
    
    }
    


    
    useEffect(() => {
        getNftInfo();
    }, [params.id]);

    
    useEffect(() => {   
        if (tokenuri) {
          fetchMetadata(tokenuri);
        }
    }, [tokenuri]);

  return (
    <>

      <div className='flex w-full'>
        <div className='w-1/2 pr-5'>
          <Image
            src="/images/sample/sample.jpg"
            alt="Description of image"
            width={50}
            height={50}
            layout="responsive"
          />
        </div>
        <div className='w-1/2'>
          {/* <div className="grid grid-cols-1 gap-9 sm:grid-cols-2"> */}
          <div className="flex flex-col gap-9">
            {/* <!-- Contact Form --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-between">
                <h3 className="font-medium text-black dark:text-white text-3xl">
                  {certName} 
                </h3>
                <button className='bg-primary px-5 rounded-lg text-white'>{certTypeReturn(certType)}</button>
              </div>

              <div className="p-6.5">

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Student Name
                  </label>
                  <p
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >{name}</p>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Valid Till
                    </label>
                    <p
                      placeholder="Enter your first name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >{getHumanReadableDateFromContract(validdate)}</p>
                  </div>

                  <div className="w-full xl:w-1/2">
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                   Issuer
                  </label>
                  <p
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >{institute}</p>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Issued To
                  </label>
                  <p
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >{name} ({issuedTo})</p>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Remarks
                  </label>
                  <p
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >{remarks}</p>
                </div>
                <div className='flex gap-3 mb-5'>
                  <button  onClick={() => setIsModalOpen(true)}  className='bg-primary font-semibold dark:bg-secondary dark:text-black rounded-lg text-white w-1/2 h-10'>Extend Validity</button>
                  <button onClick={() => revokeButton()} className='bg-red font-semibold dark:text-black rounded-lg text-white w-1/2'>Revoke</button>
                </div>

                <div className='flex text-xl'>
                  <hr className='w-full my-auto'></hr>
                  <p className='ml-2 mr-1'>More</p>
                  <p className='mr-2'>details</p>
                  <hr className='w-full my-auto'></hr>
                </div>

                <div className="">
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      NFT CID
                    </label>
                    <p className="break-all w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white">
                      {tokenuri}
                    </p>
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Contract Address
                    </label>
                    <p className="break-all w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white">
                    0x32999F8862941f9707e66134B37f1E5ddbada555
                    </p>
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Token ID
                    </label>
                    <p className="break-all w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white">
                     {params.id}
                    </p>
                  </div>
                </div>
                {/* hey gpt write code here  */}

              </div>

            </div>
          </div>
          {/* </div> */}
          <MyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} extendValiditybtn={extendValiditybtn} setdate={setdate} />
        </div>
      </div>
    </>
  )
}

export default page;


const MyModal = ({isOpen, onClose, extendValiditybtn, setdate  }) => {
    const handleModalClick = (e) => {
      e.stopPropagation();
    };
  
    return (
      <>
        {isOpen && (
          <Box
            position="fixed"
            top="0"
            left="0"
            right="0"
            bottom="0"
            background="rgba(0, 0, 0, 0.8)"
            display="flex"
            alignItems="center"
            flexDirection={"column"}
            style={{ flexDirection: "column" }}
            justifyContent="center"
            zIndex="10000000000000000"
            onClick={onClose}
          >
            <VStack background="white"
              padding="3rem"
              borderRadius="4px"
              boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
              onClick={handleModalClick}>
              <Text style={{ fontSize: '1.2rem', fontWeight: '700' , color:"#9A9A9A" }}>Enter the Number of Days You Want to Extend Validity for:</Text>
              <Input type='number' required placeholder="Enter Days..." onChange={(event) => setdate(event.target.value)}
                style={{padding:'0.4rem 1rem', border:"2px solid #50A838" , margin:'0.6rem 1rem' , borderRadius:'1rem'}}
              />
              <div>
              <button className='bg-primary px-5 rounded-lg text-white'   onClick={extendValiditybtn } >
               Confirm
              </button>
              </div>
             
            </VStack>
          </Box>
        )}
      </>
    );
  };
  