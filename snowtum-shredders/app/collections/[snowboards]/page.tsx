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