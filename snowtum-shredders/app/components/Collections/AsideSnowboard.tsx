'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface CheckboxState {
  'all-snowboards': boolean;
  'snowboards-mens': boolean;
  'snowboards-womens': boolean;
  'snowboards-kids': boolean;
  'split-snowboards': boolean;
}

export default function AsideSnowboards() {
  const pathname = usePathname();

  // Use local state for the checkbox values
  const [checkboxState, setCheckboxState] = useState({
    'all-snowboards': pathname === '/collections/all-snowboards',
    'snowboards-mens': pathname === '/collections/snowboards-mens',
    'snowboards-womens': pathname === '/collections/snowboards-womens',
    'snowboards-kids': pathname === '/collections/snowboards-kids',
    'split-snowboards': pathname === '/collections/split-snowboards',
  });

  // Safety measure to default back to all-snowboards if all filters have been unchecked
  const allKeysFalse = Object.values(checkboxState).every(value => value === false);
  if (allKeysFalse) {
    setCheckboxState({
      ...checkboxState,
      'all-snowboards': true
    });
    window.location.replace('/collections/all-snowboards')
  }

  const handleCheckboxChange = (key: keyof CheckboxState) => {
    // Update the local state immediately
    const updatedCheckboxState = { ...checkboxState, [key]: !checkboxState[key] };
    setCheckboxState(updatedCheckboxState);

    // Navigate based on the updated state
    if (updatedCheckboxState[key]) {
      window.location.replace(`/collections/${key}`);
    }
  };

  return (
    <aside className='content-aside-filter border-2'>
      <div className='aside-filter flex flex-col font-semibold'>
        <label className='all-filter flex'>
          <input
            type='checkbox'
            name='ALL'
            checked={checkboxState['all-snowboards']}
            onChange={() => handleCheckboxChange('all-snowboards')}
          />
          <Link href='/collections/all-snowboards'>ALL</Link>
        </label>
        <label className='mens-filter flex'>
          <input
            type='checkbox'
            name="MEN'S"
            onClick={() => window.location.replace('/collections/snowboards-mens')}
            checked={checkboxState['snowboards-mens']}
            onChange={() => handleCheckboxChange('snowboards-mens')}
          />
          <Link href='/collections/snowboards-mens'>MEN&apos;S</Link>
        </label>
        <label className='womens-filter flex'>
            <input
              type='checkbox'
              name="WOMEN'S"
              checked={checkboxState['snowboards-womens']}
              onChange={() => handleCheckboxChange('snowboards-womens')}
            />
            <Link href='/collections/snowboards-womens'>WOMEN&apos;S</Link>
         </label>
         <label className='kids-filter flex'>
            <input
              type='checkbox'
              name="KID'S"
              checked={checkboxState['snowboards-kids']}
              onChange={() => handleCheckboxChange('snowboards-kids')}
            />
            <Link href='/collections/snowboards-kids'>KID&apos;S</Link>
         </label>
         <label className='splitboards-filter flex'>
            <input
              type='checkbox'
              name="SPLITBOARDS"
              checked={checkboxState['split-snowboards']}
              onChange={() => handleCheckboxChange('split-snowboards')}
            />
            <Link href='/collections/split-snowboards'>SPLITBOARDS</Link>
         </label>
      </div>
    </aside>
  );
}
