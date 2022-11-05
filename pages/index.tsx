import solarImage1 from "../public/solar-panel-1.jpg";
import Image from "next/image";
import { Stack, Typography } from "@mui/material";

export default function Home() {
  return (
    <Stack
      width={"100%"}
      justifyContent="center"
      alignItems={"center"}
      spacing="10px"
    >
      <Image
        src={solarImage1}
        alt="Solar Panel Image"
        width={500}
        height={400}
      />
      <Typography>Sonnesburg Fields</Typography>
      <Stack
        direction={"row"}
        spacing={40}
        justifyContent="center"
        alignItems={"center"}
      >
        <Stack>
          <ul>
            <li>Item 1</li>
            <li>Item 1</li>
            <li>Item 1</li>
            <li>Item 1</li>
            <li>Item 1</li>
          </ul>
        </Stack>
        <Image
          src={solarImage1}
          alt="Solar Panel Image"
          width={500}
          height={400}
        />
      </Stack>
    </Stack>
  );
}
