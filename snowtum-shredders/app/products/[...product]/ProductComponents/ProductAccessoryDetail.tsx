import { ProductType } from "@/app/types"
import React from "react";

export default function ProductAccessoryDetail ( {product}: {product: ProductType}) {
 // Function to add line breaks while preserving the bullets
  function formatDescription(description:string) {
    const items = description.split('•').map(item => item.trim()).filter(Boolean);
    return items.map((item, index) => (
      <React.Fragment key={index}>
        {index > 0 && <br />} • {item}
      </React.Fragment>
    ));
  }

  return (
    <section className='content-container-product-accessory-detail max-width-screen-[1920px]'>
      <div className='content-wider lg:px-16'>
        <div className='product-detail-accessory border-[1px] rounded-[30px] p-[30px] my-[100px]'>
          <div className='product-detail-accessory-content mx-6'>
            <span className='product-detail-title uppercase'>product details</span>
            <p>{formatDescription(product.description)}</p>
          </div>
        </div>
      </div>
    </section>
  )
}