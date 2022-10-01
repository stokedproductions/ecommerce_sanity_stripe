import React, {useEffect, useState, useRef} from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

import { Cart } from './';
import { useStateContext} from '../context/StateContext';

import Logo from '../assets/abLogo.png';
import Image from 'next/image';

const Navbar = () => {
  const { brands, categories, showCart, setShowCart, totalQuantities } = useStateContext();
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isSubMenuOneExpanded, setIsSubMenuOneExpanded] = useState(false);
  const [isSubMenuTwoExpanded, setIsSubMenuTwoExpanded] = useState(false);

  function useOutsideAlerter(submenuOneRef, submenuTwoRef) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (submenuOneRef.current && !submenuOneRef.current.contains(event.target)) {
          setIsSubMenuOneExpanded(false);
        }
        if (submenuTwoRef.current && !submenuTwoRef.current.contains(event.target)) {
          setIsSubMenuTwoExpanded(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [submenuOneRef, submenuTwoRef]);
  }

  const submenuOneRef = useRef(null);
  const submenuTwoRef = useRef(null);
  useOutsideAlerter(submenuOneRef, submenuTwoRef);

  return (
    <>
      <nav>
      
        <ul className={isNavExpanded ? "menu active" : "menu"}>
        <li className="logo"><a href="/"><Image src={Logo} width={100} height={75} /></a></li>
            <li className="item"><a href="/">Home</a></li>
            {/* <li className="item"><a href="#">Brands</a></li> */}
            <li className="item has-submenu" ref={submenuOneRef}>
                <a tabIndex="0" onClick={() => setIsSubMenuOneExpanded(!isSubMenuOneExpanded)}>
                  Available Labs {isSubMenuOneExpanded ? <FontAwesomeIcon style={{ paddingLeft: 5}} icon={faChevronUp} /> : <FontAwesomeIcon style={{ paddingLeft: 5}} icon={faChevronDown} />}</a>
                <ul className={isSubMenuOneExpanded ? "submenu-active" : "submenu"}>
                  {brands && (brands.map(brand => (
                    <li key={brand._id} className="subitem"><a href={`/brand/${brand.slug}`}>{brand.title}</a></li>
                  )))}
                </ul>
            </li>
            <li className="item has-submenu" ref={submenuTwoRef}>
                <a tabIndex="0" onClick={() => setIsSubMenuTwoExpanded(!isSubMenuTwoExpanded)}>Categories <FontAwesomeIcon icon={faChevronDown} /></a>
                <ul className={isSubMenuTwoExpanded ? "submenu-active" : "submenu"}>
                  {categories && (categories.map(category => (
                    <li key={category._id} className="subitem"><a href={`/category/${category.slug}`}>{category.title}</a></li>
                  )))}
                </ul>
            </li>
            <li className="toggle" onClick={() => {setIsNavExpanded(!isNavExpanded);}}>
              <a href="#">{isNavExpanded ? <FontAwesomeIcon icon={faTimes}/> : <FontAwesomeIcon icon={faBars}/>}</a>
            </li>
            <li className="cartButton">
              <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
                <AiOutlineShopping />
                <span className="cart-item-qty">{totalQuantities}</span>  
              </button>
            </li>

       {showCart && <Cart />}
        </ul>
      </nav>
      {/* <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
         <AiOutlineShopping />
         <span className="cart-item-qty">{totalQuantities}</span>
       </button>

       {showCart && <Cart />} */}
    </>
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

  // <nav className="navigation">
  //     <a href="/" className="brand-name">
  //     {/* <Link href="/"> */}
  //       <Image src={Logo} width={100} height={75} />
  //       {/* </Link> */}
  //     </a>
  //     <button
  //       className="hamburger"
  //       onClick={() => {
  //         setIsNavExpanded(!isNavExpanded);
  //       }}
  //     >
  //       {/* icon from Heroicons.com */}
  //       <svg
  //         xmlns="http://www.w3.org/2000/svg"
  //         className="h-5 w-5"
  //         viewBox="0 0 20 20"
  //         fill="white"
  //       >
  //         <path
  //           fillRule="evenodd"
  //           d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
  //           clipRule="evenodd"
  //         />
  //       </svg>
  //     </button>
  //     <div
  //       className={
  //         isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
  //       }
  //     >
  //       <ul>
  //         <li><a href='\'>Home</a></li>
  //         {/* {brands && (brands.map(brand => (
  //                <li key={brand._id}><a href={`/brand/${brand.slug}`}>{brand.title}</a></li>
  //              )))} */}
  //         <li><a href="#">Brands</a>
  //            <ul className="dropdown" aria-label="submenu">
  //              {brands && (brands.map(brand => (
  //                <li key={brand._id}><a href={`/brand/${brand.slug}`}>{brand.title}</a></li>
  //              )))}
  //            </ul>
  //          </li>
  //          {categories && (categories.map(category => (
  //               <li key={category._id}><a href={`/category/${category.slug}`}>{category.title}</a></li>
  //             )))}
  //          <li><a href="#">Categories</a>
  //           <ul className="dropdown" aria-label="submenu">
  //             {categories && (categories.map(category => (
  //               <li key={category._id}><a href={`/category/${category.slug}`}>{category.title}</a></li>
  //             )))}
  //           </ul>
  //         </li>
  //       </ul>
  //     </div>
  //     <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
  //       <AiOutlineShopping />
  //       <span className="cart-item-qty">{totalQuantities}</span>
  //     </button>
}

export default Navbar