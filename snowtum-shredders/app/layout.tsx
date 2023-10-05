import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

// Components
import NavBar from './components/Navbar/NavBar'

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
        <NavBar/>
        {children}
      </body>
    </html>
  )
}
