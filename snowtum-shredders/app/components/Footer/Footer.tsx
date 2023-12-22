import Link from "next/link"

export default function Footer() {
  return (
    //Implemented negative margin top to compensate white space created from displacing certain info with bottom-100px
    <section className='footer flex flex-col items-center text-[14px] mt-[-100px] border-t-2 border-secondary py-10'>
      <div className='flex justify-between w-10/12'>
        <div className='first-column relative flex flex-col'>
          <Link href='/info/contact'>Contact Us</Link>
          <Link href='/info/terms'>Terms and Conditions</Link>

        </div>
        <div className='second-column relative flex flex-col'>
          <Link href='/info/shipping'>Shipping Policy</Link>
          <Link href='/info/returns'>Returns</Link>
          <Link href='/info/payments'>Payments</Link>
        </div>
        <div className='third-column relative flex flex-col'>
          <Link href='/info/register-snowboards'>Register Snowboards</Link>
          <Link href='/info/warranty'>Warranty</Link>
        </div>

      </div>
      <div className='w-10/12 pt-5'>
        <span className='text-[12px]'>© 2023 Snowtum Shredders Snowboards</span>
      </div>
    </section>
  )
}