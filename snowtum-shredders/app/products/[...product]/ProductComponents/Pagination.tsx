// TODO 11/12 Decide whether I want to use useState or queryParams as state
// TODO Decide if i need to use fragment indentifiers
import Link from "next/link";

export default function Pagination( {page}: {page: string}) {
  let number = 2

  console.log(`[Server] ${new Date().toISOString()}: Log message from the server`,page)
  return (
    <div className='spr-pagination relative pt-[10px]'>
      <div>
        {/* mapped out paginaton spans*/}
        <span className='spr-pagination-page is-active'>1</span>
        <span className='spr-pagination-page'><a>2</a></span>
        <span>
         <Link href='http://localhost:3000/products/snowboard/indoor-survival?page=3#spr-container'>3</Link>
         </span>
        <span>
         <Link href='http://localhost:3000/products/snowboard/indoor-survival?page=4#spr-container'>4</Link>
         </span>
        <span className='spr-pagination-next absolute right-0'><a>Next</a></span>
        <div>{number}</div>
      </div>
  </div>
  )
}