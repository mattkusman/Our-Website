import solarImage1 from "../public/solar-panel-1.jpg";
import Image from "next/image";
import { Box, Stack, Typography } from "@mui/material";

export default function Manufacturing() {
  return (
    <Box width={"100%"} height={"100%"}>
      <Typography>Manufacturing</Typography>
      <Typography>
        Being part of the Vita Veheculum family means that we support the
        manufacturing of electric vehicles (EV). Utilizing our solar generation,
        Vita Veheculum has built a new electric vehicle manufacturing complex
        right here at Sonneberg Fields. It provides the capability of building
        EV in a plant run completely off solar! It is much more efficient than
        any of our competitors! Please reach out via the Contact Us page for
        more information regarding our EV manufacturing.
      </Typography>
    </Box>
  );
}
