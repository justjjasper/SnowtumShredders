'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { circlePlusSVG, circleXMarkSVG } from "@/app/Misc/Icons";
import '../AsideContent.css'

interface CheckboxState {
  'all-accessories': boolean;
  'tshirts': boolean;
  'hoodies': boolean;
  'hats-beanies': boolean;
  'boardbags': boolean;
}

export default function AsideSnowboards() {
  const pathname = usePathname();
  const [filterToggle, setFilterToggle] = useState<boolean>(false)

   // Use local state for the checkbox values, this allows a smoother UX of the checkbox
   const [checkboxState, setCheckboxState] = useState({
    'all-accessories': pathname === '/collections/accessories/all-accessories',
    'tshirts': pathname === '/collections/accessories/tshirts',
    'hoodies': pathname === '/collections/accessories/hoodies',
    'hats-beanies': pathname === '/collections/accessories/hats-beanies',
    'boardbags': pathname === '/collections/accessories/boardbags',
  });

  const handleCheckboxChange = (key: keyof CheckboxState) => {
    // Update the local state immediately
    setCheckboxState({ ...checkboxState, [key]: !checkboxState[key] });

    // Navigate based on the updated state
    window.location.replace(`/collections/${key}`);
  };

  return (
    <aside className='content-aside-filter flex flex-col border-[1px] px-5 xl:px-none rounded-3xl xl:rounded-xl bg-secondary xl: bg-none xl:h-56 xl:sticky top-[150px] w-[90%] xl:w-[275px]'>
      <div className={`xl:hidden flex relative py-3 justify-between items-center
        ${filterToggle ? 'divider': ''}`
      }
        onClick={() => setFilterToggle(!filterToggle)}
      >
        <span className='text-lg xl:text-xl font-semibold'>FILTERS</span>
        {filterToggle ? circleXMarkSVG : circlePlusSVG}
      </div>
      <div className={`aside-filter text-xs md:text-base xl:flex relative flex-col font-semibold py-6
        ${filterToggle ? 'flex' : 'hidden'}
      `} >
        <label className='filter flex'>
          <Link href='/collections/accessories/all-accessories' className='flex'>
            <input
              type='checkbox'
              name='ALL'
              checked={checkboxState['all-accessories']}
              onChange={() => handleCheckboxChange('all-accessories')}
            />
            <span className='checkmark'></span>
            ALL
          </Link>
        </label>
        <label className='filter flex'>
          <Link href='/collections/accessories/tshirts' className='flex'>
            <input
              type='checkbox'
              name="T-SHIRTS"
              checked={checkboxState['tshirts']}
              onChange={() => handleCheckboxChange('tshirts')}
            />
            <span className='checkmark'></span>
            T-SHIRTS
          </Link>
        </label>
        <label className='filter flex'>
          <Link href='/collections/accessories/hoodies' className='flex'>
              <input
                type='checkbox'
                name="HOODIES"
                checked={checkboxState['hoodies']}
                onChange={() => handleCheckboxChange('hoodies')}
              />
              <span className='checkmark'></span>
            HOODIES
            </Link>
         </label>
         <label className='filter flex'>
            <Link href='/collections/accessories/hats-beanies' className='flex'>
              <input
                type='checkbox'
                name="HATS & BEANIES"
                checked={checkboxState['hats-beanies']}
                onChange={() => handleCheckboxChange('hats-beanies')}
              />
              <span className='checkmark'></span>
              HATS & BEANIES
            </Link>
         </label>
         <label className='filter flex'>
          <Link href='/collections/accessories/boardbags' className='flex'>
            <input
              type='checkbox'
              name="BOARD BAGS"
              checked={checkboxState['boardbags']}
              onChange={() => handleCheckboxChange('boardbags')}
            />
            <span className='checkmark'></span>
            BOARD BAGS
            </Link>
         </label>
      </div>
    </aside>
  );
}
