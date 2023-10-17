'use client'
import Link from "next/link";
import Image from "next/image";
import './SnowboardList.css'
import { SnowboardProductType, MetaDataType } from "@/app/collections/[snowboards]/page";

type SnowboardListProps = {
  products: SnowboardProductType[]
}

export default function SnowboardList({ products }: SnowboardListProps) {
  return (
    <div className='content-list flex flex-row flex-wrap gap-10 flex-grow justify-between px-24'>
      {/* Maps out each Snowboard Product*/}
      {products.map((snowboard: SnowboardProductType, i: number) => {
        const formattedSnowboardName = snowboard.snowboard_name.toLowerCase().replace(/\s+/g, '-');

        return (
          <div className='product-container flex flex-col justify-start font-semibold w-3/12'
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

                if (i < 7) {
                  return (
                    <Link
                      href={isInactive ? '#' : `/products/snowboard/${formattedSnowboardName}`}
                      key={i}
                      className={`relative flex justify-center border-[1px] font-normal text-xs py-[1px] rounded-xl w-1/5 ${isInactive ? 'opacity-50 text-gray-400 pointer-events-none disabled-size' : ''}`}
                    >
                      {metaData.size}
                    </Link>
                  );
                }

                if (i === 8) {
                  return (
                    <Link
                      href={`/products/snowboard/${formattedSnowboardName}`}
                      key={i}
                      className='relative flex justify-center font-normal text-xs py-[1px] rounded-xl w-1/5'
                    >
                      {`+${remainder} more`}
                    </Link>
                  )
                }
                return null
              })}
            </div>
            <span className='product-description flex mt-3 text-xs w-[35ch]'>
              {snowboard.header_description.replace(/\s*\/\s*/g, ' ')}
            </span>
            <span className='product-name flex text-2xl w-[20ch]'>
              <Link href={`/products/snowboard/${formattedSnowboardName}`}>{snowboard.snowboard_name}</Link>
            </span>
            <span className='product-price flex font-normal'>${snowboard.snowboard_price}</span>
          </div>
        )
      })}
  </div>
  )
}