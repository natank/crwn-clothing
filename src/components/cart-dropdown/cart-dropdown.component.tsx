import { useContext } from 'react';
import { Link } from 'react-router-dom';
import {CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles';
import Button from '../button/button.component'
import { CartContext } from '../../context/cart.context';
import CartItem from '../cart-item/cart-item.component';

export default function CartDropdown(){
  const { cartItems } = useContext(CartContext);
  return (
    <CartDropdownContainer>
      <CartItems>
        {
          cartItems.length ? 
            (cartItems.map((item)=>(<CartItem key={item.id} cartItem={item} />)))
            :
            (<EmptyMessage>Your cart is empty</EmptyMessage>)
        }
      </CartItems>
      <Link to='/checkout'><Button type='button'>Go To Checkout</Button></Link>
    </CartDropdownContainer>
  )
}