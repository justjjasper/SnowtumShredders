'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import './Cart.css'
import { circleMinusSVG, circlePlusSVG } from '@/app/Misc/Icons';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/store';
import { addToCart, removeItemFromCart } from '@/app/redux/features/cart-slice';

interface CartProps {
  cartHovered: boolean;
  onMouseLeave: () => void;
  cartItems: CartItemType[]
}

export default function Cart({cartHovered, onMouseLeave, cartItems}: CartProps) {
  const dispatch = useDispatch<AppDispatch>()

  // Retrieve existing cart items from local Storage
  const cartString = localStorage.getItem('cart')
  const existingCart = cartString ? JSON.parse(cartString) : []

  const handleMinusButton = (cartItem: CartItemType) => {
    dispatch(removeItemFromCart(cartItem))

    const itemIndex = existingCart.findIndex((item: CartItemType) => item.id === cartItem.id && item.size === cartItem.size)

    if (itemIndex !== -1) {
      // Check if the item exists before updating
      if (existingCart[itemIndex].quantity > 1) {
        existingCart[itemIndex].quantity -= 1;
      } else {
        // If quantity is 1, remove the item from the cart
        existingCart.splice(itemIndex, 1);
      }
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart))
  }

  const handlePlusButton = (cartItem: CartItemType) => {
    dispatch(addToCart(cartItem))

    // Check if the item is already in the cart
    const existingCartItemIndex = existingCart.findIndex(
      (item: CartItemType) => item.id === cartItem.id && item.size === cartItem.size
    );

    // Update the quantity
    existingCart[existingCartItemIndex].quantity += 1;

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart))
  }

  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    // Get the height of the physical-navbar
    const navbarElement = document.querySelector('.physical-navbar') as HTMLElement;
    if (navbarElement) {
      setNavbarHeight(navbarElement.offsetHeight);
    }
  }, []);

    // Function to calculate the grand total
  const calculateGrandTotal = () => {
    let grandTotal = 0;

    // Iterate through cartItems and sum up the total quantity for each item
    cartItems.forEach((item) => {
      grandTotal += Number(item.price)
    });

    return grandTotal;
  };

  return (
    <div className={`cart-container px-[120px] overflow-scroll
      ${cartHovered ? 'flex' : 'hidden'}`}
      onMouseLeave={onMouseLeave}
      style={{ maxHeight: `calc(100vh - ${navbarHeight}px)` }}
      >
      <form className='cart-form  block w-full'>
        <div className='cart-container max-w-[1428px] mx-auto w-full relative'>
          { cartItems.length === 0 && <span className='msg-empty-cart block py-[100px] text-center w-full'>CART EMPTY</span> }
          <div id='cart-info-hidden invisible opacity-0 h-0' data-id='id + size' data-limit='sku'>
            {cartItems.map((item, i:number) => {
              return (
                <span key={i} data-id={item.id + (item.size ? item.size : '')} data-limit={item.sku}></span>
              )
            })}
          </div>
          <div id='cart-info'>
            {/* //? This is going to be Dyanmic for each item added to cart */}
            {cartItems.map((item, i) => {
              const formattedName = item.name.replace(/\s+/g, '-').toLowerCase()
              const totalItemPrice = item.quantity * Number(item.price)
              return (
                <div className='cart-item' data-id={item.id + (item.size ? item.size : '')} key={i} data-limit={item.sku}>
                  {/* //! Need to add padding at bottom of last div item before summary checkout div */}
                  <div className='cart-item-container p-[35px]'>
                    <Link href={`/products/${item.productType}/${formattedName}`}className='cart-item-image' onClick={onMouseLeave}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        height={100}
                        width={100}
                      />
                    </Link>
                    <div className='cart-item-info self-center'>
                      <span className='text-xs'>{item.name} - {item.size}</span>
                    </div>
                    <div className='cart-item-quantity flex self-center justify-center text-sm gap-[20px]'>
                      <button className='cart-item-quantity-btn-minus'
                      data-id={item.id + (item.size ? item.size : '')}
                      type='button'
                      onClick={() => handleMinusButton(item)}
                      >
                        {circleMinusSVG}
                      </button>
                        <span className='cart-item-quantity-tot'>{item.quantity}</span>
                      <button className={`cart-item-quantity-btn-plus ${item.sku === item.quantity ? 'opacity-40' : ''}`}
                      data-id={item.id + (item.size ? item.size : '')}
                      type='button'
                      disabled={item.sku === item.quantity}
                      onClick={() => handlePlusButton(item)}>
                        {circlePlusSVG}
                      </button>
                    </div>
                    <span className='cart-item-price self-center text-right text-sm'>${totalItemPrice}</span>
                  </div>
                  <div className='cart-line h-[1px] bg-primary'></div>
                </div>
              )
            })}
          </div>
          { cartItems.length !== 0 && <div className='cart-summary sticky bottom-0 flex flex-col pb-[40px] mt-[40px] w-full items-end text-secondary'>
            <span className='uppercase'>total <b>${calculateGrandTotal()}</b></span>
            <input className='cart-submit' type='button' name='checkout' value='CHECKOUT'/>
          </div> }
        </div>
      </form>
    </div>
  )
}