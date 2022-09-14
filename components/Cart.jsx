import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import ReactWhatsapp from 'react-whatsapp';
import Logo from '../assets/abLogo.png';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';

const Cart = () => {
  const shipping = 100;
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove } = useStateContext();

  const [orderMessage, setOrderMessage] = useState();

  useEffect(() => {
    const setUpOrderMessage = () => {
      if (cartItems) {
        let itemsString = '';
        cartItems.map(item => {
          itemsString += `${item.quantity} x ${item.name} - R${item.price} = R${item.price*item.quantity}\n`
        });
        let messageStr = 'Hi, \nI would like to order: \n';
        messageStr += `${itemsString}`;
        messageStr += `Subtotal: R${totalPrice}.00 \n`; 
        messageStr += `Shipping: R${shipping}.00 \n`;
        messageStr += `------------------------------\n`;
        messageStr += `Grand Total: R${totalPrice + shipping}.00 \n`;
        messageStr += `------------------------------\n`;
        setOrderMessage(messageStr);
      }
    }
    setUpOrderMessage();
  })

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });

    if(response.statusCode === 500) return;
    
    const data = await response.json();

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });
  }

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
        type="button"
        className="cart-heading"
        onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className="product" key={item._id}>
              {item.image && <img src={urlFor(item.image[0])} className="cart-product-image" />}
              {!item.image && <img src={Logo.src} className="cart-product-image" />}
              <div className="item-desc">
                <div className="flex top">
                  <h5 className="cartItemName">{item.name}</h5>
                  <h5>R{item.price}</h5>
                </div>
                <div className="flex bottom">
                  <div>
                  <p className="quantity-desc">
                    <span className="minus" onClick={() => toggleCartItemQuanitity(item._id, 'dec') }>
                    <AiOutlineMinus />
                    </span>
                    <span className="num" onClick="">{item.quantity}</span>
                    <span className="plus" onClick={() => toggleCartItemQuanitity(item._id, 'inc') }><AiOutlinePlus /></span>
                  </p>
                  </div>
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal: R{totalPrice}</h3>
              <h3>Shipping: R{shipping}</h3>
              <h3>Total: R{totalPrice+shipping}</h3>
              <h3></h3>
            </div>
            <div className="checkoutNote">
              <p>
                You will redirect to WhatsApp to complete your order.
              </p>
              <p> 
                Please send the automatically populated message
                for your order to be submitted.
              </p>
            </div>
            <div className="btn-container">
              <ReactWhatsapp number="+27670338569" message={orderMessage} className="btn">
                  Complete Order on WhatsApp
              </ReactWhatsapp>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart