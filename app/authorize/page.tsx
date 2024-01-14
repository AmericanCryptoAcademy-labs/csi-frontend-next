"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import React, { useState , useEffect } from 'react';
import { CONTRACT_ABI, CONTRACT_ADDRESS , ADMIN } from '../../utils/constant';
import { ethers } from 'ethers';

function Page() {


    const [walletAddress , setwalletAddress] = useState<string>("");
    const [teachersArray , setteachers] = useState<Array<string>>([]);
    const [teacherAddress , setTeacherAddress] =  useState<string>("");

    async function fetchAllTeachers() {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
          const teachers = await contract.fetchAllTeachers();
          console.log("teachers" , teachers);
          setteachers(teachers)
          return teachers;
        } catch (error) {
          console.error("Error fetching teachers:", error);
          return [];
        }
    }


    const addteacher = async() =>{

        try {

          if(teacherAddress === "" || teacherAddress === ADMIN){
            alert("Please Input Teacher Address or Inputed Teacher Address is of Admin");
          }

          const provider = new ethers.providers.Web3Provider(window.ethereum)
          const signer = provider.getSigner()
          const aift = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
          const tx = await aift.addTeacher(teacherAddress);
          console.log(tx)
    
          const txhash = tx.hash 
    
          signer.provider.on(txhash, (receipt) => {
              console.log('Transaction confirmed:', receipt);
              alert("Transaction confirmed")
            });
        } catch (error) {
          console.log(error)
        } 
    
    
    }
      
      const removeteacher = async() =>{

        try {

          if(teacherAddress === "" || teacherAddress === ADMIN){
            alert("Please Input Teacher Address or Inputed Teacher Address is of Admin");
          }


          const provider = new ethers.providers.Web3Provider(window.ethereum)
          const signer = provider.getSigner()
          const aift = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
          const tx = await aift.removeTeacher(teacherAddress);
          console.log(tx)
    
          const txhash = tx.hash 
    
          signer.provider.on(txhash, (receipt) => {
              console.log('Transaction confirmed:', receipt);
              alert("Transaction Confirmed")
             
            });
        } catch (error) {
          console.log(error)
        
        } 
    
    }


    useEffect(() => {
        fetchAllTeachers()
      },[])


    return (

        <>
            <Breadcrumb pageName="Authorize" />
            <div className="flex w-full ">
                {/* <!-- Contact Form --> */}
                <div className="h-fit rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-7/12">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Manage Teachers
                        </h3>
                    </div>
                    <div>
                        <div className="p-6.5 pb-4">
                            <p className="text-lg mb-3">Address Of Teacher To Add</p>
                            <div className="flex justify-between">
                                <input
                                    onChange={(event) => setTeacherAddress(event.target.value)}
                                    type="text"
                                    placeholder="Teacher Wallet Address"
                                    className="mr-3 custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                                <button onClick={(e) => addteacher()} className='bg-primary px-5 rounded-md text-white w-4/12'>
                                    Add Teacher
                                </button>

                            </div>

                        </div>

                        <div className="p-6.5">
                            <p className="text-lg mb-3">Address Of Teacher To Remove</p>
                            <div className="flex justify-between">
                                <input
                                    onChange={(event) => setTeacherAddress(event.target.value)}
                                    type="text"
                                    placeholder="Teacher Wallet Address"
                                    className="mr-3 custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                                <button onClick={() => removeteacher()} className='bg-primary px-5 rounded-md text-white w-4/12'>
                                    Remove Teacher
                                </button>

                            </div>

                        </div>
                    </div>
                </div>


                <div className="w-5/12 pl-3 h-5/6">
                    <div className=" col-span-12 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
                        <div className="flex items-start justify-between border-b border-stroke py-5 px-6 dark:border-strokedark">
                            <div>
                                <h2 className="mb-1.5 text-title-md2 font-bold text-black dark:text-white">
                                    Authorized Teachers
                                </h2>
                                <p className="text-sm font-medium">Most used resources</p>
                            </div>
                        </div>

                        <div className="px-3 pb-5 h-125 overflow-y-scroll">
                            {teachersArray.map((t,i)=>(
                                <div key={i} className="group flex items-center justify-between rounded-md p-4.5 hover:bg-gray-2 dark:hover:bg-graydark">
                                <div className="flex items-center gap-4">
                                    <h4 className=" text-md  text-black group-hover:text-primary dark:text-white dark:group-hover:text-primary">
                                        {t}
                                    </h4>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Page