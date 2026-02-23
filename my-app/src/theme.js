import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            background: {
              default: "#0f172a",
              paper: "#020617",
            },
            text: {
              primary: "#e5e7eb",
              secondary: "#9ca3af",
            },
          }
        : {
            background: {
              default: "#f9fafb",
              paper: "#ffffff",
            },
          }),
    },
    typography: {
      fontFamily: "Inter, sans-serif",
    },
  });
