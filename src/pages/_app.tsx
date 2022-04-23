import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { FC } from 'react';
import GlobalStyle from '../styles/global';
import { ApolloProvider } from '@apollo/client';
import client from "../apollo-client";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <ThemeProvider theme={{}}>
    <GlobalStyle />
      <ApolloProvider client={client} >
          <Component {...pageProps} />
      </ApolloProvider>
  </ThemeProvider>
);
export default MyApp;
