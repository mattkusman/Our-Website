import { AppBar, Box, Button, Divider } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import Image from "next/image";
import soleZoneSolisLogo from "../../public/sole-zone-solis-logo.png";
import vitaVeheculumLogo from "../../public/vita-veheculum-logo.png";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({ children }: { children: React.ReactElement }) {
  const pages = [
    { display: "Contact Us", link: "contact-us" },
    { display: "Manufacturing", link: "manufacturing" },
    { display: "Solar Generation", link: "solar-generation" },
    { display: "Login", link: "login" },
  ];

  const router = useRouter();
  return (
    <>
      <AppBar position="static" sx={{ background: "gray" }}>
        <Stack direction={"row"} justifyContent="space-around" margin={"5px"}>
          <Button
            sx={{ color: "white" }}
            onClick={() => router.push("/")}
            fullWidth
          >
            <Image
              src={soleZoneSolisLogo}
              alt="Sole Zone Solis logo"
              width={80}
              height={80}
            />
          </Button>
          {pages.map((page) => (
            <Button
              variant="text"
              key={page.display}
              sx={{ color: "white" }}
              fullWidth
              onClick={() => router.push(page.link)}
              // href={page.link}
            >
              {page.display}
            </Button>
          ))}
        </Stack>
      </AppBar>
      <Box sx={{ margin: "20px" }} minHeight="calc(100vh - 230px)">
        {children}
      </Box>
      <Stack
        direction={"row"}
        divider={<Divider orientation="vertical" flexItem />}
        sx={{ background: "#2a2b2b" }}
      >
        <Button sx={{ color: "white" }} fullWidth>
          <Image
            src={vitaVeheculumLogo}
            alt="Vita Veheculum logo"
            width={80}
            height={80}
          />
        </Button>
        <Button variant="text" sx={{ color: "white" }} fullWidth>
          Subscribe to newsletter
        </Button>
        <Stack width="100%" alignItems={"center"} justifyContent="center">
          <Link href={"/contact-us"}>Contact Us</Link>
          <Link href={"/manufacturing"}>Manufacturing</Link>
          <Link href={"/solar-generation"}>Solar Generation</Link>
        </Stack>
      </Stack>
    </>
  );
}
