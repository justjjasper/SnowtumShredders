import Image from "next/image"
import Link from "next/link"

export default async function NavBar() {

  return (
    <div className='flex justify-between px-16 py-8 border-2 border-white'>
      <Link href='/'>Snowtum Shredders</Link>

      <nav className='flex flex-grow justify-around'>
        <ul className='flex w-8/12 justify-evenly'>
          <Link href='/collections/all-snowboards'>SNOWBOARDS</Link>
          <Link href='/collections/accessories/all-accessories'>ACCESSORIES</Link>
          <Link href='/'>TEAM</Link>
        </ul>
      </nav>

      <div className='buttons'>
        <button>Search</button>
        <button>Cart</button>
      </div>
    </div>
  )
}
