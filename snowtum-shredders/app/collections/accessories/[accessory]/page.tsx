interface AccessoryParams {
  params: {
    accessory: string
  }
};

export default function AccessoryCollection( { params }: AccessoryParams){
  console.log('what is accessoryParams', params.accessory)
  return (
    <div>
      {params.accessory}
    </div>
  )
};