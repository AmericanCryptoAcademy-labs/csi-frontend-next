"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Input } from "@mui/material";
import { useAccount, useWriteContract } from "wagmi";
import { appAtom } from "@/store/AppStore";
import { useAtom } from "jotai";
import { TCreateOrgParams } from "@/types";
import { Contracts } from "@/contracts";
import { useFormik } from "formik";
import * as Yup from "yup";
import { validateAddresses } from "@/helpers";

export default function CreateOrgSection() {
  const [appState, setAppState] = useAtom(appAtom);
  const [orgName, setOrgName] = useState("");
  const [orgAdmins, setOrgAdmins] = useState<any>([]);
  const [orgIssuers, setOrgIssuers] = useState<any>([]);
  const { address } = useAccount();
  const {
    writeContract,
    error: createOrgError,
    isSuccess: createOrgSuccess,
  } = useWriteContract();

  const createOrgForm = useFormik({
    initialValues: {
      orgName: "",
      orgAdmins: "",
      orgIssuers: "",
    },
    validationSchema: Yup.object({
      orgName: Yup.string().required("Required"),
      orgAdmins: Yup.string()
        .required("Admins are required")
        .test(
          "is-valid-array",
          "Admins must beee a valid list of Ethereum addresses",
          (value) => validateAddresses(value)
        ),
      orgIssuers: Yup.string()
        .required("Issuers are required")
        .test(
          "is-valid-array",
          "Issuers must be a valid list of Ethereum addresses",
          (value) => validateAddresses(value)
        ),
    }),
    onSubmit: async (values) => {
      setOrgName(values.orgName);
      setOrgAdmins(values.orgAdmins);
      setOrgIssuers(values.orgIssuers);

      const args: TCreateOrgParams = {
        orgName: values.orgName,
        orgAdmins: values.orgAdmins.split(", "),
        orgIssuers: values.orgIssuers.split(", "),
      };
      const value = BigInt(10000000000000000);
      try {
        await writeContract({
          abi: Contracts.CSI.abi,
          address: Contracts.CSI.address,
          functionName: "createOrginization",
          args: [args.orgName, args.orgAdmins, args.orgIssuers],
          value: value,
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  return (
    <div className="w-1/2 mx-4 my-4 ">
      {/* Create Org Card */}
      <div className="rounded-sm border shadow-default border-[#2E3A47] bg-[#24303F]  ">
        <div className="border-b py-4 px-6.5 border-[#2E3A47]">
          <h3 className="font-medium  text-white mx-6 text-xl">
            Organization Details
          </h3>
        </div>

        <div className="p-6 ">
          <form
            onSubmit={createOrgForm.handleSubmit}
            className="flex flex-col gap-4 w-full"
          >
            <div className="w-full ">
              <label className="mb-2.5 block text-white">
                Organization name
              </label>
              <input
                id="orgName"
                name="orgName"
                type="text"
                onChange={createOrgForm.handleChange}
                value={createOrgForm.values.orgName}
                placeholder="Enter organization name"
                className="w-full rounded-md border-[2px] border-[#3d4d60] bg-transparent py-3 px-5 font-medium text-white outline-none transition focus:border-[#3d51e0]"
              />
            </div>

            <div className="w-full ">
              <label className="mb-2.5 block text-white">Admins</label>
              <input
                id="orgAdmins"
                name="orgAdmins"
                type="text"
                onChange={createOrgForm.handleChange}
                value={createOrgForm.values.orgAdmins}
                placeholder="Enter admins by saperating with comma"
                className="w-full rounded-md border-[2px] border-[#3d4d60] bg-transparent py-3 px-5 font-medium text-white outline-none transition focus:border-[#3d51e0]"
              />
            </div>

            <div className="w-full ">
              <label className="mb-2.5 block text-white">Issuers</label>
              <input
                id="orgIssuers"
                name="orgIssuers"
                type="text"
                onChange={createOrgForm.handleChange}
                value={createOrgForm.values.orgIssuers}
                placeholder="Enter issuers by saperating with comma"
                className="w-full rounded-md border-[2px] border-[#3d4d60] bg-transparent py-3 px-5 font-medium text-white outline-none transition focus:border-[#3d51e0]"
              />
            </div>

            <button
              type="submit"
              className={`mb-7 mt-2 flex w-full justify-center rounded bg-[#3d51e0] p-2.5 font-medium text-white text-xl }`}
            >
              Create Organization
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
