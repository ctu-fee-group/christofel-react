import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { FC } from 'react';
import GlobalStyle from '../styles/global';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <ThemeProvider theme={{}}>
    <GlobalStyle />
    <Component {...pageProps} />
  </ThemeProvider>
);
export default MyApp;
