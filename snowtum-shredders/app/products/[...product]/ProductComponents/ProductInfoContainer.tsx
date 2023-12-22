'use client'
// TODO Implement useDispatch, send product id, name, price, value(item.size), item.sku for purchasing/data cap
import { useContext, useState } from 'react'
import { ProductContext } from './ContentContainer'
import { cartSVG } from '@/app/Misc/Icons'
import { throttle } from '@/app/Misc/HelperFunc'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/app/redux/store'
import { addToCart } from '@/app/redux/features/cart-slice'
import { sortMetaData } from '@/app/Misc/HelperFunc'

import AverageStarRating from '@/app/products/[...product]/ProductComponents/AverageStarRating'

export default function ProductInfoContainer( {productType}: {productType: string}) {
  const dispatch = useDispatch<AppDispatch>()

  const { product: { id, header_description, name, images, price, reviews, meta_data }, mainSwiper, thumbsSwiper } = useContext(ProductContext)

  const handleSwipers = (index: number) => {
    if (productType !== 'snowboard') return
    mainSwiper?.slideTo(index)
    thumbsSwiper?.slideTo(index)
  }

  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const [sizeError, setSizeError] = useState<boolean>(false)
  const [skuError, setSkuError] = useState<boolean>(false)

  const handleAddToCart = () => {
    // Retrieve existing cart items from local Storage
    const cartString = localStorage.getItem('cart')
    const existingCart = cartString ? JSON.parse(cartString) : []

    const emptySku = selectedSize !== null && meta_data[selectedSize].sku === 0
  // Add a condition to check if the quantity in the existing cart is equal to the SKU
  const selectedSizeObject = selectedSize !== null ? meta_data[selectedSize] : undefined;
  // const noMoreSkuAvail =
  //   selectedSizeObject &&
  //   existingCart.some(
  //     (item: CartItemType) => item.size === selectedSizeObject.size && item.quantity === selectedSizeObject.sku
  //   );

    if (emptySku || (selectedSize === null && !sizeError)) {
      setSizeError(true)
      setTimeout(() => {
        setSizeError(false)
      }, 4000)
      return
    }

    // if (noMoreSkuAvail) {
    //   setSkuError(true)
    //   setTimeout(() => {
    //     setSkuError(false)
    //   }, 4000)
    //   return
    // }

    const cartItem = {
      id,
      name,
      image: selectedSize !== null ? images[selectedSize] : 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=jpg&quality=90&v=1530129081',
      price,
      productType,
      size: selectedSize !== null ? meta_data[selectedSize]?.size : undefined,
      sku: selectedSize !== null ? meta_data[selectedSize]?.sku : undefined,
      quantity: 1
    }

    // Check if the item is already in the cart
    const existingCartItemIndex = existingCart.findIndex(
      (item: CartItemType) => item.id === cartItem.id && item.size === cartItem.size
    );

    if (existingCartItemIndex !== -1) {
      // If the item is already in the cart, update the quantity
      existingCart[existingCartItemIndex].quantity += 1;
    } else {
      // If the item is not in the cart, add it with the initial quantity
      existingCart.push(cartItem);
    }
    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart))

    // console.log(cartItem)
    dispatch(addToCart(cartItem))
  }

  const throttleAddToCart = throttle(handleAddToCart, 3000)

  return (
    <div className='product-info-container pt-6 border-0 max-w-[1920px]'>
      <div className='product-info flex flex-col'>
        <span className='text-sm lg:text-base font-extrabold tracking-tighter'>{header_description || 'ACCESSORIES'}</span>
        <span className='text-3xl lg:text-5xl font-black mt-[10px] lg:mt-[15px]'>{name}</span>
        <span className='text-lg lg:text-2xl font-bold mt-[15px] lg:mt-[20px]'>${price}</span>
        {reviews && <div className='product-info-review-container flex items-center my-[20px]'>
          <AverageStarRating reviews={reviews} />
          <span className='underline tracking-tighter text-sm font-bold pl-2'>{reviews.length} reviews</span>
        </div> }
        <div className='product-info-form'>
          {/* input hidden for now, responsible for identifying product SKU? */}
          <input type='hidden'/>
          <div className='product-info-sizes relative mt-[12px]'>
            { sizeError && <div className='border-error absolute border-[1px] rounded-lg'></div> }
            { skuError && <div className='border-error absolute border-[1px] rounded-lg'></div> }
            {sortMetaData(meta_data).map((item, index) => {
              const noStock = item.sku === 0

              return (
                <div className={`product-info-size relative text-center border-[1px] rounded-full px-3 py-2 hover:text-primary hover:bg-secondary hover:cursor-pointer ${noStock ? 'disabled-size opacity-50 text-gray-400' : ''}
                ${selectedSize === index ? 'bg-secondary text-primary' : ''}
                ${sizeError ? 'pointer-events-none' : ''}
                `}
                  key={index}
                  data-index={index}
                  onClick={() => {
                    handleSwipers(index)
                    setSelectedSize(index)

                  }}
                  data-for={id.toString() + item.size.toString()}
                  >
                  <input
                    className='invisible opacity-0 w-0 h-0'
                    type='radio'
                    name='Size'
                    value={item.size}
                    id={id.toString() + item.size.toString()}
                    />
                  <span className='text-[18px] cursor-pointer whitespace-nowrap'>{item.size}</span>
                </div>
              )
            })}
          </div>
          <span className={`variant-select relative top-[10px] ${sizeError || skuError ? 'visible' : 'invisible'}`}>{sizeError ? 'Please select a variant.' : ''} {skuError ? 'Item may be out of stock. Check inventory' : '' }</span>
          <button className='add-to-cart flex justify-center items-center rounded-full font-bold w-full mt-[20px] py-[19px] gap-2 bg-secondary text-primary hover:underline'
            onClick={throttleAddToCart}
            >
            <span className='uppercase'>Add to cart</span>
            {cartSVG('23')}
          </button>

        </div>
      </div>
    </div>
  )
}