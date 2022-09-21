import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';
import { useStateContext } from '../context/StateContext';
import StarRatingComponent from 'react-star-rating-component';

import Image from 'next/image';
import Logo from '../assets/abLogo.png';
// import kk from '../assets/abLogo.png';

const Product = ({ product }) => {
  const { image, name, slug, price, brand, category } = product;
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();
  const LogoSRC = image ? urlFor(image && image[0]) : Logo.src;

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
    // a comment to trigger redeploy
  }

  return (
    <div>
        <div className="product-card">
        <Link href={`/product/${slug.current}`}>
          <div style={{minHeight: 370}}>
            <img  src={LogoSRC}
              width={280}
              height={280}
              className="product-image"
            />
            <p className="product-name">{name ? name : ''}</p>
            <p className="product-price">R{price ? price : ''}</p>
          </div>
        </Link>
          <div className="small-buttons">
            <button type="button" className="small-add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
            <button type="button" className="small-buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
    </div>
  )
}

export default Product