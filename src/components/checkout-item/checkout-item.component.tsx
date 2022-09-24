import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

export default function CheckoutItem({ checkoutItem }: { checkoutItem: CART_ITEM_TYPE}){
  const { removeItemFromCart, incrementQty, decrementQty } = useContext(CartContext);
  return <div style={{display: 'flex', alignItems: 'center', marginBottom: '2rem'}}>
      <img src={checkoutItem.imageUrl} style={{marginRight: '2rem', width: '7rem'}}/>
      <div style={{marginRight: '2rem', width: '7rem'}}>{checkoutItem.name}</div>
      <div style={{marginRight: '2rem', width: '7rem'}}>
        <button onClick={ () => { decrementQty && decrementQty(checkoutItem.id)}}>{'<'}</button>
        <span style={{padding: '1rem'}}>{checkoutItem.quantity}</span>
        <button onClick={ () => { incrementQty && incrementQty(checkoutItem.id)}}>{'>'}</button>
      </div>
      <div style={{marginRight: '2rem', width: '7rem'}}>{checkoutItem.price}</div>
      <button style={{marginRight: '2rem'}} id='remove' onClick={()=> {
        removeItemFromCart && removeItemFromCart(checkoutItem.id)}}>X</button>
    </div>
}