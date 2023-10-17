
// This is a dynamic routed page. Depending on the slug, it will call a certain API to get the data
// If its men, women, kids, filter from header description, for splitboard filter from snowboard name
'use client'
import './collectionSnowboards.css'
import { snowboardsAPI } from '@/app/config'
import SortingOptions from '@/app/components/Collections/SortingOptions'
import AsideSnowboards from '@/app/components/Collections/Snowboards/AsideSnowboard'
import SnowboardList from '@/app/components/Collections/Snowboards/SnowboardList'
import SnowboardState from '@/app/components/Collections/Snowboards/SnowboardState'
import { useEffect, useState } from 'react'

interface SnowboardCollectionParams {
  params: {
    snowboards: string
  }
};

export interface MetaDataType {
  size: string;
  sku: number
}
export interface SnowboardProductType {
  snowboard_name: string;
  snowboard_price: number;
  snowboard_image: string;
  header_description: string
  snowboard_meta_data: MetaDataType[]
}

export default function SnowboardCollection( { params }: SnowboardCollectionParams){
  const snowboardCategory = params.snowboards
  const [products, setProducts] = useState<SnowboardProductType[]>([])
  const [categoryHeader, setCategoryHeader] = useState<string>('')

  useEffect(() => {
    async function getSnowboardProducts() {
      const data = await fetch(`${snowboardsAPI}`)
      const response = await data.json()

       // Filter out products depending on route parameter
      switch(snowboardCategory) {
        case 'all-snowboards':
          setProducts(response.reverse())
          setCategoryHeader('ALL SNOWBOARDS')
          break;
        case 'snowboards-mens':
          setProducts(response.filter((snowboard: SnowboardProductType) => {
            return /MEN|EVERYONE/.test(snowboard.header_description) && !snowboard.header_description.includes('WOMEN')
          }).reverse())
          setCategoryHeader('MEN\'S SNOWBOARDS')
          break;
        case 'snowboards-womens':
          setProducts(response.filter((snowboard: SnowboardProductType) => {
            return /WOMEN|EVERYONE/.test(snowboard.header_description)
          }).reverse())
          setCategoryHeader('WOMEN\'S SNOWBOARDS')
          break;
        case 'snowboards-kids':
          setProducts(response.filter((snowboard: SnowboardProductType) => {
            return snowboard.header_description.includes('YOUTH')
          }).reverse())
          setCategoryHeader('KID\'S SNOWBOARDS')
          break;
        case 'split-snowboards':
          setProducts(response.filter((snowboard: SnowboardProductType) => {
            return snowboard.snowboard_name.includes('SPLIT')
          }).reverse())
          setCategoryHeader('SPLITBOARDS')
          break;
        default:
          return (
            <div>
              Error in loading Snowboards Page
            </div>
          )
      }
    }

    getSnowboardProducts()
  },[])


    return (
      // Don't forget the bottom-[100px] within the main tag
      <main className='relative bottom-[100px] z-20'>
        <div className={`relative pt-32 bg-[url('https://capitasnowboarding.com/cdn/shop/files/000_GRID_PAPER_BG_1_77e3e65d-56ba-4a1f-a70b-76408f3b3cbf.png?v=1690637051')]`}>
          <div className='content-container flex flex-col px-16 text-primary font-calibre'>

            <section className='content-top relative flex items-end justify-between pb-2'>
              <span className='text-5xl font-bold tracking-tighter'>{categoryHeader}</span>
              {/* Implement filtering method */}
              <SortingOptions products={products} setProducts={setProducts}/>
            </section>

            <section className='content-listing flex justify-between py-20'>
              {/* Side Filter*/}
              <AsideSnowboards/>
              {/* List of Snowboard Products */}
              <SnowboardList products={products}/>
            </section>

          </div>
        </div>
      </main>
    )
};