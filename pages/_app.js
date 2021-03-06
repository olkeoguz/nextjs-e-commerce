import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from '../components/UI/Layout/Layout';

import { Provider } from 'react-redux';
import { useStore } from '../store';

import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';


function MyApp(props) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { Component, pageProps } = props;

  const store = useStore(pageProps.initialReduxState);

  // Create a theme instance.
 const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: isDarkMode ? 'black' : '#f4f4f4',
    },
  },
});

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <title>My page</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Provider store={store}>
          <Layout isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </ThemeProvider>
    </Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
