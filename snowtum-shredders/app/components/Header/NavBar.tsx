'use client'
import './NavBar.css'
import { cartSVG, searchSVG, hambugerSVG, xmarkSVG } from '@/app/Misc/Icons'
import React, { useState, useEffect } from 'react'
import Link from "next/link"
import SearchForm from './SearchForm'

export default function NavBar(){
  const[hamburgerToggle, setHamburgerToggle] = useState<boolean>(false)

  // Regulate Category Mobile Menus
  const [snowboardMobileMenu, setSnowboardMobileMenu] = useState<boolean>(false)
  const [accessoriesMobileMenu, setAccessoriesMobileMenu] = useState<boolean>(false)

  // Regulates the conditional render of adding new Classnames to control CSS animations
  const [snowboardHovered, setSnowboardHovered] = useState<boolean>(false);
  const [accessoriesHovered, setAccessoriesHovered] = useState<boolean>(false);
  const [searchHovered, setSearchHovered] = useState<boolean>(false);

  const onMouseEnterSnowboard = () => {
    if (!hamburgerToggle) {
      setAccessoriesHovered(false)
      setSearchHovered(false)
      setSnowboardHovered(true);
    }
    console.log('onMouseEnterSnowboard triggered')
  }

  const onMouseEnterAccessories = () => {
    // Prevents the trigger of conditional "hovered" CSS during mobile menu mode SINCE they are already applied during hamburgerToggle
    if (!hamburgerToggle) {
      setSnowboardHovered(false)
      setSearchHovered(false)
      setAccessoriesHovered(true)
    }
    console.log('onMouseEnterAccessories triggered')
  }

  const onMouseEnterSearch = () => {
    setSnowboardHovered(false)
    setAccessoriesHovered(false)
    setSearchHovered(true)

    console.log('onMouseEnterSearch triggered')
  }

  const onMouseLeave = () => {
    if (!hamburgerToggle) {
      setSnowboardHovered(false)
      setAccessoriesHovered(false)
      setSearchHovered(false)
    }

    console.log('onMouseLeave triggered')
  }

  // Contains X Positions for CSS Padding
  const [snowboardXPos, setSnowboardPos] = useState<number | undefined>()
  const [accessoriesXPos, setAccessoriesPos] = useState<number | undefined>()

  // Retrieves X position to create padding left for menu items
  useEffect(() => {
    // Create function that retrieves snowboard X position
    const snowboardResize = () => {
      const getSnowboardPos = document.getElementById('snowboard-header')
      const snowboardPos = getSnowboardPos?.getBoundingClientRect()?.x
      setSnowboardPos(snowboardPos)
    }

    const accessoriesResize = () => {
      const getAccessoriesPos = document.getElementById('accessories-header')
      const accessoriesPos = getAccessoriesPos?.getBoundingClientRect()?.x
      setAccessoriesPos(accessoriesPos)
    }

    // Initiate X Positions
    snowboardResize()
    accessoriesResize()

    // Triggers Resize functions when browser size changes
    window.addEventListener('resize', snowboardResize)
    window.addEventListener('resize', accessoriesResize)
  }, [snowboardXPos])

  return (
    // **To Implement individual backdrop blur of Snowboard/Accessory dropdown menu** When state of either snowboard/acessories is hovered via onMouseEnter, a class is added to entire header to create backdrop blur.
    <div className={`header flex flex-col font-calibre font-bold sticky top-0 backdrop-blur-[100px] z-50 text-[#ffffff] w-full
      ${snowboardHovered ? 'snowboardMenuTrigger' : ''}
      ${accessoriesHovered ? 'accessoriesMenuTrigger' : ''}
      ${searchHovered ? 'searchMenuTrigger' : ''}
      ${hamburgerToggle ? 'mobileDropdownMenuTrigger' : ''}`
      }
      onMouseLeave={onMouseLeave}>

      {/* "Physical" Navbar */}
      <div className='second flex w-full items-center justify-between px-16 py-8'>
        <Link href='/' className='font-holtwood text-[22px]' onMouseEnter={onMouseLeave}>SNOWTUM SHREDDERS</Link>
        <nav className='hidden lg:flex flex-grow justify-around'>
          <ul className='flex w-8/12 justify-evenly'>
            <span className={`header-link ${snowboardHovered ? 'is-active' : ''}`}
              id='snowboard-header'
              onMouseEnter={onMouseEnterSnowboard}
              /*
                When the cursor hovers "SNOWBOARD", the "is-active" Class is added
                to the span tag.
              */
            >
              SNOWBOARDS
            </span>
            <span className={`header-link ${accessoriesHovered ? 'is-active' : ''}`}
              id='accessories-header'
              onMouseEnter={onMouseEnterAccessories}
              >
              ACCESSORIES
            </span>
            <Link id='menu-link'
              href='/pages/team'
              onMouseEnter={onMouseLeave}
              >
              TEAM
            </Link>
          </ul>
        </nav>

        <div className='flex gap-7'>
          <button id='menu-link'
            onMouseEnter={onMouseEnterSearch}
            className='hidden lg:block'
          >
            {searchSVG}
          </button>
          <button id='menu-link'>
            {cartSVG}
          </button>
          {hamburgerToggle === false && <button id='menu-link'
            className='block lg:hidden'
            onClick={() => setHamburgerToggle(!hamburgerToggle)}
          >
            {hambugerSVG}
          </button>}
          {hamburgerToggle === true && <button id='menu-link'
            className='block lg:hidden'
            onClick={() => setHamburgerToggle(!hamburgerToggle)}
          >
            {xmarkSVG}
          </button>}
        </div>
      </div>

                             {/* Implement a way where this condition breaks when screen is larger than lg */}
      {/* Dropdown Menu Extension */}
      <div className={`drop-down-menu relative w-full
        ${hamburgerToggle ? 'mobileDropdownMenuTrigger' : ''}`}
        onMouseLeave={onMouseLeave}>
        <div className='cartForm'></div>
        {/* Menu list */}
        <div className='menu-list w-full relative flex flex-col'>

          {/* SearchForm Menu */}
          <SearchForm searchHovered={searchHovered} onMouseLeave={onMouseLeave} hamburgerToggle={hamburgerToggle}/>

          {/* Snowboard Menu */}
          <div className={`snowboards-menu absolute w-full flex-col
            lg:${snowboardHovered ? 'flex' : 'hidden'}
            ${hamburgerToggle ? 'flex' : 'hidden'}

            `}
            onMouseEnter={onMouseEnterSnowboard}
            >
            <button className={`${hamburgerToggle ? 'flex' : 'hidden'}`}
              onClick={() => setSnowboardMobileMenu(!snowboardMobileMenu)}
            >
              <span>Snowboards</span>
            </button>
            <div className={`snowboards-menu-list lg:flex flex-col font-medium text-[14px] w-full
              ${snowboardMobileMenu ? 'flex' : 'hidden'}`
             }
              style={{paddingLeft : `${snowboardXPos}px`}}
              >
              <Link href='/collections/all-snowboards' onClick={onMouseLeave} className='py-3 leading-8'>
                <span id='menu-link' className='w-full'>ALL</span>
              </Link>
              <Link href='/collections/snowboards-mens' onClick={onMouseLeave} className='py-3 leading-8'>
                <span id='menu-link' className='w-full'>MEN&apos;S</span>
              </Link>
              <Link href='/collections/snowboards-womens' onClick={onMouseLeave} className='py-3 leading-8'>
                <span id='menu-link' className='w-full'>WOMEN&apos;S</span>
              </Link>
              <Link href='/collections/snowboards-kids' onClick={onMouseLeave} className='py-3 leading-8'>
                <span id='menu-link' className='w-full'>KID&apos;S</span>
              </Link>
              <Link href='/collections/split-snowboards' onClick={onMouseLeave} className='py-3 leading-8'>
                <span id='menu-link' className='w-full'>SPLITBOARDS</span>
              </Link>
            </div>
            <div className='hidden'>Divider</div>
          </div>

          {/* Accessories Menu */}
          <div className={`accessories-menu absolute w-full flex-col
            lg:${accessoriesHovered ? 'flex' : 'hidden'}
            ${hamburgerToggle ? 'flex' : 'hidden'}
            `
          }
            onMouseEnter={onMouseEnterAccessories}
          >
            <button className={`${hamburgerToggle ? 'flex' : 'hidden'}`}
               onClick={() => setAccessoriesMobileMenu(!accessoriesMobileMenu)}
            >
              <span>Accessories</span>
              </button>
            <div className={`accessories-menu-list lg:flex flex-col font-medium text-[14px] w-full
              ${accessoriesMobileMenu ? 'flex' : 'hidden'}`
            }
              style={{paddingLeft: `${accessoriesXPos}px`}}
            >
              <Link href='/collections/accessories/all-accessories' onClick={onMouseLeave} className='py-3 leading-8'>
                <span id='menu-link' className='w-full'>ALL</span>
              </Link>
              <Link href='/collections/accessories/tshirts' onClick={onMouseLeave} className='py-3 leading-8'>
                <span id='menu-link' className='w-full'>T-SHIRTS</span>
              </Link>
              <Link href='/collections/accessories/hoodies' onClick={onMouseLeave} className='py-3 leading-8'>
                <span id='menu-link' className='w-full'>HOODIES</span>
              </Link>
              <Link href='/collections/accessories/hats-beanies' onClick={onMouseLeave} className='py-3 leading-8'>
                <span id='menu-link' className='w-full'>HATS & BEANIES</span>
              </Link>
              <Link href='/collections/accessories/boardbags' onClick={onMouseLeave} className='py-3 leading-8'>
                <span id='menu-link' className='w-full'>BOARD BAGS</span>
              </Link>
            </div>
            <div className='hidden'>Divider</div>
          </div>
        </div>
      </div>

    </div>
  )
}