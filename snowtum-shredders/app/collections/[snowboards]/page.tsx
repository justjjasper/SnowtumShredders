// This is a dynamic routed page. Depending on the slug, it will call a certain API to get the data
// If its men, women, kids, filter from header description, for splitboard filter from snowboard name
import { snowboardsAPI } from '@/app/config'
import './collectionSnowboards.css'

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
  console.log('what is snowboardCollectionParams', params.snowboards)

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

    console.log(products, snowboardCategory)
    return (
      // Don't forget the bottom-[100px] within the main tag
      <main className='relative bottom-[100px] z-20'>
        <div className={`bg-[url('https://capitasnowboarding.com/cdn/shop/files/000_GRID_PAPER_BG_1_77e3e65d-56ba-4a1f-a70b-76408f3b3cbf.png?v=1690637051')] h-[1000px] relative pt-32`}>
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
            <section className='content-listing'>
              <aside className='content-aside-filter'></aside>
              <div className='content-list'></div>
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