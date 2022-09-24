import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import './cart-icon.styles.scss'

export default function CartIcon({onCartClick}:{onCartClick: React.MouseEventHandler<HTMLDivElement>}) {
  const { cartItemsCount } = useContext(CartContext);
  return (
    <div className='cart-icon-container' onClick={onCartClick}>
      <ShoppingIcon className='shopping-icon'/>
      <span className='item-count'>{cartItemsCount}</span>
    </div>)
}