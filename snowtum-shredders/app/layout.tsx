import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

// Components
import Header from './components/Header/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Snowtum Shredders',
  description: 'An e-commerce website that sells snowboard and gears.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header/>
        {/*Wrapped a div around children pages so they all have a lower z-index than the nav. Also "scooted" up the page*/}
        <div className='relative bottom-[100px] z-20'>
          {children}
        </div>
      </body>
    </html>
  )
}
