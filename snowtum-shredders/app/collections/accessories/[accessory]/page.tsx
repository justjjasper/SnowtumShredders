/* This is a dynamically routed page. Depending on the url, filter out from
accessory/ collection API
*/
import '@/app/components/Collections/CollectionsPage.css'
import { accessoriesAPI } from '@/app/config'
import AsideAccessories from '@/app/components/Collections/Accessories/AsideAccessories'
import SortingOptions from '@/app/components/Collections/SortingOptions'
import AccessoryList from '@/app/components/Collections/Accessories/AccessoryList'

interface AccessoryParams {
  params: {
    accessory: string
  },
  searchParams: {
    sort_by: string
  }
};

export interface AccessoryProductType {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  meta_data: MetaDataType[]
}

export default async function AccessoryCollection( { params, searchParams }: AccessoryParams){
  try {
    const data = await fetch(`${accessoriesAPI}`)
    const response = await data.json()

    let products: AccessoryProductType[] = []
    const accessoryType = params.accessory
    const productCategory = `accessories/${accessoryType}` // added accessories to filter properly when passed as prop to Sorting Options

    // Change list of products depending on route parameter
    switch (accessoryType) {
      case 'all-accessories':
        for (let accessories in response) {
          for (let product of response[accessories]) {
            products.push(product)
          }
        }
        products = products
        break;
      case 'tshirts':
        products = response.tshirts
        break;
      case 'hoodies':
        products = response.hoodies
        break;
      case 'hats-beanies':
        products = response.headgear
        break;
      case 'boardbags':
        products = response.boardbag
        break;
      default:
        return (
          <div>Error in loading Accessories page</div>
        )
    }

    let { sort_by } = searchParams

    switch(sort_by) {
      case ('newest'):
        products = products.sort((a, b) => a.id - b.id)
        break;
      case ('featured'):
        products = products.sort((a, b) => b.id - a.id)
        break;
      case('price-descending'):
        products = products.sort((a, b) => b.price - a.price)
        break;
      case('price-ascending'):
        products = products.sort((a, b) => a.price - b.price)
        break;
      default:
    }

    return (
      // Don't forget the bottom-[100px] within the main tag
      <main className='relative bottom-[95px] sm:bottom-[100px]'>
        <div className={`relative pt-32 bg-[url('https://capitasnowboarding.com/cdn/shop/files/000_GRID_PAPER_BG_1_77e3e65d-56ba-4a1f-a70b-76408f3b3cbf.png?v=1690637051')]`}>

          <div className='content-container flex flex-col px-3 md:px-16 text-primary font-calibre'>

            <section className='content-top relative flex flex-col lg:flex-row lg:items-end justify-between pb-2'>
              <span className='text-3xl lg:text-5xl font-bold tracking-tighter'>ACCESSORIES</span>
              {/* Implement filtering method */}
              <SortingOptions productCategory={productCategory}/>
            </section>

            <section className='content-listing flex flex-col items-center xl:items-start xl:flex-row justify-between py-6 sm:py-7 xl:py-20'>
              {/* Side Filter*/}
              <AsideAccessories/>
              {/* List of Snowboard Products */}
              <AccessoryList products={products} />
            </section>

          </div>
        </div>
      </main>
    )
  } catch(err) {
    console.log('Error', err)
    return (
      <div>
        Error loading Collection of Accessories page.
      </div>
    )
  }
};