'use client'
import Link from "next/link"
import { usePathname } from "next/navigation";
import { useState } from "react"

interface CheckboxState {
  'all-snowboards': boolean;
  'snowboards-mens': boolean;
  'snowboards-womens': boolean;
  'snowboards-kids': boolean;
  'split-snowboards': boolean;
}

export default function AsideSnowboards() {
  const pathname = usePathname()
  console.log('what is path name', pathname)

  const [checkboxState, setCheckboxState] = useState<CheckboxState>({
    'all-snowboards': false,
    'snowboards-mens': false,
    'snowboards-womens': false,
    'snowboards-kids': false,
    'split-snowboards': false
  })

  switch (pathname) {
    case ('/collections/all-snowboards'):
      checkboxState['all-snowboards'] = (true)
      break;
    case ('/collections/snowboards-mens'):
      checkboxState['snowboards-mens'] = (true)
      break;
    case ('/collections/snowboards-womens'):
      checkboxState['snowboards-womens'] = (true)
      break;
    case ('/collections/snowboards-kids'):
      checkboxState['snowboards-kids'] = (true)
      break;
    case ('/collections/split-snowboards'):
      checkboxState['split-snowboards'] = (true)
      break;
    default:
      return (
        <div>
          Error loading page
        </div>
      )
  }
  return (
    <aside className='content-aside-filter border-2'>
      <div className='aside-filter flex flex-col font-semibold'>
        <label className='all-filter flex'>
          <input
            type='checkbox'
            name='ALL'
            checked={checkboxState['all-snowboards']}
            onChange={() => {window.location.replace('/collections/all-snowboards')}}
          />
          <Link href='/collections/all-snowboards'>ALL</Link>
        </label>
        <label className='mens-filter flex'>
          <input
            type='checkbox'
            name="MEN'S"
            onClick={() => window.location.replace('/collections/snowboards-mens')}
            checked={checkboxState['snowboards-mens']}
            onChange={() => {window.location.replace('/collections/snowboards-mens')}}
          />
          <Link href='/collections/snowboards-mens'>MEN&apos;S</Link>
        </label>
        <label className='womens-filter flex'>
            <input
              type='checkbox'
              name="WOMEN'S"
              checked={checkboxState['snowboards-womens']}
              onChange={() => {window.location.replace('/collections/snowboards-womens')}}
            />
            <Link href='/collections/snowboards-womens'>WOMEN&apos;S</Link>
         </label>
         <label className='kids-filter flex'>
            <input
              type='checkbox'
              name="KID'S"
              checked={checkboxState['snowboards-kids']}
              onChange={() => {window.location.replace('/collections/snowboards-kids')}}
            />
            <Link href='/collections/snowboards-kids'>KID&apos;S</Link>
         </label>
         <label className='splitboards-filter flex'>
            <input
              type='checkbox'
              name="SPLITBOARDS"
              checked={checkboxState['split-snowboards']}
              onChange={() => {window.location.replace('/collections/split-snowboards')}}
            />
            <Link href='/collections/split-snowboards'>SPLITBOARDS</Link>
         </label>
      </div>
  </aside>
  )
}