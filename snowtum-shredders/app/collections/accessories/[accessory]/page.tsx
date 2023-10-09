/* This is a dynamically routed page. Depending on the url, filter out from
accessory/ collection API
*/
import { accessoriesAPI } from '@/app/config'

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
      <div className='relative bottom-[100px] z-20'>
        All Accessories Page
        {accessoryType}
      </div>
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