import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { urlFor } from '../lib/client';
import headerImage from '../assets/abn-header.png';

const HeroBanner = ({ heroBanner }) => {
  // if (!heroBanner) return ('');
  return (
    <div className="hero-banner-container">
      <Image src={headerImage}  alt="header" className="hero-banner-image" />
    </div>
  )
}

export default HeroBanner