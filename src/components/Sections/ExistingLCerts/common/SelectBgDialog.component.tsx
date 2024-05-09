import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


import bg1 from "../../../../../public/images/certBackrounds/1.png";
import bg2 from "../../../../../public/images/certBackrounds/2.png";
import bg3 from "../../../../../public/images/certBackrounds/3.png";
import bg4 from "../../../../../public/images/certBackrounds/4.png";
import bg5 from "../../../../../public/images/certBackrounds/5.png";
import bg6 from "../../../../../public/images/certBackrounds/6.png";
import bg7 from "../../../../../public/images/certBackrounds/7.png";
import bg8 from "../../../../../public/images/certBackrounds/8.png";
import bg9 from "../../../../../public/images/certBackrounds/9.png";
import bg10 from "../../../../../public/images/certBackrounds/10.png";

import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Props {
  setCertBg: React.Dispatch<React.SetStateAction<string>>;
}

export default function SelectBgDialog(props: Props) {
  const predesignedBgList = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10];
  const [open, setOpen] = React.useState(false);
  predesignedBgList.map((e) =>
    console.log(e.src, e)
    
  );
  const handleClickOpen = (event:React.FormEvent) => {
    event.preventDefault()
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSelectBg = (bg: string) => {
    props.setCertBg(bg);
    handleClose();
  }
  return (
    <>
      <div className="px- py-8.5 ">
        <button
          className="text-meta-5 border border-meta-5  w-full px-15 py-3 rounded"
          onClick={(e)=>handleClickOpen(e)}
        >
          Choose Background
        </button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="rounded-full absolute"
        fullWidth
      >
        <Icon
          onClick={handleClose}
          className=" absolute right-4 top-4 text-white cursor-pointer"
          icon="maki:cross"
        />
        <div className="p-10 bg-[#24313e] border-black border grid grid-cols-5 gap-4">
          {predesignedBgList.map((e) => (
            <div key={e.src} className="w-full h-auto">
              <Image
                onClick={() => onSelectBg(e.src)}
                src={e}
                alt={e.src}
                width={100}
                height={100}
                className=""
              />
            </div>
          ))}
        </div>
      </Dialog>
    </>
  );
}
