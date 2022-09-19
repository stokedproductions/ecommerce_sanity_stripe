import React from 'react';
import Head from 'next/head';

import Navbar from './Navbar';
import Footer from './Footer';
import HeroBanner from './HeroBanner';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Anabolic Nation</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <HeroBanner />
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout