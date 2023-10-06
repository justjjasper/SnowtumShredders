'use client'
import { useState } from 'react'
import Link from "next/link"

// Import Icons
import { searchSVG, cartSVG } from "@/app/Misc/Icons"


export default function Nav(){
  const [snowboardHovered, setSnowboardHovered] = useState(false);
  const [accessoriesHovered, setAccessoriesHovered] = useState(false);

  const onMouseEnterSnowboard = () => {
    setSnowboardHovered(true);
  }

  const onMouseLeaveSnowboard = () => {
    setSnowboardHovered(false)
    setAccessoriesHovered(false)
  }

  const onMouseEnterAccessories = () => {
    setAccessoriesHovered(true)
  }

  const onMouseLeaveAccessories = () => {
    setAccessoriesHovered(false)
    setSnowboardHovered(false)
  }

  return (
    <div className='flex flex-col font-calibre font-bold sticky top-0 backdrop-blur-lg'
    onMouseLeave={onMouseLeaveSnowboard}>
      <div className='flex w-full items-center justify-between px-16 py-8'>
        <Link href='/'>SNOWTUM SHREDDERS</Link>

        <nav className='flex flex-grow justify-around'
          >
          <ul
            className='flex w-8/12 justify-evenly'
            >
            <span
              // className={`${snowboardHovered ? 'underline' : ''}`}
              // id={`${snowboardHovered ? 'link' : ''}`}
              id='header-link'
              onMouseEnter={onMouseEnterSnowboard}

            >
              SNOWBOARDS
            </span>
            <span
              onMouseEnter={onMouseEnterAccessories}
              onMouseLeave={onMouseLeaveAccessories}
            >
              ACCESSORIES
            </span>
            <span>TEAM</span>
          </ul>
        </nav>

        <div className='flex gap-7'>
          <button>
            {searchSVG}
          </button>
          <button>
            {cartSVG}
          </button>
        </div>
     </div>

      <div
        className={`dropdownMenu ${snowboardHovered ? 'flex' : 'hidden'} `}>
        <div className='cartForm'></div>
        <div className='menuList'>
          <div className='searchForm hidden'></div>
          <div
            className='snowboards-menu'
            onMouseEnter={onMouseEnterSnowboard}
            onMouseLeave={onMouseLeaveSnowboard}
            >
            <button className='hidden'><span>Snowboards</span></button>
            <div className='snowboards-menu-list flex flex-col gap-5'>
              <Link href='/collections/all-snowboards'>
                <span id='link'>ALL</span>
              </Link>
              <Link href='/collections/snowboards-mens'>
                <span id='link'>MEN&apos;S</span>
              </Link>
              <Link href='/collections/snowboards-womens'>
                <span id='link'>WOMEN&apos;S</span>
              </Link>
              <Link href='/collections/snowboards-kids'>
                <span id='link'>KID&apos;S</span>
              </Link>
              <Link href='/collections/split-snowboards'>
                <span id='link'>SPLITBOARDS</span>
              </Link>
            </div>
            <div className='hidden'>Divider</div>
          </div>
          <div className='accessories-menu'>
            <button className='hidden'><span>Accessories</span></button>
            <div className='accessories-menu-list'></div>
            <div className='hidden'>Divider</div>
          </div>
        </div>
      </div>

    </div>
  )
}