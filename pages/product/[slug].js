import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import StarRatingComponent from 'react-star-rating-component';

import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

const BenifitItem = ({benifit}) => {
  const benifitIcon = '✓';
  return (
    <>
    <div style={{borderBottom: '4px solid #999999', width: 300, paddingBottom: 15}}>
      <p style={{display: 'inline-block', paddingRight: 5, width: 150 }}>{benifitIcon} {benifit.name}:</p>  
        <StarRatingComponent 
          name={benifit.name} 
          editing={false}
          renderStarIcon={() => <span style={{fontSize:20}}>★</span>}
          starColor={'#f02d34'}
          emptyStarColor={'#ccc'}
          starCount={5}
          value={benifit.rating}
          style={{paddingTop: 10}}
        />
    </div>
    </> 
  );
};

const ProductDetails = ({ product, products }) => {
  const { image, name, subname, details, benifits, side_effects, suggested_use, price } = product;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  }

  const benifitArray = benifits ? benifits : [];

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            {image && <img src={urlFor(image && image[index])} className="product-detail-image" />}
          </div>
          <div className="small-images-container">
            {image && image.map((item, i) => (
              <img 
                key={i}
                src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name ? name : ''}</h1>
          <h2>{subname ? subname : ''}</h2>
          {/* <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20)
            </p>
          </div> */}
          <p className="price">R{price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div>
          {!!benifitArray.length && <h4 style={{marginTop: '20px'}}>Benifits:</h4>}
            {benifitArray && benifitArray.map((bb) => (
              <BenifitItem benifit={bb}/>)
            )}
          {details && <h4 style={{marginTop: '20px'}}>Details: </h4>}
          <p>{details ? details : ''}</p>
          {suggested_use && <h4 style={{marginTop: '20px'}}>Suggested Use: </h4>}
          <p>{suggested_use ? suggested_use : ''}</p>
          {side_effects && <h4 style={{marginTop: '20px'}}>Side Effects: </h4>}
          <p>{side_effects ? side_effects : ''}</p>
        </div>
      </div>

      <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          {/* <div className=""> */}
            <div className="maylike-products-container">
              {products && products.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
          {/* </div> */}
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: { 
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params: { slug }}) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"][0..10]'
  
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  const brandQuery = `*[_type == 'brand']{title, "slug": slug.current}`;
  const brandData = await client.fetch(brandQuery);

  const categoryQuery = `*[_type == 'category']{title, "slug": slug.current}`;
  const categoryData = await client.fetch(categoryQuery);

  return {
    props: { products, product, brandData, categoryData }
  }
}

export default ProductDetails