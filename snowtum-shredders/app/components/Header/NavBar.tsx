'use client'
import './NavBar.css'
import { cartSVG, searchSVG, hambugerSVG, xmarkSVG, circlePlusSVG, circleMinusSVG } from '@/app/Misc/Icons'
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

  // Temporary solution to fix clicking on link peristence bug, new bug issue when "entering back header". Not what we want since we want to re enter header for cart icon
  const onMouseLeave = () => {
    if (!hamburgerToggle) {
      setSnowboardHovered(false)
      setAccessoriesHovered(false)
      setSearchHovered(false)
      setSnowboardMobileMenu(false)
      setAccessoriesMobileMenu(false)
    }
    setHamburgerToggle(false)
    console.log('onMouseLeave triggered')
  }

  // Contains X Positions for Dropdown Menu CSS Padding
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

  // If window width passes 1024px, remove mobileDropdownMenuTrigger className from drop-down-menu div
  useEffect(() => {
    // Add an event listener for window resize
    const handleResize = () => {
      // Check the screen width and set hamburgerToggle accordingly
      if (window.innerWidth > 1024) {
        setHamburgerToggle(false)
      }
    };

    // Attach the event listener
    window.addEventListener('resize', handleResize);

    // Call handleResize initially to set the initial state
    handleResize();

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    // **To Implement individual backdrop blur of Snowboard/Accessory dropdown menu** When state of either snowboard/acessories is hovered via onMouseEnter, a class is added to entire header to create backdrop blur.
    //[MobileMenu] Implement my-[-280/560px] to combat relative white space when snowboard/accessoriesMobileMenu is set to true
    <div className={`header flex flex-col font-calibre sticky font-bold top-0 backdrop-blur-[35px] z-50 text-[#ffffff] w-full
      ${snowboardHovered ? 'snowboardMenuTrigger' : ''}
      ${accessoriesHovered ? 'accessoriesMenuTrigger' : ''}
      ${searchHovered ? 'searchMenuTrigger' : ''}
      ${hamburgerToggle ? 'mobileDropdownMenuTrigger my-[-48px]' : ''}
      ${snowboardMobileMenu ? 'my-[-380px]' : ''}
      ${accessoriesMobileMenu ? 'my-[-380px]' : ''}
      ${accessoriesMobileMenu && snowboardMobileMenu ? 'my-[-560px]' : ''}
      `
      }
      onMouseLeave={onMouseLeave}>

      {/* "Physical" Navbar */}
      <div className={`physical-navbar flex w-full items-center justify-between px-3 md:px-16 py-3 md:py-8
        ${snowboardMobileMenu ? '' : ''}
      `}

      >
        <Link href='/' className='font-holtwood sm:text-[22px]' onMouseEnter={onMouseLeave}>SNOWTUM SHREDDERS</Link>
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

        <div className='flex gap-3 xsm:gap-7'>
          <button id='menu-link'
            onMouseEnter={onMouseEnterSearch}
            className='hidden lg:block'
          >
            {searchSVG}
          </button>
          <button id='menu-link'>
            {cartSVG('31')}
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

      {/* Dropdown Menu Extension */}
      <div className={`drop-down-menu relative w-full
        ${hamburgerToggle ? 'mobileDropdownMenuTrigger px-5 md:px-20' : ''}
        `}
        onMouseLeave={onMouseLeave}>
        <div className='cartForm'></div>
        {/* Menu list */}
        <div className='menu-list w-full relative flex flex-col'>

          {/* SearchForm Menu */}
          <SearchForm searchHovered={searchHovered} onMouseLeave={onMouseLeave} hamburgerToggle={hamburgerToggle}/>

          {/* Snowboard Menu */}
          <div className={`snowboards-menu relative w-full flex-col
            lg:${snowboardHovered ? 'flex' : 'hidden'}
            ${hamburgerToggle ? 'flex divider py-3' : 'hidden'}
            `}
            onMouseEnter={onMouseEnterSnowboard}
            >
              <button className={`${hamburgerToggle ? 'flex' : 'hidden'}`}
                onClick={() => setSnowboardMobileMenu(!snowboardMobileMenu)}
              >
                <span
                  className='flex justify-between items-center w-full'
                >
                  <span id='menu-link'>
                    Snowboards
                  </span>
                  {snowboardMobileMenu ? circleMinusSVG : circlePlusSVG}
                </span>
              </button>

              <div className={`snowboards-menu-list lg:flex flex-col font-medium text-[14px] w-full
                ${hamburgerToggle ? 'snowboards-mobile-menu-list' : 'hidden'}
                ${snowboardMobileMenu ? 'flex active' : 'flex'}
                `
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
            <div className={`${hamburgerToggle ? 'divider' : 'hidden'}`}></div>
          </div>

          {/* Accessories Menu */}
          <div className={`accessories-menu relative w-full flex-col
            lg:${accessoriesHovered ? 'flex' : 'hidden'}
            ${hamburgerToggle ? 'flex divider py-3' : 'hidden'}
            `
          }
            onMouseEnter={onMouseEnterAccessories}
          >
            <button className={`${hamburgerToggle ? 'flex' : 'hidden'}`}
               onClick={() => setAccessoriesMobileMenu(!accessoriesMobileMenu)}
            >
              <span
                className='flex items-center justify-between w-full'
                >
                  <span id='menu-link'>
                    Accessories
                  </span>
                  {accessoriesMobileMenu ? circleMinusSVG : circlePlusSVG}
                </span>
            </button>

            <div className={`accessories-menu-list lg:flex flex-col font-medium text-[14px] w-full
              ${hamburgerToggle ? 'accessories-mobile-menu-list' : 'hidden'}
              ${accessoriesMobileMenu ? 'flex active' : 'flex'}
              `
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
          </div>

          { /* Team Mobile Menu*/}
          <div className={`team-mobile-menu relative
            ${hamburgerToggle ? 'flex divider py-3' : 'hidden'}`
          }
          >
            <Link href='/pages/team' className='w-full'>
              <span id='menu-link'>
              Team
              </span>
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}