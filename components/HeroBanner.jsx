import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { urlFor } from '../lib/client';
import headerImage from '../assets/abn-header.png'
console.log(headerImage)

const HeroBanner = ({ heroBanner }) => {
  // if (!heroBanner) return ('');
  return (
    <div className="hero-banner-container">
      <Image src={headerImage}  alt="header" className="hero-banner-image" />
      {/* <Image src={headerImage} width={100} height={75} /> */}
    </div>
  )
}

export default HeroBanner