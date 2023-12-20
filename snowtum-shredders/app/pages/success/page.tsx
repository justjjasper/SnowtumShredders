import Image from "next/image"

export default function Success() {
  return (
    <main className='mb-[100px] font-calibre'>
      <section className='flex flex-col items-center py-14 px-4 gap-5'>
        <Image
          src='https://ouch-cdn2.icons8.com/ezWo4RG8UijT_HDpDVEzO3z-YZMhRhpd2RrtcNTfCaM/rs:fit:525:456/extend:false/wm:1:re:0:0:0.8/wmid:ouch/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMTYz/LzJjNjc2ZDI1LThi/ZDItNDE0YS1hMWE1/LWMzY2U5YmJjZjQw/ZS5zdmc.png'
          height={200}
          width={200}
          alt= 'Uh Oh Image'
        />
        <span className='text-3xl sm:text-5xl font-bold'>Thank you for your purchase!</span>
        <span>Enjoy your product and have at the slopes!</span>
      </section>
    </main>
  )
}