import React from 'react';
import { Toaster } from 'react-hot-toast';

import { Layout } from '../components';
import '../styles/globals.css';
import '../styles/navigation.css';
import { StateContext } from '../context/StateContext';

function MyApp({ Component, pageProps, prop1, prop2 }) {
  console.log({prop1, prop2})
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

export default MyApp
