// This is a dynamic routed page. Depending on the slug, it will call a certain API to get the data
// If its men, women, kids, filter from header description, for splitboard filter from snowboard name
import { snowboardsAPI } from '@/app/config'

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

    // Filter out products depending on route parameter
    switch(snowboardCategory) {
      case 'all-snowboards':
        products = response
        break;
      case 'snowboards-mens':
        products = response.filter((snowboard: Product) => {
          return /MEN|EVERYONE/.test(snowboard.header_description) && !snowboard.header_description.includes('WOMEN')
        })
        break;
      case 'snowboards-womens':
        products = response.filter((snowboard :Product) => {
          return /WOMEN|EVERYONE/.test(snowboard.header_description)
        })
        break;
      case 'snowboards-kids':
        products = response.filter((snowboard: Product) => {
          return snowboard.header_description.includes('YOUTH')
        })
        break;
      case 'split-snowboards':
        products = response.filter((snowboard: Product) => {
          return snowboard.snowboard_name.includes('SPLIT')
        })
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
      <div>
        {params.snowboards}
      </div>
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