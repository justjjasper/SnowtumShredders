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

   let products = []

  //  if (params.accessory === 'all-accessories') {
  //   for (let accessories in response) {
  //     for (let product of accessories) {
  //       products.push(product)
  //     }
  //   }
  //  }
    console.log(response)

    return (
      <div>
        hello haha
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