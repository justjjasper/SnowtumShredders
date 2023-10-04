/* This is a dynamically routed page. Depending on the url, filter out from
accessory/ collection API

*/
interface AccessoryParams {
  params: {
    accessory: string
  }
};

export default function AccessoryCollection( { params }: AccessoryParams){
  if (params.accessory === 'all-accessories') {

  }
  return (
    <div>
      {params.accessory}
    </div>
  )
};