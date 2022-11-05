import {
  Alert,
  Box,
  Button,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";

enum InputError {
  name = "name",
  email = "email",
  number = "number",
  file = "file",
}

export default function ContactUs() {
  let inputFile: HTMLInputElement;

  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<InputError | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const handleSubmit = async () => {
    if (!name) setError(InputError.name);
    else if (
      !email ||
      !String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    )
      setError(InputError.email);
    else if (!number || number.length !== 10) setError(InputError.number);
    else if (!fileName) setError(InputError.file);
    else {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("number", number);
      formData.append("file", file!);
      const response = await fetch("http://10.0.38.79:8080/upload", {
        method: "POST",
        // headers: {
        //   "content-type": "multipart/form-data",
        // },
        body: formData,
      });

      const jsonRes = await response.json();
      console.log(jsonRes);
      setLoading(false);
      setFile(null);
      setFileName(null);
      setName("");
      setEmail("");
      setNumber("");
      setSuccess("Form Submitted Successfully!");
    }
  };

  return (
    <Stack
      width={"100%"}
      justifyContent="center"
      alignItems={"center"}
      spacing="10px"
      direction={"row"}
    >
      <Box width={"100%"}>
        <Typography>Contact Information</Typography>
        <Typography>
          Welcome to Sone-Zon-Solis Energy, we are happy to answer any questions
          that you might have about our services. Please fill out the contact us
          form and we will get back to your shortly! (782)652-5426
          contact-us@sone.com
        </Typography>
      </Box>
      <Box width={"100%"}>
        <Stack spacing={3}>
          <Typography>Contact Us Form</Typography>
          <TextField
            required
            label="Name"
            variant="standard"
            fullWidth
            value={name}
            onChange={(e) => {
              setName(e.target.value as string);
              setError(null);
            }}
            error={error === InputError.name ? true : false}
          />
          <TextField
            type={"email"}
            error={error === InputError.email ? true : false}
            required
            label="Email"
            variant="standard"
            fullWidth
            value={email}
            onChange={(e) => {
              setEmail(e.target.value as string);
              setError(null);
            }}
          />
          <TextField
            type={"number"}
            error={error === InputError.number ? true : false}
            required
            label="Phone"
            variant="standard"
            fullWidth
            value={number}
            onChange={(e) => {
              setNumber(e.target.value as string);
              setError(null);
            }}
          />
          <Stack direction={"row"}>
            <div style={{ width: "100%" }}>
              <label htmlFor="contained-button-file">
                <input
                  style={{ display: "none" }}
                  ref={(input) => {
                    // assigns a reference so we can trigger it later
                    inputFile = input!;
                  }}
                  accept="*.png"
                  id="contained-button-file"
                  type="file"
                  onChange={(e) => {
                    setFile(e.target.files![0]);
                    setFileName(e.target.files![0].name);
                    setError(null);
                  }}
                />
              </label>
              <Button
                onClick={() => inputFile.click()}
                color={error === InputError.file ? "error" : "primary"}
              >
                Upload File
              </Button>
            </div>
            <Typography>{fileName}</Typography>
          </Stack>
          <LoadingButton loading={loading} onClick={handleSubmit}>
            Submit
          </LoadingButton>
        </Stack>
      </Box>
      <Snackbar
        open={success ? true : false}
        autoHideDuration={6000}
        onClose={() => setSuccess("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSuccess("")}
          severity="success"
          sx={{ width: "100%" }}
        >
          {success}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
