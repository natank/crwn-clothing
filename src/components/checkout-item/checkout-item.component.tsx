import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import './checkout-item.styles.scss';


export default function CheckoutItem({ cartItem }: { cartItem: CART_ITEM_TYPE}){
  const { removeItemFromCart, incrementQty, decrementQty } = useContext(CartContext);
  const { id, name, imageUrl, price, quantity } = cartItem;
  
  const clearItemHandler = () => {removeItemFromCart && removeItemFromCart(id)};
  const addItemHandler = () => { incrementQty && incrementQty(id) };
  const removeItemHanlder = () => { decrementQty && decrementQty(id) }

  return <div className='checkout-item-container'>
      <img src={imageUrl} className='image-container' alt={name}/>
      <span className='name'>{name}</span>
      <span className='quantity' >
        <div className='arrow' onClick={ removeItemHanlder}>&#10094;</div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={ addItemHandler }>&#10095;</div>
      </span>
      <span className='price'>{price}</span>
      <div className='remove-button' onClick={ clearItemHandler }>&#10005;</div>
    </div>
}