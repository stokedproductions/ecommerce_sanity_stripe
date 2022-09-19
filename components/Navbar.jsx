import React, {useState} from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'

import { Cart } from './';
import { useStateContext} from '../context/StateContext';

import Logo from '../assets/abLogo.png';
import Image from 'next/image';

// import '../styles/navigation.module.css';

const Navbar = () => {
  const { brands, categories, showCart, setShowCart, totalQuantities } = useStateContext();
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  return (
    <nav className="navigation">
      <a href="/" className="brand-name">
      <Link href="/"><Image src={Logo} width={100} height={75} /></Link>
      </a>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        {/* icon from Heroicons.com */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <ul>
          <li><a href='\'>Home</a></li>
          {brands && (brands.map(brand => (
                 <li key={brand._id}><a href={`/brand/${brand.slug}`}>{brand.title}</a></li>
               )))}
          {/* <li><a href="#">Brands</a>
             <ul className="dropdown" aria-label="submenu">
               {brands && (brands.map(brand => (
                 <li key={brand._id}><a href={`/brand/${brand.slug}`}>{brand.title}</a></li>
               )))}
             </ul>
           </li> */}
           {categories && (categories.map(category => (
                <li key={category._id}><a href={`/category/${category.slug}`}>{category.title}</a></li>
              )))}
           {/* <li><a href="#">Categories</a>
            <ul className="dropdown" aria-label="submenu">
              {categories && (categories.map(category => (
                <li key={category._id}><a href={`/category/${category.slug}`}>{category.title}</a></li>
              )))}
            </ul>
          </li> */}
        </ul>
      </div>
      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </nav>
  );
  // return (
  //   <div className="navbar-container">
  //     <p className="logo">
  //       <Link href="/"><Image src={Logo} width={100} height={75} /></Link>
  //     </p>

  //     <nav role="navigation">
  //       <ul>
  //         <li><a href='\'>Home</a></li>
  //         <li><a href="#">Brands</a>
  //           <ul className="dropdown" aria-label="submenu">
  //             {brands && (brands.map(brand => (
  //               <li key={brand._id}><a href={`/brand/${brand.slug}`}>{brand.title}</a></li>
  //             )))}
  //           </ul>
  //         </li>
          // <li><a href="#">Categories</a>
          //   <ul className="dropdown" aria-label="submenu">
          //     {categories && (categories.map(category => (
          //       <li key={category._id}><a href={`/category/${category.slug}`}>{category.title}</a></li>
          //     )))}
          //   </ul>
          // </li>
  //       </ul>
  //     </nav>

      // <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
      //   <AiOutlineShopping />
      //   <span className="cart-item-qty">{totalQuantities}</span>
      // </button>

      // {showCart && <Cart />}
  //   </div>
  // )
}

export default Navbar