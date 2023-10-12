'use client'
import Link from "next/link"
import { usePathname } from "next/navigation";
import { useState } from "react"

export default function AsideSnowboards() {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const pathname = usePathname()
  console.log('what is path name', pathname)


  return (
    <aside className='content-aside-filter border-2'>
      <div className='aside-filter flex flex-col font-semibold'>
        <label className='all-filter flex'>
          <input
            type='checkbox'
            name='ALL'
          />
          <Link href='/collections/all-snowboards'>ALL</Link>
        </label>
        <label className='mens-filter flex'>
          <input
            type='checkbox'
            name="MEN'S"
            onClick={() => window.location.replace('/collections/snowboards-mens')}
          />
          <Link href='/collections/snowboards-mens'>MEN&apos;S</Link>
        </label>
        <label className='womens-filter flex'>
            <input
              type='checkbox'
              name="WOMEN'S"
            />
            <Link href='/collections/snowboards-womens'>WOMEN&apos;S</Link>
         </label>
         <label className='kids-filter flex'>
            <input
              type='checkbox'
              name="KID'S"
            />
            <Link href='/collections/snowboards-kids'>KID&apos;S</Link>
         </label>
         <label className='splitboards-filter flex'>
            <input
              type='checkbox'
              name="SPLITBOARDS"
            />
            <Link href='/collections/split-snowboards'>SPLITBOARDS</Link>
         </label>
      </div>
  </aside>
  )
}