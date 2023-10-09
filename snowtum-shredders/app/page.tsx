import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div  style={{width: '100%', height: '100%'}}
        className='relative flex justify-center'
        >
        <Image
          src='https://res.cloudinary.com/jasjasper/image/upload/v1696808288/snowtum-shredders-banner_xcxkev.png'
          alt='Snowtum Shredder Banner'
          width={500}
          height={500}
          priority={true}
          className='w-full'
        />
        <Link href='/collections/all-snowboards'
          className='absolute flex font-calibre font-bold tracking-tighter bg-primary self-end bottom-[93px] py-4 hover:underline w-3/12 justify-center rounded-full'
          >
            OPEN YOUR MIND
        </Link>
      </div>

    </div>
  )
}
