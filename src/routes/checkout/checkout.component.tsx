import { useContext } from 'react';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { CartContext } from '../../context/cart.context';

export default function Checkout() {
  const { cartItems, cartValue } = useContext(CartContext);
  return <div>
    {
      cartItems.map(cartItem =>
        <CheckoutItem key={cartItem.id} checkoutItem={cartItem}/>)
    }
    <div>Total: ${cartValue} </div>
  </div>
}