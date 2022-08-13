import React from 'react';

import { client } from '../../lib/client';
import { Product, FooterBanner, HeroBanner } from '../../components';

function Brand({products}) {
  return (
    <>
    <div className="products-container">
      {products?.map((product) => <Product key={product._id} product={product} />)}
    </div>
    </>
  )
}

export default Brand

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
  
  export const getStaticProps = async (context) => {
    const { slug = "" } = context.params
    const productsQuery = `*[_type == "product" && $slug in brand[]->slug.current] 
    {
      "brand": brand[]->{title, slug}, 
      "category": category[]->{title, slug},
      image, name, slug, price, _id
    }
    `;
    const products = await client.fetch(productsQuery, { slug });
    console.log({products});
    return {
      props: { products }
    }
  }