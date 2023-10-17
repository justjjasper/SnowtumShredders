'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import '../AsideContent.css'

interface CheckboxState {
  'all-snowboards': boolean;
  'snowboards-mens': boolean;
  'snowboards-womens': boolean;
  'snowboards-kids': boolean;
  'split-snowboards': boolean;
}

export default function AsideSnowboards() {
  const pathname = usePathname();

  // Use local state for the checkbox values, this allows a smoother UX of the checkbox
  const [checkboxState, setCheckboxState] = useState({
    'all-snowboards': pathname === '/collections/all-snowboards',
    'snowboards-mens': pathname === '/collections/snowboards-mens',
    'snowboards-womens': pathname === '/collections/snowboards-womens',
    'snowboards-kids': pathname === '/collections/snowboards-kids',
    'split-snowboards': pathname === '/collections/split-snowboards',
  });

  const handleCheckboxChange = (key: keyof CheckboxState) => {
    // Update the local state immediately
    setCheckboxState({ ...checkboxState, [key]: !checkboxState[key] });

    // Navigate based on the updated state
    window.location.replace(`/collections/${key}`);
  };

  return (
    <aside className='content-aside-filter border-[1px] rounded-xl h-56 sticky top-[150px]'>
      <div className='aside-filter relative flex flex-col font-semibold mx-5 py-6' >
        <label className='filter flex'>
          <Link href='/collections/all-snowboards' className='flex'>
            <input
              type='checkbox'
              name='ALL'
              checked={checkboxState['all-snowboards']}
              onChange={() => handleCheckboxChange('all-snowboards')}
            />
            <span className='checkmark'></span>
            ALL
          </Link>
        </label>
        <label className='filter flex'>
          <Link href='/collections/snowboards-mens' className='flex'>
            <input
              type='checkbox'
              name="MEN'S"
              onClick={() => window.location.replace('/collections/snowboards-mens')}
              checked={checkboxState['snowboards-mens']}
              onChange={() => handleCheckboxChange('snowboards-mens')}
            />
            <span className='checkmark'></span>
            MEN&apos;S
          </Link>
        </label>
        <label className='filter flex'>
          <Link href='/collections/snowboards-womens' className='flex'>
              <input
                type='checkbox'
                name="WOMEN'S"
                checked={checkboxState['snowboards-womens']}
                onChange={() => handleCheckboxChange('snowboards-womens')}
              />
              <span className='checkmark'></span>
            WOMEN&apos;S
            </Link>
         </label>
         <label className='filter flex'>
            <Link href='/collections/snowboards-kids' className='flex'>
              <input
                type='checkbox'
                name="KID'S"
                checked={checkboxState['snowboards-kids']}
                onChange={() => handleCheckboxChange('snowboards-kids')}
              />
              <span className='checkmark'></span>
              KID&apos;S
            </Link>
         </label>
         <label className='filter flex'>
          <Link href='/collections/split-snowboards' className='flex'>
            <input
              type='checkbox'
              name="SPLITBOARDS"
              checked={checkboxState['split-snowboards']}
              onChange={() => handleCheckboxChange('split-snowboards')}
            />
            <span className='checkmark'></span>
            SPLITBOARDS
            </Link>
         </label>
      </div>
    </aside>
  );
}
