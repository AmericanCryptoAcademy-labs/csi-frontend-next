"use client";
import CircularProgress from "@/components/commonComponents/progressiveChart/ProgressiveChart";
import { ipfsMetadata } from "@/types/commonTypes";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface Props {
  certificateToken: ipfsMetadata | undefined;
}

function SpecificCertificate({ certificateToken }: Props) {
  console.log(certificateToken, "certificateToken");

  let startDate = certificateToken?.attributes
    .find((attr) => attr.trait_type === "Issue Date")
    ?.value.substring(0, 10);

  const endDate = certificateToken?.attributes
    .find((attr) => attr.trait_type === "Valid for")
    ?.value.substring(0, 10);
  return (
    <div className="bg-[#1b222d] h-full p-10 pt-5">
      <p className="font-semibold text-2xl mb-5 text-white">Certificates</p>
      <div className="flex gap-8 w-full">
        <div className="w-5/12">
          <img
            src={certificateToken?.image}
            alt={`Certificate`}
            className="w-full   rounded-2xl" // This ensures the image takes the full width of the column and height adjusts automatically
          />
        </div>

        <div className="w-7/12">
          <p className="text-4xl font-semibold">{certificateToken?.name}</p>
          <div className="flex mt-12 text-xl">
            <Icon className="text-3xl" icon="mdi:user" />
            <p className="text-gray-300">
              Owned by{" "}
              <span className="font-bold text-white">
                {
                  certificateToken?.attributes.find(
                    (attr) => attr.trait_type === "Student Name"
                  )?.value
                }
              </span>
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
            <p className="mx-9 mt-2">{certificateToken?.description}</p>
          </div>

          <div className="border-t border-gray-500 mt-4 w-full"></div>

          <div className="flex">
            <div className=" gap-2 mt-4 w-1/2 ">
              <div className="flex gap-1">
                <Icon className="text-3xl" icon="codicon:organization" />
                <p className="text-gray-300 text-xl">Organization:</p>
              </div>
              <p className="ml-9 text-xl">
                {
                  certificateToken?.attributes.find(
                    (attr) => attr.trait_type === "Issued By"
                  )?.value
                }
              </p>
            </div>

            <div className="gap-2 mt-4">
              <div className="flex gap-1">
                <Icon className="text-3xl" icon="ph:certificate" />
                <p className="text-gray-300 text-xl">Certificate Name:</p>
              </div>
              <p className="text-xl ml-9">
                {" "}
                {
                  certificateToken?.attributes.find(
                    (attr) => attr.trait_type === "Certificate Name"
                  )?.value
                }
              </p>
            </div>
          </div>

          <div className="gap-2 mt-4">
            <div className="flex gap-1">
              <Icon className="text-3xl" icon="ph:certificate" />
              <p className="text-gray-300 text-xl">Remark:</p>
            </div>
            <p className="text-xl ml-9">
              {
                certificateToken?.attributes.find(
                  (attr) => attr.trait_type === "Remarks"
                )?.value
              }
            </p>
          </div>

          <div className="flex gap-4">
            <div className="gap-2 mt-4 w-1/3">
              <div className="flex gap-1">
                <Icon className="text-3xl" icon="ph:certificate" />
                <p className="text-gray-300 text-xl">Issue Date:</p>
              </div>
              <p className="text-xl ml-9">
                {certificateToken?.attributes
                  .find((attr) => attr.trait_type === "Issue Date")
                  ?.value.substring(0, 10)}
              </p>
            </div>

            <div className="gap-2 mt-4 w-1/3">
              <div className="flex gap-1">
                <Icon className="text-3xl" icon="ph:certificate" />
                <p className="text-gray-300 text-xl">Valid For:</p>
              </div>
              <p className="text-xl ml-9">
                {certificateToken?.attributes
                  .find((attr) => attr.trait_type === "Valid for")
                  ?.value.substring(0, 10)}
              </p>
            </div>

            <CircularProgress
              startDate={startDate ?? ""}
              endDate={endDate ?? ""}
            />
          </div>

          <div className="mt-4 text-lg ">
            <div className="flex gap-1">
              <Icon className="text-3xl" icon="ph:wallet-bold" />
              <p className="text-gray-300 text-xl">Owner Wallet Address:</p>
            </div>
            <p className="mx-9">
              {
                certificateToken?.attributes.find(
                  (attr) => attr.trait_type === "Issued To"
                )?.value
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpecificCertificate;
