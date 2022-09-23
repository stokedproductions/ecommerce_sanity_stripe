import React from 'react';
import Link from 'next/link';

import { client, urlFor } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';

const CategoryCard = ({category}) => {
  const {products, imageWide } = category;
  const catImageUrl = imageWide ? urlFor(imageWide).url() : undefined;
  return (
    <>
    <div className="products-heading">
      <h2>{ category.title}</h2>
    </div>

    <div className="products-container">
      {products && products.map((product) => <Product key={product._id} product={product} />)}
    </div>

    <Link href={`/category/${category.slug.current}`}>
      <div className="see-more-button">
        <p>See All {category.title}</p>
      </div>
    </Link>
    </>
  );
}

const Home = ({products, productsByCategory}) => {
  // const products = props.products;
  // const productsByCategory = props.productByCatergory;

  return (
  <div>
    <div className="products-heading">
      <h2>Best Selling Products</h2>
    </div>

    <div className="products-container">
      {products && products?.map((product) => <Product key={product._id} product={product} />)}
    </div>

    {productsByCategory && productsByCategory.map(pc => <CategoryCard key={pc._id} category={pc}/>)}



    {/* <FooterBanner footerBanner={bannerData.length && bannerData[0]} /> */}
  </div>
  )
};

export const getServerSideProps = async ({req}) => {
  const productQuery = `*[_type == "product"  && bestSelling==true]{
    "brand": brand[]->{title, slug}, 
    "category": category[]->{title, slug},
    image, name, slug, price, _id
  }`;
    const products = await client.fetch(productQuery);
    

     const productsByCategoryQuery = `*[_type == 'category']{
      _id,
      _type,
      slug,
      title,
      imageSquare,
      imageWide,
      "products" : *[_type == 'product' && references(^._id)][0...4]{
                "brand": brand[]->{title, slug}, 
                "category": category[]->{title, slug},
                image, name, slug, price, _id
              }
    }`
    const productsByCategory = await client.fetch(productsByCategoryQuery);
  return {
    props: { products, productsByCategory }
  }
}

export default Home;
