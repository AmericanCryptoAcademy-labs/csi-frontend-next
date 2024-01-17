import React, { useState, useEffect } from 'react'
import sample from '../images/sampleCert/sample.jpg'
import Image from 'next/image';
import Link from 'next/link';
import { ethers } from 'ethers';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/utils/constant';

export type cardType = {
  status : string,
  tokenURI: string,
  thumbnail: any,
  timeOfIssueance: string,
  tokenId: number
  certArray: any
}

function Eventcard(props: cardType) {

  const [name, setname] = useState<string>();
  const [status, setStatus] = useState<string>('')
  // const [image, setimage] = useState<string>('');

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        console.log(`Token URI ${tokenURI}`)
        const response = await fetch(`https://ipfs.io/ipfs/${tokenURI}/metadata.json`);
        // console.log(response)
        const metadata = await response.json();
        console.log(metadata, "max");
        // console.log(metadata.text())
        setname(metadata.name);
        // setStatus(metadata)
        // let tokenImagex = metadata.image;
        // setimage(tokenImagex);

      } catch (error) {
        console.error('Error fetching metadata:', error);
      }
    }
    fetchMetadata();

  }, [ props.status , props.tokenURI]);


  function getHumanReadableDateFromContract(timestamp) {
    // 2. Convert the Unix timestamp to a JavaScript Date object
    const dateObject = new Date(Number(timestamp) * 1000);

    // 3. Convert the Date object to a human-readable string
    return dateObject.toISOString().slice(0, 19).replace("T", " ");
  }

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

  const getNftInfo = async () => {

    try {

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const aift = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await aift.getCertificateDetails(props.tokenId.toString());
      setStatus(certTypeReturn(tx.status.toString()))
      // setcerttype(tx.status.toString());

    } catch (error) {
      console.log('getNftInfo Function Error -> ', error)
    }
  }
  getNftInfo()

  var tokenURI = props.tokenURI;
  // console.log(thumbnail);
  return (
    <div className='dark:bg-[#24313e] bg-graydark mx-1 rounded-lg p-6 pt-10 relative mb-3'>
      {status==="Active"&& <p className='absolute right-0 top-0 px-5 py-1 bg-meta-3 text-black-2 rounded-tr-lg rounded-bl-lg '>{status}</p>}
      {status==="Expired"&& <p className='absolute right-0 top-0 px-5 py-1 bg-red text-black-2 rounded-tr-lg rounded-bl-lg '>{status}</p>}
      {status==="Revoked"&& <p className='absolute right-0 top-0 px-5 py-1 bg-meta-6 text-black-2 rounded-tr-lg rounded-bl-lg '>{status}</p>}
      
      <div className='w-full bg-stone-900 min-h-28 rounded-lg '>
        <Image
          src={props.thumbnail}
          alt="Description of image"
          width={500}
          height={300}
          layout="responsive"
        />
      </div>
      <div className='mt-5 flex justify-between px-'>
        <p className='text-center text-white text-xl font-semibold mb-2.5 '>{name}</p>
        <p className='text-center text-meta-6 text-xl mb-2.5 '>{getHumanReadableDateFromContract(props.timeOfIssueance)}</p>
      </div>

      <Link href={`/showcase/${props.tokenId.toString()}`}>
        <button className='bg-primary dark:bg-primary text-white w-full px-3 py-2 bg-amber-500 rounded-md font-semibold '>Details</button>
      </Link>
    </div>
  )
}

export default Eventcard