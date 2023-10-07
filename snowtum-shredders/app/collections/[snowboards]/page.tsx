// This is a dynamic routed page. Depending on the slug, it will call a certain API to get the data
// If its men, women, kids, filter from header description, for splitboard filter from snowboard name
import { snowboardsAPI } from '@/app/config'

interface SnowboardCollectionParams {
  params: {
    snowboards: string
  }
};

export default async function SnowboardCollection( { params }: SnowboardCollectionParams){
  console.log('what is snowboardCollectionParams', params.snowboards)
  try {
    const data = await fetch(`${snowboardsAPI}`)
    const response = await data.json()

    let products = []
    const snowboardCategory = params.snowboards

    // Filter out products depending on route parameter
    switch(snowboardCategory) {
      case 'all-snowboards':
        products = response
        break;

    }

    console.log(products)
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