"use client";

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class",
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
    dark: true,
    light: true,
  },
});