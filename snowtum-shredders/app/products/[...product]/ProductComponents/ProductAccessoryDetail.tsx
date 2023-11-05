import { ProductType } from "@/app/types"
import React from "react";

export default function ProductAccessoryDetail ( {product}: {product: ProductType}) {
  // Converts product description to format
  function convertStringToJSX(inputString:string) {
    const lines = inputString.split('\\n');
    console.log(lines)
    const jsxLines = lines.map((line, index) => (
      <span key={index}>
        {`• ${line}`}
    </span>
    ));

    return jsxLines;
  }

  return (
    <section className='content-container-product-accessory-detail max-width-screen-[1920px]'>
      <div className='content-wider lg:px-16'>
        <div className='product-detail-accessory border-[1px] rounded-[30px] p-[30px] my-[100px]'>
          <div className='product-detail-accessory-content flex flex-col mx-6'>
            <span className='product-detail-title uppercase'>product details</span>
            {convertStringToJSX(product.description)}
          </div>
        </div>
      </div>
    </section>
  )
}