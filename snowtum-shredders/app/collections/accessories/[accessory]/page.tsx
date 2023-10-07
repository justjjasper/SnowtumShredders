/* This is a dynamically routed page. Depending on the url, filter out from
accessory/ collection API
*/

interface AccessoryParams {
  params: {
    accessory: string
  }
};

export default async function AccessoryCollection( { params }: AccessoryParams){
  try {
    const data = await fetch('http://localhost:8000/accessories')
    const response = await data.json()

    // Change list of products depending on route parameter
    let products = []

    switch (params.accessory) {
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
          <div>Error in loading page</div>
        )
    }
    console.log(products)

    return (
      <div>
        All Accessories Page
      </div>
    )
  } catch(err) {
    console.log('Error', err)
    return (
      <div>
        Error loading page.
      </div>
    )
  }
};