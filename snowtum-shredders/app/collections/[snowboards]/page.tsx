// This is a dynamic routed page. Depending on the slug, it will call a certain API to get the data
// If its men, women, kids, filter from header description, for splitboard filter from snowboard name
import './collectionSnowboards.css'
import { snowboardsAPI } from '@/app/config'
import SortingOptions from '@/app/components/Collections/SortingOptions'
import AsideSnowboards from '@/app/components/Collections/Snowboards/AsideSnowboard'
import SnowboardList from '@/app/components/Collections/Snowboards/SnowboardList'

interface SnowboardCollectionParams {
  params: {
    snowboards: string
  },
  searchParams: {
    sort_by: string
  }
};

export interface MetaDataType {
  size: string;
  sku: number
}

export interface SnowboardProductType {
  snowboard_id: number,
  snowboard_name: string;
  snowboard_price: number;
  snowboard_image: string;
  header_description: string
  snowboard_meta_data: MetaDataType[]
}

export default async function SnowboardCollection( { params, searchParams }: SnowboardCollectionParams){

  try {
    const data = await fetch(`${snowboardsAPI}`)
    const response = await data.json()

    let products: SnowboardProductType[] = []
    const snowboardCategory = params.snowboards
    let categoryHeader = ''

    // Filter out products depending on route parameter
    switch(snowboardCategory) {
      case 'all-snowboards':
        products = response.reverse()
        categoryHeader= 'ALL SNOWBOARDS'
        break;
      case 'snowboards-mens':
        products = response.filter((snowboard: SnowboardProductType) => {
          return /MEN|EVERYONE/.test(snowboard.header_description) && !snowboard.header_description.includes('WOMEN')
        }).reverse()
        categoryHeader= 'MEN\'S SNOWBOARDS'
        break;
      case 'snowboards-womens':
        products = response.filter((snowboard: SnowboardProductType) => {
          return /WOMEN|EVERYONE/.test(snowboard.header_description)
        }).reverse()
        categoryHeader= 'WOMEN\'S SNOWBOARDS'
        break;
      case 'snowboards-kids':
        products = response.filter((snowboard: SnowboardProductType) => {
          return snowboard.header_description.includes('YOUTH')
        }).reverse()
        categoryHeader= 'KID\'S SNOWBOARDS'
        break;
      case 'split-snowboards':
        products = response.filter((snowboard: SnowboardProductType) => {
          return snowboard.snowboard_name.includes('SPLIT')
        }).reverse()
        categoryHeader= 'SPLITBOARDS'
        break;
      default:
        return (
          <div>
            Error in loading Snowboards Page
          </div>
        )
    }

    // Filter out any search params, this replaced my state issue of trying to re-render UI after sorting "products"
    let { sort_by } = searchParams

    switch(sort_by) {
      case ('newest'):
        products = products.sort((a, b) => a.snowboard_id - b.snowboard_id)
        break;
      case ('featured'):
        products = products.sort((a, b) => b.snowboard_id - a.snowboard_id)
        break;
      case('price-descending'):
        products = products.sort((a, b) => b.snowboard_price - a.snowboard_price)
        break;
      case('price-ascending'):
        products = products.sort((a, b) => a.snowboard_price - b.snowboard_price)
        break;
      default:
    }

    return (
      // Don't forget the bottom-[100px] within the main tag
      <main className='relative bottom-[100px] z-20'>
        <div className={`relative pt-32 bg-[url('https://capitasnowboarding.com/cdn/shop/files/000_GRID_PAPER_BG_1_77e3e65d-56ba-4a1f-a70b-76408f3b3cbf.png?v=1690637051')]`}>

          <div className='content-container flex flex-col px-3 md:px-16 text-primary font-calibre'>

            <section className='content-top relative flex flex-col lg:flex-row lg:items-end justify-between pb-2'>
              <span className='text-3xl lg:text-5xl font-bold tracking-tighter'>{categoryHeader}</span>
              {/* Implement filtering method */}
              <SortingOptions productCategory={snowboardCategory}/>
            </section>

            <section className='content-listing flex flex-col items-center xl:items-start xl:flex-row justify-between py-6 sm:py-7 xl:py-20'>
              {/* Side Filter*/}
              <AsideSnowboards/>
              {/* List of Snowboard Products */}
              <SnowboardList products={products}/>
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