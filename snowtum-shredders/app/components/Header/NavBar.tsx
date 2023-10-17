'use client'
import './NavBar.css'
import { useState, useEffect} from 'react'
import Link from "next/link"

// Import Icons
import { searchSVG, cartSVG } from "@/app/Misc/Icons"


export default function NavBar(){
  // Regulates the conditional render of adding new Classnames to control CSS animations
  const [snowboardHovered, setSnowboardHovered] = useState<boolean>(false);
  const [accessoriesHovered, setAccessoriesHovered] = useState<boolean>(false);

  const onMouseEnterSnowboard = () => {
    setAccessoriesHovered(false)
    setSnowboardHovered(true);
  }

  const onMouseLeave = () => {
    setSnowboardHovered(false)
    setAccessoriesHovered(false)
  }

  const onMouseEnterAccessories = () => {
    setSnowboardHovered(false)
    setAccessoriesHovered(true)
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
    <div className={`header flex flex-col font-calibre font-bold sticky top-0 backdrop-blur-3xl z-50 text-[#ffffff] w-full
      ${snowboardHovered ? 'snowboardMenuTrigger' : ''} ${accessoriesHovered ? 'accessoriesMenuTrigger' : ''}`}
      onMouseLeave={onMouseLeave}>
      <div className='second flex w-full items-center justify-between px-16 py-8'>
        <Link href='/' className='font-holtwood text-[22px]' onMouseEnter={onMouseLeave}>SNOWTUM SHREDDERS</Link>
        <nav className='flex flex-grow justify-around'>
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
          <button id='menu-link'>
            {searchSVG}
          </button>
          <button id='menu-link'>
            {cartSVG}
          </button>
        </div>
     </div>

      <div className='drop-down-menu relative w-full'  onMouseLeave={onMouseLeave}>
        <div className='cartForm'></div>
        <div className='menu-list'>
          <div className='searchForm hidden'></div>

          <div className={`snowboards-menu ${snowboardHovered ? 'flex' : 'hidden'} absolute`}
            onMouseEnter={onMouseEnterSnowboard}
            >
            <button className='hidden'><span>Snowboards</span></button>
            <div className='snowboards-menu-list flex flex-col font-medium text-[14px]'
              style={{paddingLeft : `${snowboardXPos}px`}}
              >
              <Link href='/collections/all-snowboards' onClick={onMouseLeave} className='py-3 leading-8'>
                <span id='menu-link'>ALL</span>
              </Link>
              <Link href='/collections/snowboards-mens' onClick={onMouseLeave} className='py-3 leading-8'>
                <span id='menu-link'>MEN&apos;S</span>
              </Link>
              <Link href='/collections/snowboards-womens' onClick={onMouseLeave} className='py-3 leading-8'>
                <span id='menu-link'>WOMEN&apos;S</span>
              </Link>
              <Link href='/collections/snowboards-kids' onClick={onMouseLeave} className='py-3 leading-8'>
                <span id='menu-link'>KID&apos;S</span>
              </Link>
              <Link href='/collections/split-snowboards' onClick={onMouseLeave} className='py-3 leading-8'>
                <span id='menu-link'>SPLITBOARDS</span>
              </Link>
            </div>
            <div className='hidden'>Divider</div>
          </div>

          {/* Accessories Menu */}
          <div className={`accessories-menu ${accessoriesHovered ? 'flex' : 'hidden'} absolute`}
            onMouseEnter={onMouseEnterAccessories}
          >
            <button className='hidden'><span>Accessories</span></button>
            <div className='accessories-menu-list flex flex-col font-medium text-[14px]'
              style={{paddingLeft: `${accessoriesXPos}px`}}
            >
              <Link href='/collections/accessories/all-accessories' onClick={onMouseLeave} className='py-3 leading-8'>
                <span id='menu-link'>ALL</span>
              </Link>
              <Link href='/collections/accessories/tshirts' onClick={onMouseLeave} className='py-3 leading-8'>
                <span id='menu-link'>T-SHIRTS</span>
              </Link>
              <Link href='/collections/accessories/hoodies' onClick={onMouseLeave} className='py-3 leading-8'>
                <span id='menu-link'>HOODIES</span>
              </Link>
              <Link href='/collections/accessories/hats-beanies' onClick={onMouseLeave} className='py-3 leading-8'>
                <span id='menu-link'>HATS & BEANIES</span>
              </Link>
              <Link href='/collections/accessories/boardbags' onClick={onMouseLeave} className='py-3 leading-8'>
                <span id='menu-link'>BOARD BAGS</span>
              </Link>
            </div>
            <div className='hidden'>Divider</div>
          </div>
        </div>
      </div>

    </div>
  )
}