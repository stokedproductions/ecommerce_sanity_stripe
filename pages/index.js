import React from 'react';

import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';

const Home = ({ bannerData, products }) => (
  <div>
    {/* <HeroBanner heroBanner={bannerData.length && bannerData[0]}  /> */}
    <div className="products-heading">
      <h2>Best Selling Products</h2>
    </div>

    <div className="products-container">
      {products && products?.map((product) => <Product key={product._id} product={product} />)}
    </div>

    <FooterBanner footerBanner={bannerData.length && bannerData[0]} />
  </div>
);

export const getServerSideProps = async () => {
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);
  const brandQuery = `*[_type == 'brand']{title, "slug": slug.current}`;
  const brandData = await client.fetch(brandQuery);
  const categoryQuery = `*[_type == 'category']{title, "slug": slug.current}`;
  const categoryData = await client.fetch(categoryQuery);
  const productQuery = `*[_type == "product"]{
    "brand": brand[]->{title, slug}, 
    "category": category[]->{title, slug},
    image, name, slug, price, _id
  }`;
  const products = await client.fetch(productQuery);
  return {
    props: { bannerData, brandData, categoryData, products }
  }
}

export default Home;
