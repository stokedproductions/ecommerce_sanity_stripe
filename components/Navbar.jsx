import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'

import { Cart } from './';
import { useStateContext} from '../context/StateContext';

import Logo from '../assets/abLogo.png';
import Image from 'next/image';

const Navbar = () => {
  const { brands, categories, showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/"><Image src={Logo} width={100} height={75} /></Link>
      </p>

      <nav role="navigation">
        <ul>
          <li><a href='\'>Home</a></li>
          <li><a href="#">Brands</a>
            <ul className="dropdown" aria-label="submenu">
              {brands && (brands.map(brand => (
                <li key={brand._id}><a href={`/brand/${brand.slug}`}>{brand.title}</a></li>
              )))}
            </ul>
          </li>
          <li><a href="#">Categories</a>
            <ul className="dropdown" aria-label="submenu">
              {categories && (categories.map(category => (
                <li key={category._id}><a href={`/category/${category.slug}`}>{category.title}</a></li>
              )))}
            </ul>
          </li>
        </ul>
      </nav>

      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar