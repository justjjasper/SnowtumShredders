import Link from "next/link"

export default function Footer() {


  return (
    //Implemented negative margin top to compensate white space created from displacing certain pages with bottom-100px
    <section className='footer flex flex-col items-center mt-[-100px] text-[14px] border-t-2 border-secondary py-10'>
      <div className='flex justify-between w-10/12'>
        <div className='first-column relative flex flex-col'>
          <Link href='/pages/contact'>Contact Us</Link>
          <Link href='/pages/terms'>Terms and Conditions</Link>

        </div>
        <div className='second-column relative flex flex-col'>
          <Link href='/pages/shipping'>Shipping Policy</Link>
          <Link href='/pages/returns'>Returns</Link>
          <Link href='/pages/payments'>Payments</Link>
        </div>
        <div className='third-column relative flex flex-col'>
          <Link href='/pages/register-snowboards'>Register Snowboards</Link>
          <Link href='/pages/warranty'>Warranty</Link>
        </div>

      </div>
      <div className='w-10/12 pt-5'>
        <span className='text-[12px]'>© 2023 Snowtum Shredders Snowboards</span>
      </div>
    </section>
  )
}