// This is a dynamic routed page. Depending on the slug, it will call a certain API to get the data
interface SnowboardCollectionParams {
  params: {
    snowboards: string
  }
};

export default function SnowboardCollection( { params }: SnowboardCollectionParams){
  console.log('what is snowboardCollectionParams', params.snowboards)
  return (
    <div>
      {params.snowboards}
    </div>
  )
};