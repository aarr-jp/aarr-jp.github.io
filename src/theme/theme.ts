"use client";

import { blue } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: "var(--primaryFont)",
    fontSize: 15,
  },
  defaultColorScheme: "dark",
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: blue[200],
        },
      },
    },
    light: false,
  },
});