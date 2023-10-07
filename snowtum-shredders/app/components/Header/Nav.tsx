'use client'
import { useState, useEffect} from 'react'
import Link from "next/link"

// Import Icons
import { searchSVG, cartSVG } from "@/app/Misc/Icons"


export default function Nav(){
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
    <div className='flex flex-col font-calibre font-bold sticky top-0 backdrop-blur-lg'
      onMouseLeave={onMouseLeave}>
      <div className='flex w-full items-center justify-between px-16 py-8'>
        <Link href='/'>SNOWTUM SHREDDERS</Link>

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
              href='/team'
              onMouseEnter={onMouseLeave}
            >
              TEAM
            </Link>
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

      <div className='dropdown-menu'>
        <div className='cartForm'></div>
        <div className='menu-list'>
          <div className='searchForm hidden'></div>
          <div className={`snowboards-menu ${snowboardHovered ? 'flex' : 'hidden'} py-8`}
            onMouseEnter={onMouseEnterSnowboard}
            onMouseLeave={onMouseLeave}
            >
            <button className='hidden'><span>Snowboards</span></button>
            <div className='snowboards-menu-list flex flex-col gap-6 font-medium text-[14px]'
              style={{paddingLeft : `${snowboardXPos}px`}}
            >
              <Link href='/collections/all-snowboards'>
                <span id='menu-link'>ALL</span>
              </Link>
              <Link href='/collections/snowboards-mens'>
                <span id='menu-link'>MEN&apos;S</span>
              </Link>
              <Link href='/collections/snowboards-womens'>
                <span id='menu-link'>WOMEN&apos;S</span>
              </Link>
              <Link href='/collections/snowboards-kids'>
                <span id='menu-link'>KID&apos;S</span>
              </Link>
              <Link href='/collections/split-snowboards'>
                <span id='menu-link'>SPLITBOARDS</span>
              </Link>
            </div>
            <div className='hidden'>Divider</div>
          </div>
          <div className={`accessories-menu ${accessoriesHovered ? 'flex' : 'hidden'} py-8`}
            onMouseEnter={onMouseEnterAccessories}
            onMouseLeave={onMouseLeave}
          >
            <button className='hidden'><span>Accessories</span></button>
            <div className='accessories-menu-list flex flex-col gap-6 font-medium text-[14px]'
              style={{paddingLeft: `${accessoriesXPos}px`}}
            >
              <Link href='/collections/accessories/all-accessories'>
                  <span id='menu-link'>ALL</span>
                </Link>
                <Link href='/collections/accessories/tshirts'>
                  <span id='menu-link'>T-SHIRTS</span>
                </Link>
                <Link href='/collections/accessories/hoodies'>
                  <span id='menu-link'>HOODIES</span>
                </Link>
                <Link href='/collections/accessories/hats-beanies'>
                  <span id='menu-link'>HATS & BEANIES</span>
                </Link>
                <Link href='/collections/accessories/boardbags'>
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