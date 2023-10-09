import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

// Components
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
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
      <head>
      <link href="https://fonts.googleapis.com/css2?family=Contrail+One&family=Holtwood+One+SC&family=Lilita+One&family=Tilt+Neon&display=swap" rel="stylesheet"/>
      </head>
      <body className={inter.className}>
        <Header/>
        {children}
      </body>
    </html>
  )
}
