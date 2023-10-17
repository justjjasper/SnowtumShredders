'use client'
import { useState } from 'react';
import './SortingOptions.css'
import Link from 'next/link';

type SortingOptionsProps = {
  productCategory: string
}

export default function SortingOptions( {productCategory}: SortingOptionsProps) {
  // IF passing accesssories, need to add additional condition as variable down into links href such as productCategory = /acccesories/accessoryCategory
  const [activeOption, setActiveOption] = useState('FEATURED'); // State to track the active option

  // Updates css for selected filter option
  const handleSorting = (option: string) => {
    setActiveOption(option)
  };

  /*
  [searchParams] Based on the sorting option, utilized Next.js Link and the query params as a state and filtered
  the products "state" back in the Collections page
  */
  return (
    <div className='top-sorting-options text-sm tracking-tight font-semibold'>
      <Link
        className={`mx-[8px] ${ activeOption === 'NEWEST' ? 'selected-sorting-option' : ''}`}
        onClick={() => handleSorting('NEWEST')}
        href={`/collections/${productCategory}?sort_by=newest`}
        >
          NEWEST
      </Link>
      <Link
        className={`mx-[8px] ${ activeOption === 'FEATURED' ? 'selected-sorting-option' : ''}`}
        onClick={() => handleSorting('FEATURED')}
        href={`/collections/${productCategory}?sort_by=featured`}
        >
        FEATURED
      </Link>/
      <Link
        className={`mx-[8px] ${ activeOption === 'PRICE: HIGH - LOW' ? 'selected-sorting-option' : ''}`}
        onClick={() => handleSorting('PRICE: HIGH - LOW')}
        href={`/collections/${productCategory}?sort_by=price-descending`}
        >
        PRICE: HIGH - LOW
      </Link>|
      <Link
        className={`mx-[8px] ${ activeOption === 'PRICE: LOW - HIGH' ? 'selected-sorting-option' : ''}`}
        onClick={() => handleSorting('PRICE: LOW - HIGH')}
        href={`/collections/${productCategory}?sort_by=price-ascending`}
        >
        PRICE: LOW - HIGH
      </Link>
  </div>
  )
}