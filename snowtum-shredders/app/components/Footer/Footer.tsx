import Link from "next/link"

export default function Footer() {


  return (
    //Implemented negative margin top to compensate white space created from displacing certain pages with bottom-100px
    <section className='footer flex justify-around items-center mt-[-100px]'>
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
    </section>
  )
}