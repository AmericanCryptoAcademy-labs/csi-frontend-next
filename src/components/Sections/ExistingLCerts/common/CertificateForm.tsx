import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Box,
  Input,
  Select,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import PreviewAndIssueModal from "../modal/PreviewAndIssue";
import certbg1 from "../../../../../public/images/certBackrounds/1.png";
import certbg2 from "../../../../../public/images/certBackrounds/2.png";
import certbg3 from "../../../../../public/images/certBackrounds/3.png";
import certbg4 from "../../../../../public/images/certBackrounds/4.png";
import certbg5 from "../../../../../public/images/certBackrounds/5.png";
import certbg6 from "../../../../../public/images/certBackrounds/6.png";
import certbg7 from "../../../../../public/images/certBackrounds/7.png";
import certbg8 from "../../../../../public/images/certBackrounds/8.png";
import certbg9 from "../../../../../public/images/certBackrounds/9.png";
import certbg10 from "../../../../../public/images/certBackrounds/10.png";
import SelectBgDialog from "./SelectBgDialog.component";
import { supabase } from "@/config/supabase.config";

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
  certbg10,
];

function CertificateForm({
  index,
  certData,
  certName,
  certificateSrc,
  orgName,
  mintCert,
  createCanvas,
  open,
  onClose,
}: any) {
  const [selectedBackground, setSelectedBackground] = React.useState(
    Backgrounds[0]
  );
  const [certBg, setCertBg] = useState<string>("");

  const issueLCertForm = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      certName: certName,
      remarks: "",
      issuedTo: "",
      orgName: orgName,
      description: "",
      dateIssued: new Date().toISOString(),
      expInDays: "",
      certBg: certBg,
    },
    validationSchema: yup.object({
      firstName: yup.string().required("Required"),
      lastName: yup.string().required("Required"),
      certName: yup.string().required("Required"),
      remarks: yup.string().required("Required"),
      issuedTo: yup.string().required("Required"),
      orgName: yup.string().required("Required"),
      description: yup.string().required("Required"),
      expInDays: yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      values.certBg = certBg;
      createCanvas(values);
    },
  });


  return (
    <form onSubmit={issueLCertForm.handleSubmit}>
      {open && (
        <PreviewAndIssueModal
          open={open}
          onClose={() => onClose()}
          imgSrc={certificateSrc}
          mintCertificate={() => mintCert(issueLCertForm.values)}
        />
      )}

      <div className="flex flex-col gap-2 mt-2 pt-4 border-[#d3d3d3] border-t">
        <div className="flex gap-4 justify-between">
          <div className="w-full ">
            <label className="mb-2.5 block text-black dark:text-white">
              First Name
            </label>
            <input
              id={`firstName-${index}`}
              type="text"
              {...issueLCertForm.getFieldProps("firstName")}
              placeholder="Enter organization name"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          <div className="w-full ">
            <label className="mb-2.5 block text-black dark:text-white">
              Last Name
            </label>
            <input
              id={`lastName-${index}`}
              type="text"
              {...issueLCertForm.getFieldProps("lastName")}
              placeholder="Enter organization name"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
        </div>

        <div className="w-full ">
          <label className="mb-2.5 block text-black dark:text-white">
            Remarks
          </label>
          <input
            id={`remarks-${index}`}
            type="text"
            {...issueLCertForm.getFieldProps("remarks")}
            placeholder="Enter organization name"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        {/* issued to will comes here i am redesigning below code and use above designs or code snippits  */}
        <div className="w-full ">
          <label className="mb-2.5 block text-black dark:text-white">
            Issued To
          </label>
          <input
            id={`issuedTo-${index}`}
            type="text"
            {...issueLCertForm.getFieldProps("issuedTo")}
            placeholder="Enter organization name"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        <div className="w-full ">
          <label className="mb-2.5 block text-black dark:text-white">
            Description
          </label>
          <input
            id={`description-${index}`}
            type="text"
            {...issueLCertForm.getFieldProps("description")}
            placeholder="Enter organization name"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        <div className="flex gap-5 justify-between">
          <div className="w-1/3 ">
            <label className="mb-2.5 block text-black dark:text-white">
              Expiry in Days
            </label>
            <input
              id={`expInDays`}
              type="number"
              {...issueLCertForm.getFieldProps("expInDays")}
              placeholder="0 Days"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          <div className="w-2/3 ">
            <label className="mb-2.5 block text-black dark:text-white">
              Choose Background
            </label>
            <SelectBgDialog setCertBg={setCertBg} />
          </div>
        </div>

        {/* Additional fields can be added here similarly */}
        <button
          className="bg-[#3d50e1] py-2.5 text-white rounded w-full "
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CertificateForm;
