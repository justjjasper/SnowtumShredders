'use client'
import Link from "next/link";
import Image from "next/image";
import '../ProductSizes.css'
import { SnowboardProductType, MetaDataType } from "@/app/collections/[snowboards]/page";
import { useEffect, useState } from "react";

type AccessoryListProps = {
  products: SnowboardProductType[]
}

// Need to adjust accessory collection API to incorporate meta_data
export default function AccessoryList({ products }: AccessoryListProps) {
  const [numOfSize, setNumOfSize] = useState<number>(7)

  useEffect(() => {
    const handleNumOfSize = () => {
      if(window.innerWidth < 560) {
        setNumOfSize(3)
      } else {
        setNumOfSize(7)
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
  // sm:gap-20 xl:gap-24
  return (
    <div className='content-list flex flex-row flex-wrap gap-y-12 lg:gap-20 xl:gap-24 justify-start px-3 lg:px-24'>
      {/* Maps out each Snowboard Product*/}
      {products.map((snowboard: SnowboardProductType, i: number) => {
        const formattedSnowboardName = snowboard.snowboard_name.toLowerCase().replace(/\s+/g, '-');

        return (
          <div className='product-container flex flex-col justify-start font-semibold w-6/12 lg:w-3/12'
            key={i}
          >
            <Link className='product-image flex mb-5' href={`/products/snowboard/${formattedSnowboardName}`}>
              <Image
                src={snowboard.snowboard_image}
                width={225}
                height={337}
                alt={`${snowboard.snowboard_name} Image`}
                className='py-5 transition-transform ease-in-out duration-300 hover:scale-110 transform'
              />
            </Link>
            <div className='product-sizes flex flex-wrap gap-1 items-center'>
              {/* Maps out each Size for the current snowboard*/}
              {snowboard.snowboard_meta_data.map((metaData: MetaDataType, i: number) => {
                const remainder = snowboard.snowboard_meta_data.length - 7
                const isInactive = metaData.sku === 0

                if (i < numOfSize) {
                  return (
                    <Link
                      href={isInactive ? '#' : `/products/snowboard/${formattedSnowboardName}`}
                      key={i}
                      className={`relative flex justify-center border-[1px] font-normal text-[9px] md:text-xs py-[1px] rounded-xl w-1/5 ${isInactive ? 'opacity-50 text-gray-400 pointer-events-none disabled-size' : ''}`}
                    >
                      {metaData.size}
                    </Link>
                  );
                }

                if (i === numOfSize + 1) {
                  return (
                    <Link
                      href={`/products/snowboard/${formattedSnowboardName}`}
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
              {snowboard.header_description.replace(/\s*\/\s*/g, ' ')}
            </span>
            <span className='product-name flex py-[5px] leading-[1.2rem] xsm:py-0 md:text-2xl w-[17ch] xsm:w-[20ch]'>
              <Link href={`/products/snowboard/${formattedSnowboardName}`}>{snowboard.snowboard_name}</Link>
            </span>
            <span className='product-price flex font-normal text-[11px] xsm:text-sm md:text-base'>${snowboard.snowboard_price}</span>
          </div>
        )
      })}
  </div>
  )
}