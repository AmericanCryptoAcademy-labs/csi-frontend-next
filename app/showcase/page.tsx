"use client";

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb'
import Eventcard from '@/components/ShowCert/Eventcard'
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers'
import Link from 'next/link';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../../utils/constant';
import { Button, Box, Center, Heading, VStack, HStack, Spinner, ChakraProvider } from '@chakra-ui/react';


function Page() {

  type CertInfo = {
    nfturl: string,
    issuedOn: number
  }

  const [nftArray, setnftArray] = useState<any>([]);
  const [loading, setloading] = useState<boolean>(false);
  const [filterby, setFilterby] = useState<string[]>([]);


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

  const handleClickOnFilter = (tag: string) => {
    setFilterby(prev => {
      if (prev.includes(tag)) {
        return prev.filter(item => item !== tag);
      } else {
        return [...prev, tag];
      }
    });
    console.log(nftArray);
  };

  const isFilterActive = (tag: string) => {
    return filterby.includes(tag);
  };


  const certTypeReturn = (type: string) => {
    console.log(type,"accac");
    if (type === "0") {
      return "Active"
    } else if (type === "1") {
      return "Expired"
    } else {
      return "Revoked"
    }
  }


  return (
    <>
      <ChakraProvider>
        <Breadcrumb pageName="My Certificates" />
        <div className='flex'>
          <p className='text-lg'>Filter by: </p>
          <button
            className={`ml-4 mr-2 bg-primary w-20 rounded-md text-white ${isFilterActive('Active') ? 'bg-red' : ''}`}
            onClick={() => handleClickOnFilter('Active')}
          >
            Active
          </button>
          <button
            className={`mx-2 bg-primary w-20 rounded-md text-white ${isFilterActive('Revoked') ? 'bg-red' : ''}`}
            onClick={() => handleClickOnFilter('Revoked')}
          >
            Revoked
          </button>
          <button
            className={`mx-2 bg-primary w-20 rounded-md text-white ${isFilterActive('Future') ? 'bg-red' : ''}`}
            onClick={() => handleClickOnFilter('Future')}
          >Future
          </button>

        </div>
        {
          loading ?
            <Center h={'30vh'} justifyContent={'center'} >
              <Spinner alignSelf={'center'} thickness='5px' speed='0.5s' emptyColor='gray.200' color='#333' size='xl' />
            </Center>
            :

            <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-2 gap-5 mt-5    ">


              {nftArray.map((cert, index) => (
                cert.tokenURI && ( //here i will ensure the certificate status is avaliable into the array or not 
                  <Link key={cert.NFTId} href={`/certificatePage/${cert.NFTId}`}>
                    <Eventcard tokenId={cert.id} timeOfIssueance={cert.timeOfIssueance.toString()} tokenURI={cert.tokenURI} thumbnail={"/images/sample/sample.jpg"} certArray={nftArray} ></Eventcard>
                  </Link>
                )
              ))}
            </div>
        }
      </ChakraProvider>
    </>
  )
}

export default Page