import Image from "next/image"
import Link from "next/link"
// Import Icons
import { searchSVG, cartSVG } from "@/app/Misc/Icons"

export default async function NavBar() {
  return (
    <div className='flex justify-between px-16 py-8 border-2 border-white font-calibre font-bold sticky top-0 backdrop-blur-md items-center'>
      <Link href='/'>SNOWTUM SHREDDERS</Link>

      <nav className='flex flex-grow justify-around'>
        <ul className='flex w-8/12 justify-evenly'>
          <Link href='/collections/all-snowboards'>SNOWBOARDS</Link>
          <Link href='/collections/accessories/all-accessories'>ACCESSORIES</Link>
          <Link href='/'>TEAM</Link>
        </ul>
      </nav>

      <div className='flex'>
        <button>
          {searchSVG}
        </button>
        <button>
          {cartSVG}
        </button>
      </div>
    </div>
  )
}
