import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { GoogleTagManager } from '@next/third-parties/google'

// Components
import NavBar from './components/Header/NavBar'
import Footer from './components/Footer/Footer'
import { ReduxProvider } from './redux/provider'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Snowtum Shredders',
  description: 'An e-commerce website that sells snowboards and gears.'
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
        <link rel='preload' as='image' href='https://res.cloudinary.com/jasjasper/image/upload/v1696808288/snowtum-shredders-banner_xcxkev.png'/>
      </head>
      <body className={inter.className}>
        <ReduxProvider>
          <NavBar/>
          {children}
          <Footer/>
        </ReduxProvider>
      </body>
      <GoogleTagManager gtmId='GTM-TBKJ9BD9'/>
    </html>
  )
}
