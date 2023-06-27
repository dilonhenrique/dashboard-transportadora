import '@/styles/globals.css';
import '@/styles/nprogress.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/styles/theme';
import type { AppProps } from 'next/app';
import Navbar from '@/components/patterns/Navbar';
import NProgress from 'nprogress';
import { Router } from 'next/router';
import { useEffect } from 'react';
import AddItem from '@/components/patterns/AddItem';
import { SnackbarProvider } from 'notistack';

export default function App({ Component, pageProps }: AppProps) {

  //LOADER SHOWS UP WHEN THE ROUTER OF NEXT ACTIVATE
  NProgress.configure({ showSpinner: false });
  useEffect(() => {
    Router.events.on("routeChangeStart", () => NProgress.start());
    Router.events.on("routeChangeComplete", () => NProgress.done());
    Router.events.on("routeChangeError", () => NProgress.done());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider autoHideDuration={6000} anchorOrigin={{ horizontal: 'left', vertical: 'top' }}>
        <Navbar />
        <Component {...pageProps} />
        <AddItem />
      </SnackbarProvider>
    </ThemeProvider>
  )
}
