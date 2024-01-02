import { Breadcrumb } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'

function page() {
  const nftCid = "bafyreidgfhdn3k47oefbtundl5y2nlncu76mw5szwb3wblxwzrxw44i6y";
  const contractAddress = "0x32999F8862941f9707e66134B37f1E5ddbada555";
  const tokenId = "1";
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
                  Certificate Name
                </h3>
                <button className='bg-primary px-5 rounded-lg text-white'>Revoked</button>
              </div>

              <div className="p-6.5">

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Student Name
                  </label>
                  <p
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >xyz</p>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Valid Till
                    </label>
                    <p
                      placeholder="Enter your first name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >xyz</p>
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Issuer
                    </label>
                    <p
                      placeholder="Enter your first name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >xyz</p>
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Issued To
                  </label>
                  <p
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >xyz</p>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Remarks
                  </label>
                  <p
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >xyz</p>
                </div>
                <div className='flex gap-3 mb-5'>
                  <button className='bg-primary font-semibold dark:bg-secondary dark:text-black rounded-lg text-white w-1/2 h-10'>Extend Validity</button>
                  <button className='bg-red font-semibold dark:text-black rounded-lg text-white w-1/2'>Revoke</button>
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
                      {nftCid}
                    </p>
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Contract Address
                    </label>
                    <p className="break-all w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white">
                      {contractAddress}
                    </p>
                  </div>
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Token ID
                    </label>
                    <p className="break-all w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white">
                      {tokenId}
                    </p>
                  </div>
                </div>
                {/* hey gpt write code here  */}

              </div>

            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  )
}

export default page