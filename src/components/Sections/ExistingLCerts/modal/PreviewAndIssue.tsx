"use client"; 
import React from 'react';
import Image from 'next/image';
import { Box, Button, Typography, Modal } from "@mui/material";

type TPreviewAndIssueModalProps = {
  open: boolean;
  onClose: () => void;
  certData: any;
  imgSrc: string;
  mintCertificate: () => void;
};

export default function PreviewAndIssueModal({ open, onClose, certData, imgSrc, mintCertificate }: TPreviewAndIssueModalProps) {

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Preview Certificate
        </Typography>
        <Box>
        <Image src={imgSrc} alt="Certificate" width={400} height={400} />
        </Box>
        <Box>
          <Button onClick={() => mintCertificate()} variant="contained">
            Issue Certificate</Button>
        </Box>
      </Box>
    </Modal>
  );
}
