import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "vicky.900",
        color: "vicky.100",
      },
    },
  },
  colors: {
    vicky: {
      100: "#f7f8f7",
      300: "#31632b",
      400: "#315c2b",
      500: "#df4a2b",
      600: "#d0532b",
      900: "#242038",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
