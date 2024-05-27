"use client";
import CircularProgress from "@/components/progressiveChart/ProgressiveChart";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

function page() {
  const startDate = "2024-05-26T05:50:49.250Z";
  const endDate = "2025-05-26T05:50:49.250Z";
  return (
    <div className="bg-[#1b222d] h-full p-10 pt-5">
      <p className="font-semibold text-2xl mb-5 text-white">Certificates</p>
      <div className="flex gap-8 w-full">
        <div className="w-5/12">
          <img
            src="https://nftstorage.link/ipfs/bafybeidlbgum7ykdp6kj6h2hdvjpkjbnlvyibtnkdcdig3ti3tid6xqrgy/image.jpeg"
            alt={`Certificate`}
            className="w-full   rounded-2xl" // This ensures the image takes the full width of the column and height adjusts automatically
          />
        </div>

        <div className="w-7/12">
          <p className="text-4xl font-semibold">Full Stack Web developer #2</p>
          <div className="flex mt-12 text-xl">
            <Icon className="text-3xl" icon="mdi:user" />
            <p className="text-gray-300">
              Owned by{" "}
              <span className="font-bold text-white">Matty Rogers</span>
            </p>
          </div>

          <div className="mt-4 text-lg ">
            <div className="flex gap-1">
              <Icon
                className="text-3xl"
                icon="mdi:resource-description-framework"
              />
              <p className="text-gray-300 text-xl">Description:</p>
            </div>
            <p className="mx-9 mt-2">
              Certificate issued to Shashank Patil by test-1, for achieving full
              stack web3 developer.
            </p>
          </div>

          <div className="border-t border-gray-500 mt-4 w-full"></div>

          <div className="flex">
            <div className=" gap-2 mt-4 w-1/2 ">
              <div className="flex gap-1">
                <Icon className="text-3xl" icon="codicon:organization" />
                <p className="text-gray-300 text-xl">Organization:</p>
              </div>
              <p className="ml-9 text-xl">Easycerts.</p>
            </div>

            <div className="gap-2 mt-4">
              <div className="flex gap-1">
                <Icon className="text-3xl" icon="ph:certificate" />
                <p className="text-gray-300 text-xl">Certificate Name:</p>
              </div>
              <p className="text-xl ml-9">Full Stack Web developer</p>
            </div>
          </div>

          <div className="gap-2 mt-4">
            <div className="flex gap-1">
              <Icon className="text-3xl" icon="ph:certificate" />
              <p className="text-gray-300 text-xl">Remark:</p>
            </div>
            <p className="text-xl ml-9">Excellent</p>
          </div>

          <div className="flex gap-4">
            <div className="gap-2 mt-4 w-1/3">
              <div className="flex gap-1">
                <Icon className="text-3xl" icon="ph:certificate" />
                <p className="text-gray-300 text-xl">Issue Date:</p>
              </div>
              <p className="text-xl ml-9">2024-05-26</p>
            </div>

            <div className="gap-2 mt-4 w-1/3">
              <div className="flex gap-1">
                <Icon className="text-3xl" icon="ph:certificate" />
                <p className="text-gray-300 text-xl">Valid For:</p>
              </div>
              <p className="text-xl ml-9">2024-05-26</p>
            </div>

            <CircularProgress startDate={startDate} endDate={endDate} />
          </div>

          <div className="mt-4 text-lg ">
            <div className="flex gap-1">
              <Icon className="text-3xl" icon="ph:wallet-bold" />
              <p className="text-gray-300 text-xl">Owner Wallet Address:</p>
            </div>
            <p className="mx-9">0x8aEAb9cFFFCc20c2A9ECE8140eD308cD38542150</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
