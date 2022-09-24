import './cart-item.styles.scss'

export default function CartItem({cartItem}: {cartItem: CART_ITEM_TYPE}) {
  const { name, imageUrl,price ,quantity } = cartItem;
  return (
    <div className='cart-item-container'>
      <img src={imageUrl} alt={`${name}`} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          ${quantity} x ${price}
        </span>
      </div>
    </div>
  )
}