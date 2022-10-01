import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { urlFor } from '../lib/client';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import FastDelieveryImage from '../assets/FAST-DELIVERY.png'

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 6
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6
  },
  tablet: {
    breakpoint: { max: 1023, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 463, min: 0 },
    items: 3
  }
};


import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';

const CategoryCard = ({category}) => {
  const {products, imageWide } = category;
  const catImageUrl = imageWide ? urlFor(imageWide).url() : undefined;
  return (
    <div>
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
    </div>
  );
}

const Home = ({products, productsByCategory, brandData}) => {

  console.log(brandData)

  return (
  <div>
      <div style={{margin: '70px auto 0', display: 'flex', justifyContent: 'center'}}>
        <Image src={FastDelieveryImage} width={900} height={400}  />
      </div>


      <div className="products-heading first-product-headering">
      <h2>Our Amazing Brands</h2>
      </div>
      <div style={{marginTop: 60}}>  
        <Carousel 
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={2500}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={1000}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          // deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
            {brandData.map(brand => {
              console.log(brand)
              return (
              brand.image &&  
                <div key={brand._id}>
                  <Link  href={`/brand/${brand.slug}`}>
                    <img 
                      width={200}
                      height={200}
                      className="product-image"
                      src={brand.image ? urlFor(brand.image).url() : ''} />
                  </Link>
                </div>
              )
            })} 
        </Carousel>       
      </div>

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
    

     const productsByCategoryQuery = `*[_type == 'category']| order(displayOrder asc){
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

    const brandQuery = `*[_type == 'brand']{title, "slug": slug.current, _id, image}`;
    const brandData = await client.fetch(brandQuery);

  return {
    props: { products, productsByCategory, brandData }
  }
}

export default Home;
