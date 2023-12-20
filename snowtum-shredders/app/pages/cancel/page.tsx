import Image from "next/image"

export default function Cancel() {
  return (
    <div className='mb-[100px] font-calibre'>
      <section className='flex flex-col items-center py-14 px-4 gap-5'>
        <Image
          src='https://cdn-icons-png.flaticon.com/512/396/396600.png'
          height={200}
          width={200}
          alt= 'Uh Oh Image'
        />
        <span className='text-3xl sm:text-5xl font-bold'>Uh Oh</span>
        <span>Looks like something went wrong with your purchase. Please try checking out again.</span>
      </section>
    </div>
  )
}