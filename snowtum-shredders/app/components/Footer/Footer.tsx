import Link from "next/link"

export default function Footer() {

  return (
    <div className='flex justify-around items-center'>
      <div className='first-column relative flex flex-col'>
        <Link href='/pages/contact' className='hover:underline'>Contact Us</Link>
        <Link href='/pages/terms' className='hover:underline'>Terms and Conditions</Link>

      </div>
      <div className='second-column relative flex flex-col'>
        <Link href='/pages/shipping' className='hover:underline'>Shipping Policy</Link>
        <Link href='/pages/returns' className='hover:underline'>Returns</Link>
        <Link href='/pages/payments' className='hover:underline'>Payments</Link>
      </div>
      <div className='third-column relative flex flex-col'>
        <Link href='/pages/register-snowboards' className='hover:underline'>Register Snowboards</Link>
        <Link href='/pages/warranty' className='hover:underline'>Warranty</Link>
      </div>
    </div>
  )
}