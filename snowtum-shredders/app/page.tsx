import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div  style={{width: '100%', height: '100%'}}
        className='relative flex justify-center'
        >
        <Image
          src='https://capitasnowboarding.com/cdn/shop/files/D_hompage_herobanner.png?v=1690534716'
          alt='Snowtum Shredder Banner'
          width={500}
          height={500}
          priority={true}
          className='w-full'
        />
        <Link href='/collections/all-snowboards'
          className='absolute flex border-2 bg-primary self-end'
          >
            Open Your Mind
        </Link>
      </div>

    </div>
  )
}
