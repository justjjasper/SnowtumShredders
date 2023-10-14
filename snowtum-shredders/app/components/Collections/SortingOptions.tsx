'use client'
import { useState } from 'react';
import './SortingOptions.css'
import { ProductType } from "@/app/collections/[snowboards]/page";

// need to pass products array and setState products, oging to need setState type
export default function SortingOptions() {
  const [activeOption, setActiveOption] = useState('FEATURED'); // State to track the active option

  //filter the products, based on the
  const handleSorting = (option: string) => {
    //switch case
    setActiveOption(option);
  };

  return (
    <div className='top-sorting-options text-sm tracking-tight font-semibold'>
      <span
        className={`mx-[8px] ${ activeOption === 'NEWEST' ? 'selected-sorting-option' : ''}`}
        onClick={() => handleSorting('NEWEST')}>
          NEWEST
      </span>|
      <span
        className={`mx-[8px] ${ activeOption === 'FEATURED' ? 'selected-sorting-option' : ''}`}
        onClick={() => handleSorting('FEATURED')}>
        FEATURED
      </span>/
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