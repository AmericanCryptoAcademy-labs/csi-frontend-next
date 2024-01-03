"use client";

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import Eventcard from '@/components/ShowCert/Eventcard'
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers'
import Link from 'next/link';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../../utils/constant';
import { Button, Box, Center, Heading, VStack, HStack, Spinner, ChakraProvider } from '@chakra-ui/react';


function page() {

  type CertInfo = {
    nfturl: string,
    issuedOn: number
  }

  const [nftArray, setnftArray] = useState<any>([]);
  const [loading, setloading] = useState<boolean>(false);


  const fetchMyNFTs = async () => {

    try {

      setloading(true);
      const accounts = await window.ethereum.request({
        method: 'eth_accounts'
      });

      const account = accounts[0];

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const aift = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

      const tx = await aift.fetchMYNFTs(account)
      const proposalsArray = Object.values(tx);

      console.log("Proposals Array", proposalsArray);
      setnftArray(proposalsArray);
      console.log("NFT ARRAY -> ", nftArray)
      setloading(false);
    } catch (error) {
      console.log('FetchMyNFTs Function Error -> ', error);
    }

  }

  useEffect(() => {
    fetchMyNFTs();
  }, [])



  return (
    <>
      <ChakraProvider>
        <Breadcrumb pageName="My Certificates" />
        {
          loading ?
            <Center h={'30vh'} justifyContent={'center'} >
              <Spinner alignSelf={'center'} thickness='5px' speed='0.5s' emptyColor='gray.200' color='#333' size='xl' />
            </Center>
            :

            <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-2 gap-5 mt-5    ">

              {nftArray.map((cert, index) => (
                cert.tokenURI && (
                  <Link key={cert.NFTId} href={`/certificatePage/${cert.NFTId}`}>
                    <Eventcard timeOfIssueance={cert.timeOfIssueance.toString()} tokenURI={cert.tokenURI} thumbnail={"/images/sample/sample.jpg"} ></Eventcard>
                  </Link>
                )
              ))}

            </div>

        }
      </ChakraProvider>
    </>
  )
}

export default page