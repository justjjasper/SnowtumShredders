'use client'
import { useState } from 'react';
import '../SortingOptions.css'
import { SnowboardProductType } from "@/app/collections/[snowboards]/page";
import Link from 'next/link';

// need to pass products array and setState products, oging to need setState type
type SnowboardProductProps = {
  products: SnowboardProductType[]
  snowboardCategory: string
}
export default function SortingOptions( {products, snowboardCategory}: SnowboardProductProps) {
  const [activeOption, setActiveOption] = useState('FEATURED'); // State to track the active option

  // Updates css for selected filter option
  const handleSorting = (option: string) => {
    setActiveOption(option)
  };

  return (
    <div className='top-sorting-options text-sm tracking-tight font-semibold'>
      <Link
        className={`mx-[8px] ${ activeOption === 'NEWEST' ? 'selected-sorting-option' : ''}`}
        onClick={() => handleSorting('NEWEST')}
        href={`/collections/${snowboardCategory}?sort_by=NEWEST`}
        >
          NEWEST
      </Link>
      <Link
        className={`mx-[8px] ${ activeOption === 'FEATURED' ? 'selected-sorting-option' : ''}`}
        onClick={() => handleSorting('FEATURED')}
        href={`/collections/${snowboardCategory}?sort_by=FEATURED`}
        >
        FEATURED
      </Link>/
      <span
        className={`mx-[8px] ${ activeOption === 'PRICE: HIGH - LOW' ? 'selected-sorting-option' : ''}`}
        onClick={() => handleSorting('PRICE: HIGH - LOW')}>
        PRICE: HIGH - LOW
      </span>|
      <span
        className={`mx-[8px] ${ activeOption === 'PRICE: LOW - HIGH' ? 'selected-sorting-option' : ''}`}
        onClick={() => handleSorting('PRICE: LOW - HIGH')}>
        PRICE: LOW - HIGH
      </span>
  </div>
  )
}