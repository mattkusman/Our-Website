import {
  Alert,
  Box,
  Button,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";

enum InputError {
  username = "username",
  password = "password",
}

interface User {
  user: string;
  pass: string;
}

export default function Login() {
  const users: User[] = [
    {
      user: "bob",
      pass: "sjhd76eww!",
    },
    {
      user: "clem",
      pass: "khsd54#h",
    },
    {
      user: "alicia",
      pass: "jhsjhsd222!",
    },
    {
      user: "sue",
      pass: "76shshs63!",
    },
    {
      user: "plank",
      pass: "5!ys!hhsds",
    },
  ];
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<InputError | null>(null);
  const [sbar, setSbar] = useState<string>("");
  const [data, setData] = useState<null | any[]>(null);
  const [type, setType] = useState<null | string>(null);
  useEffect(() => {
    const typeOfUser = localStorage.getItem("type");
    async function getEmails() {
      const response = await fetch("http://10.0.38.79:8080/getdata");
      const jsonResponse = await response.json();
      setData(jsonResponse);
    }
    if (typeOfUser) {
      setType(typeOfUser);
      getEmails();
    }
  }, []);
  async function handleClick(name: string) {
    try {
      window.open(`http://10.0.38.79:8080/files/${name}`);
    } catch (error) {
      throw error;
    }
  }

  const handleSubmit = async () => {
    if (!username) setError(InputError.username);
    else if (!password) setError(InputError.password);
    else {
      setLoading(true);

      //sent to server
      if (
        !users.find((ind) => ind.user === username && ind.pass === password)
      ) {
        setUsername("");
        setPassword("");
        setLoading(false);
        setSbar("Incorrect Credentials!");
      } else {
        //credentials are right
        if (username === "plank") {
          const response = await fetch("http://10.0.38.79:8080/getdata");
          const jsonResponse = await response.json();
          setData(jsonResponse);
          localStorage.setItem("type", "admin");
          setUsername("");
          setPassword("");
          setLoading(false);
        } else {
          setUsername("");
          setPassword("");
          setLoading(false);
        }
      }
    }
  };

  return type === null && data === null ? (
    <Stack
      spacing={3}
      justifyContent="center"
      alignItems={"center"}
      minHeight="calc(100vh - 230px)"
    >
      <Box width={"50%"}>
        <Stack
          spacing={3}
          justifyContent="center"
          alignItems={"center"}
          width="100%"
        >
          <Typography>Login</Typography>
          <TextField
            required
            label="Username"
            variant="standard"
            fullWidth
            value={username}
            onChange={(e) => {
              setUsername(e.target.value as string);
              setError(null);
            }}
            error={error === InputError.username ? true : false}
          />
          <TextField
            type={"password"}
            error={error === InputError.password ? true : false}
            required
            label="Password"
            variant="standard"
            fullWidth
            value={password}
            onChange={(e) => {
              setPassword(e.target.value as string);
              setError(null);
            }}
          />
          <LoadingButton loading={loading} onClick={handleSubmit} fullWidth>
            Submit
          </LoadingButton>
        </Stack>
      </Box>
      <Snackbar
        open={sbar ? true : false}
        autoHideDuration={6000}
        onClose={() => setSbar("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSbar("")}
          severity={"error"}
          sx={{ width: "100%" }}
        >
          {sbar}
        </Alert>
      </Snackbar>
    </Stack>
  ) : data === null ? (
    <></>
  ) : (
    <Stack spacing={2} justifyContent="center" alignItems={"center"}>
      <Box
        // alignItems={"left"}
        width={500}
        // sx={{ background: "blue" }}
      >
        {data.map((ind) => (
          <Stack
            key={ind.fileName}
            justifyContent={"space-between"}
            direction={"row"}
          >
            <Typography>{ind.fileName}</Typography>
            <Button onClick={() => handleClick(ind.fileName)}>Download</Button>
          </Stack>
        ))}
      </Box>
      <Box width={500}>
        {data.map((ind) => (
          <Stack
            key={ind.fileName}
            justifyContent="left"
            // justifyContent={"space-between"}
            direction={"column"}
          >
            <Typography>Name: {ind.name}</Typography>
            <Typography>Email: {ind.email}</Typography>
            <Typography>Number: {ind.number}</Typography>
          </Stack>
        ))}
      </Box>
    </Stack>
  );
}
