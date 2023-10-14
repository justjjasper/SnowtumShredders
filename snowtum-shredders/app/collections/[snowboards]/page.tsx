// This is a dynamic routed page. Depending on the slug, it will call a certain API to get the data
// If its men, women, kids, filter from header description, for splitboard filter from snowboard name
import { snowboardsAPI } from '@/app/config'
import AsideSnowboards from '@/app/components/Collections/AsideSnowboard'
import './collectionSnowboards.css'
import Link from 'next/link'
import Image from 'next/image'

interface SnowboardCollectionParams {
  params: {
    snowboards: string
  }
};

interface Product {
  snowboard_name: string;
  snowboard_price: number;
  snowboard_image: string;
  header_description: string
}

export default async function SnowboardCollection( { params }: SnowboardCollectionParams){
  // console.log('what is snowboardCollectionParams', params.snowboards)

  try {
    const data = await fetch(`${snowboardsAPI}`)
    const response = await data.json()

    let products: Product[] = []
    const snowboardCategory = params.snowboards
    let categoryHeader = ''
    // Filter out products depending on route parameter
    switch(snowboardCategory) {
      case 'all-snowboards':
        products = response
        categoryHeader= 'ALL SNOWBOARDS'
        break;
      case 'snowboards-mens':
        products = response.filter((snowboard: Product) => {
          return /MEN|EVERYONE/.test(snowboard.header_description) && !snowboard.header_description.includes('WOMEN')
        })
        categoryHeader= 'MEN\'S SNOWBOARDS'
        break;
      case 'snowboards-womens':
        products = response.filter((snowboard :Product) => {
          return /WOMEN|EVERYONE/.test(snowboard.header_description)
        })
        categoryHeader= 'WOMEN\'S SNOWBOARDS'
        break;
      case 'snowboards-kids':
        products = response.filter((snowboard: Product) => {
          return snowboard.header_description.includes('YOUTH')
        })
        categoryHeader= 'KID\'S SNOWBOARDS'
        break;
      case 'split-snowboards':
        products = response.filter((snowboard: Product) => {
          return snowboard.snowboard_name.includes('SPLIT')
        })
        categoryHeader= 'SPLITBOARDS'
        break;
      default:
        return (
          <div>
            Error in loading Snowboards Page
          </div>
        )
    }

    return (
      // Don't forget the bottom-[100px] within the main tag
      <main className='relative bottom-[100px] z-20'>
        <div className={`relative pt-32 bg-[url('https://capitasnowboarding.com/cdn/shop/files/000_GRID_PAPER_BG_1_77e3e65d-56ba-4a1f-a70b-76408f3b3cbf.png?v=1690637051')]`}>
          <div className='content-container flex flex-col px-16 text-primary font-calibre'>

            <section className='content-top relative flex items-end justify-between pb-2'>
              <span className='text-5xl font-bold tracking-tighter'>{categoryHeader}</span>
              {/* Implement filtering method */}
              <div className='top-sorting-options text-sm font-semibold'>
                <span className='mx-[8px]'>NEWEST</span>|
                <span className='mx-[8px]'>FEATURED</span>|
                <span className='mx-[8px]'>PRICE: HIGH - LOW</span>|
                <span className='mx-[8px]'>PRICE: LOW - HIGH</span>
              </div>
            </section>

            <section className='content-listing flex justify-between py-20'>
              <AsideSnowboards/>
              <div className='content-list flex flex-row flex-wrap gap-10 px-8'>
                {products.map((snowboard: Product, i: number) => {
                  return (
                    <div className='border-2 flex flex-col'
                      key={i}
                    >
                      <div>
                        <Image
                          src={snowboard.snowboard_image}
                          width={225}
                          height={337}
                          alt={`${snowboard.snowboard_name} Image`}
                          className='transition-transform ease-in-out duration-300 hover:scale-110 transform'
                        />
                      </div>
                      <span className='flex text-xs w-[30ch]'>{snowboard.header_description} </span>
                      <span className='flex'>{snowboard.snowboard_name}</span>
                      <span className='flex'>{snowboard.snowboard_price}</span>
                    </div>
                  )
                })}
              </div>
            </section>

          </div>
        </div>
      </main>
    )
  } catch(err) {
    console.log('Error', err)
    return (
      <div>
        Error loading Collection of Snowboards page.
      </div>
    )
  }
};