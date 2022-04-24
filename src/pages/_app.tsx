import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { FC } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from "../apollo-client";
import GlobalStyle from '../styles/global';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <ThemeProvider theme={{}}>
    <GlobalStyle />
      <ApolloProvider client={client} >
          <Component {...pageProps} />
      </ApolloProvider>
  </ThemeProvider>
);
export default MyApp;
