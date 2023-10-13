/* This is a dynamically routed page. Depending on the url, filter out from
accessory/ collection API
*/
import { accessoriesAPI } from '@/app/config'
import AsideAccessories from '@/app/components/Collections/AsideAccessories'

interface AccessoryParams {
  params: {
    accessory: string
  }
};

export default async function AccessoryCollection( { params }: AccessoryParams){
  try {
    const data = await fetch(`${accessoriesAPI}`)
    const response = await data.json()

    let products = []
    const accessoryType = params.accessory

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
    console.log(products)

    return (
      // Don't forget the bottom-[100px] within the main tag
      <main className='relative bottom-[100px] z-20'>
        <div className={`relative pt-32 bg-[url('https://capitasnowboarding.com/cdn/shop/files/000_GRID_PAPER_BG_1_77e3e65d-56ba-4a1f-a70b-76408f3b3cbf.png?v=1690637051')]`}>
          <div className='content-container flex flex-col px-16 text-primary font-calibre'>

            <section className='content-top relative flex items-end justify-between pb-2'>
              <span className='text-5xl font-bold tracking-tighter'>ACCESSORIES</span>
              {/* Implement filtering method */}
              <div className='top-sorting-options text-sm font-semibold'>
                <span className='mx-[8px]'>NEWEST</span>|
                <span className='mx-[8px]'>FEATURED</span>|
                <span className='mx-[8px]'>PRICE: HIGH - LOW</span>|
                <span className='mx-[8px]'>PRICE: LOW - HIGH</span>
              </div>
            </section>

            <section className='content-listing flex py-20'>
              <AsideAccessories/>
              <div className='content-list'> im content </div>
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