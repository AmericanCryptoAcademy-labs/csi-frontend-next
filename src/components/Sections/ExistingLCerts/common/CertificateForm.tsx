import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Input, Select, Button, FormControl, InputLabel, MenuItem } from '@mui/material';
import PreviewAndIssueModal from '../modal/PreviewAndIssue';
import certbg1 from '../../../../../public/images/certBackrounds/1.png'
import certbg2 from '../../../../../public/images/certBackrounds/2.png'
import certbg3 from '../../../../../public/images/certBackrounds/3.png'
import certbg4 from '../../../../../public/images/certBackrounds/4.png'
import certbg5 from '../../../../../public/images/certBackrounds/5.png'
import certbg6 from '../../../../../public/images/certBackrounds/6.png'
import certbg7 from '../../../../../public/images/certBackrounds/7.png'
import certbg8 from '../../../../../public/images/certBackrounds/8.png'
import certbg9 from '../../../../../public/images/certBackrounds/9.png'
import certbg10 from '../../../../../public/images/certBackrounds/10.png'

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
  certbg10
]


function CertificateForm({ index, certData, certName, certificateSrc, orgName, mintCert, createCanvas, open, onClose }: any) {
  const [selectedBackground, setSelectedBackground] = React.useState(Backgrounds[0]);
  console.log(selectedBackground);

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
      selectedBackground: selectedBackground
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
      setSelectedBackground(values.selectedBackground);
      
      createCanvas(values);
    }
  });

  return (
    <form onSubmit={issueLCertForm.handleSubmit}>
      {
        open && <PreviewAndIssueModal
          open={open}
          onClose={() => onClose()}
          imgSrc={certificateSrc}
          mintCertificate={() => mintCert(issueLCertForm.values)}
        />
      }
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            direction: "row",
            gap: "2rem",

          }}
        >
          {/* First Name */}
          <FormControl>
            <InputLabel htmlFor={`firstName-${index}`}>
              First Name
            </InputLabel>
            <Input
              id={`firstName-${index}`}
              type="text"
              sx={{ width: "100%" }}
              {...issueLCertForm.getFieldProps("firstName")}
            />
          </FormControl>

          {/* Last Name */}
          <FormControl>
            <InputLabel htmlFor={`lastName-${index}`}>
              Last Name
            </InputLabel>
            <Input
              id={`lastName-${index}`}
              type="text"
              {...issueLCertForm.getFieldProps("lastName")}
            />
          </FormControl>
        </Box>

        {/* Remarks */}
        <FormControl>
          <InputLabel htmlFor={`remarks-${index}`}>
            Remarks
          </InputLabel>
          <Input
            id={`remarks-${index}`}
            type="text"
            {...issueLCertForm.getFieldProps("remarks")}
          />
        </FormControl>

        {/* Issued To */}
        <FormControl>
          <InputLabel htmlFor={`issuedTo-${index}`}>
            Issued To
          </InputLabel>
          <Input
            id={`issuedTo-${index}`}
            type="text"
            {...issueLCertForm.getFieldProps("issuedTo")}
          />
        </FormControl>
          
        {/* Description */} 
        <FormControl>
          <InputLabel htmlFor={`description-${index}`}>
            Description
          </InputLabel>
          <Input
            id={`description-${index}`}
            type="text"
            {...issueLCertForm.getFieldProps("description")}
          />
        </FormControl>
        
        <Box
          sx={{
            display: "flex",
            direction: "row",
            gap: "2rem",
          }}
        >
          {/* Expiry in Days */}
          <FormControl fullWidth>
            <InputLabel htmlFor={`expInDays`}>
              Expiry in Days
            </InputLabel>
            <Input
              id={`expInDays`}
              type="number"
              sx={{ width: "150px" }}
              {...issueLCertForm.getFieldProps("expInDays")}
            />
          </FormControl>

          {/* Background */}
          <FormControl fullWidth>
            <InputLabel htmlFor={`selectedBackground-${index}`}>
              Background
            </InputLabel>
            
            <Select
              id={`selectedBackground-${index}`}
              value={selectedBackground}
              onChange={(e: any) => setSelectedBackground(e.target.value)}
            >
              {
                Backgrounds.map((bg, index) => (
                  <MenuItem key={index} value={bg}>
                    <img src={bg?.src} alt="Background" width="50" height="50" />
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>  
        </Box>

      {/* Additional fields can be added here similarly */}
      <Button type="submit">Submit</Button>
      </Box>
    </form>
  );
}

export default CertificateForm;
