import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useDevice } from 'react-use-device/dist';
import { urlFor } from '../lib/client';
import headerImage from '../assets/abn-header.png';
import mobileHeaderImage from '../assets/abn-header-mobile.png';

const HeroBanner = ({ heroBanner }) => {
    
  const { isMOBILE, isTABLET, isLAPTOP, isDESKTOP } = useDevice();
  return (
    <div className="hero-banner-container">
      {isDESKTOP && <Image layout='responsive' src={headerImage }   alt="header" className="hero-banner-image" />}
      {isLAPTOP  && <Image layout='responsive' src={headerImage }   alt="header" className="hero-banner-image" />}
      {isTABLET && <Image layout="responsive" src={mobileHeaderImage}  alt="header" className="hero-banner-image" />}
      {isMOBILE && <Image layout="responsive" src={mobileHeaderImage}  alt="header" className="hero-banner-image" />}
    </div>
  )
}

export default HeroBanner

// Notes

// {
//   isMOBILE: device === isMOBILE,   // up to winndow.innerWidth of 768px
//   isTABLET: device === isTABLET,   // up to winndow.innerWidth of 992px
//   isLAPTOP: device === isLAPTOP,   // up to winndow.innerWidth of 1170
//   isDESKTOP: device === isDESKTOP  // from window.innerWidth of 1170 up
// };