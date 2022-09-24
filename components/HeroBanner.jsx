import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { urlFor } from '../lib/client';
import headerImage from '../assets/abn-header.png';
import mobileHeaderImage from '../assets/abn-header-mobile.png';

const HeroBanner = ({ heroBanner }) => {
  
  const hasWindow = typeof window !== 'undefined';

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow]);
  return (
    <div className="hero-banner-container">
      <Image layout='responsive' width={1920} height={489} src={headerImage}  alt="header" className="hero-banner-image" />
    </div>
  )
}

export default HeroBanner