import solarImage1 from "../public/solar-panel-1.jpg";
import Image from "next/image";
import { Box, Stack, Typography } from "@mui/material";

export default function SolarGeneration() {
  return (
    <Box width={"100%"} height={"100%"}>
      <Typography>Solar Generation</Typography>
      <Typography>
        We are proud of being the newest addition to the Vita Veheculum family
        and support their manufacturing capabilities with over 15 acres of solar
        farms throughout the country. Currently our largest farm, Sonneburg
        Fields, has capabilities of generation approximately 14000 kW/h of
        electricity. Our mission has always been clean energy and our solar
        generation efforts are our star in that. Please reach out via the
        Contact Us page for more information regarding commercial utlization.
      </Typography>
    </Box>
  );
}
