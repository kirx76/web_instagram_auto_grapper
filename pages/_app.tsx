import "../styles/globals.css";
import type { AppProps } from "next/app";
import RootStore from "../stores/RootStore";
import { Provider } from "mobx-react";
import { createTheme } from "@mui/material";

function MyApp({ Component, pageProps }: AppProps) {
  const rootStore = new RootStore(undefined);
  createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 500,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  return (
    <Provider {...rootStore}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
