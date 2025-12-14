import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb", // blue-600
    },
    secondary: {
      main: "#64748b", // slate
    },
    background: {
      default: "#f8fafc",
    },
  },
  shape: {
    borderRadius: 10,
  },
});
