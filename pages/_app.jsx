import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ModalProvider } from "../component/modal"
import { SnackbarProvider } from "../component/snackbar"
import { LoaderProvider } from "../component/loader"
import { configConstants } from '../config/_constants';
import theme from '../component/layout/theme'
import { ThemeProvider } from '@material-ui/core/styles';
import { firebaseCloudMessaging } from '../utils/webPush'
import 'firebase/messaging'
import firebase from 'firebase/app'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import '../styles/index.scss'

import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
// import { withSSR } from 'react-i18next';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const MySwal = withReactContent(Swal)

const MyApp = (props) => {
  const { Component, pageProps } = props;
  const router = useRouter()
  const { locale } = router

  React.useEffect(() => {
    if (process.env.FIREBASE_NOTIFICATION) {
      setToken()
    }
  })

  const setToken = async () => {
    try {
      const token = await firebaseCloudMessaging.init()
      if (token) {
        const messaging = firebase.messaging()
        messaging.onMessage((message) => {
          MySwal.fire({
            title: message.notification.title,
            text: message.notification.body,
          })
        })
      }
    } catch (error) {
      console.log(error)
    }
  }


  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  if (configConstants.RTL_LANG && configConstants.RTL_LANG.includes(locale)) {
    theme.direction = 'rtl'
  }
  i18n.changeLanguage(locale)

  return (
    <React.Fragment>
      <I18nextProvider i18n={ i18n }>
      <Head>
        <title>{configConstants.APP_NAME}</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <StylesProvider jss={jss}>
          <CssBaseline />
          <ModalProvider defaultOptions={{ fullWidth: true, fullScreen: false }}>
            <SnackbarProvider>
              <LoaderProvider>
                <Component {...pageProps} />
              </LoaderProvider>
            </SnackbarProvider>
          </ModalProvider>
        </StylesProvider>
      </ThemeProvider>
      </I18nextProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default (MyApp);