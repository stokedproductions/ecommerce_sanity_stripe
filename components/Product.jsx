import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';
import { useStateContext } from '../context/StateContext';

const Product = ({ product }) => {
  const { image, name, slug, price, brand, category } = product;
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
    // a comment to trigger redeploy
  }

  return (
    <div>
        <div className="product-card">
        <Link href={`/product/${slug.current}`}>
          <div>
            <img 
              src={urlFor(image && image[0])}
              width={250}
              height={250}
              className="product-image"
            />
            <p className="product-name">{name}</p>
            <p className="product-price">R{price}</p>
          </div>
        </Link>
          <div className="buttons">
            <button type="button" className="small-add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
            <button type="button" className="small-buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
    </div>
  )
}

export default Product