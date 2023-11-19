
interface CartProps {
  cartHovered: boolean;
  onMouseLeave: () => void;
}

export default function Cart ( {cartHovered, onMouseLeave}: CartProps ) {
  return (
    <div className={`cart-form px-[120px] overflow-auto h-screen hovered:mt-[-h-screen]
      ${cartHovered ? 'flex' : 'hidden'}`}
      onMouseLeave={onMouseLeave}
      >
      <form className='block w-full'>
        <div className='cart-container max-w-[1428px] mx-auto w-full'>
          <span className='msg-empty-cart block py-[100px] text-center w-full'>CART EMPTY</span>
          <div id='cart-info-hidden' data-id='id + size' data-limit='sku'></div>
          <div id='cart-info'>
            {/* //? This is going to be Dyanmic for each item added to cart */}
            <div className='cart-item'>
              <div className='cart-item-container hidden'>
                {/* <Link className='cart-item-image'><Image/></Link> */}
                <div className='cart-item-info'>
                  <span>Name - Size</span>
                </div>
                <div className='cart-item-quantity'>
                  <button></button>
                  <span className='cart-item-quantity-tot'></span>
                  <button></button>
                </div>
                <span className='cart-item-price'></span>
              </div>
              <div className='cart-line'></div>
            </div>
          </div>
          <div className='cart-summary'></div>
        </div>
      </form>
    </div>
  )
}