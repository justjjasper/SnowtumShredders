'use client'
import Link from "next/link";
import Image from "next/image";
import '../ProductSizes.css'
import { AccessoryProductType } from "@/app/collections/accessories/[accessory]/page";
import { MetaDataType } from "@/app/types";
import { useEffect, useState } from "react";

type AccessoryListProps = {
  products: AccessoryProductType[]
}

export default function AccessoryList({ products }: AccessoryListProps) {
  const [numOfSize, setNumOfSize] = useState<number>(4)

  useEffect(() => {
    const handleNumOfSize = () => {
      if(window.innerWidth < 560) {
        setNumOfSize(3)
      } else {
        setNumOfSize(4)
      }
    }

    // Attach the event listener
    window.addEventListener('resize', handleNumOfSize);

    // Call handleNumOfSize initially to set the initial state
    handleNumOfSize();

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleNumOfSize);
    };
  }, [])

  return (
    <div className='content-list flex flex-row flex-wrap w-full gap-y-12 lg:gap-20 xl:gap-24 justify-start px-3 lg:px-24'>
      {/* Maps out each Accessory Product*/}
      {products.map((accessoryProduct: AccessoryProductType, i: number) => {
        const formattedAccessoryProductName = accessoryProduct.name.toLowerCase().replace(/\s+/g, '-');
        const productCategory = accessoryProduct.category
        return (
          <div className='product-container flex flex-col justify-start font-semibold w-6/12 lg:w-3/12'
            key={i}
          >
            <Link className='product-image flex mb-5' href={`/products/${productCategory}/${formattedAccessoryProductName}`}>
              <Image
                src={accessoryProduct.image}
                width={225}
                height={337}
                alt={`${accessoryProduct.name} Image`}
                className='py-5 transition-transform ease-in-out duration-300 hover:scale-110 transform w-full h-full'
              />
            </Link>
            <div className='product-sizes flex flex-wrap gap-1 items-center'>
              {/* Maps out each Size for the current Accessory Product*/}
              {accessoryProduct.meta_data.map((metaData: MetaDataType, i: number) => {
                const productLength = accessoryProduct.meta_data.length
                const remainder = accessoryProduct.meta_data.length - numOfSize
                const isInactive = metaData.sku === 0

                if (i < numOfSize) {
                  return (
                    <Link
                      href={isInactive ? '#' : `/products/${productCategory}/${formattedAccessoryProductName}`}
                      key={i}
                      className={`relative flex justify-center border-[1px] font-normal text-[9px] md:text-xs py-[1px] rounded-xl ${isInactive ? 'opacity-50 text-gray-400 pointer-events-none disabled-size' : ''}
                      ${productLength === 1 ? 'min-w-[55px]' : 'w-1/5'}

                      `}

                    >
                      {metaData.size}
                    </Link>
                  );
                }

                if (i === numOfSize) {
                  return (
                    <Link
                      href={`/products/${productCategory}/${formattedAccessoryProductName}`}
                      key={i}
                      className='relative flex justify-center font-normal text-[9px] md:text-xs py-[1px] rounded-xl w-1/7 xsm:w-1/5'
                    >
                      {`+${remainder} more`}
                    </Link>
                  )
                }
                return null
              })}
            </div>
            <span className='product-description flex mt-3 text-[11px] xsm:text-xs w-[25ch] md:w-[35ch]'>
              CATEGORIES
            </span>
            <span className='product-name flex py-[5px] leading-[1.2rem] xsm:py-0 md:text-2xl w-[17ch] xsm:w-[20ch]'>
              <Link href={`/products/${productCategory}/${formattedAccessoryProductName}`}>{accessoryProduct.name}</Link>
            </span>
            <span className='product-price flex font-normal text-[11px] xsm:text-sm md:text-base'>${accessoryProduct.price}</span>
          </div>
        )
      })}
  </div>
  )
}