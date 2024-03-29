import * as React from "react";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "../styles/theme";
import "../styles/globals.css";


function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <ChakraProvider theme={customTheme}>
                <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;
