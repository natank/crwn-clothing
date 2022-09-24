import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './cart-dropdown.styles.scss';
import Button from '../button/button.component'
import { CartContext } from '../../context/cart.context';
import CartItem from '../cart-item/cart-item.component';

export default function CartDropdown(){
  const { cartItems } = useContext(CartContext);
  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.map((item)=>(<CartItem key={item.id} cartItem={item} />))}
      </div>
      <Link to='/checkout'><Button type='button'>Go To Checkout</Button></Link>
    </div>
  )
}