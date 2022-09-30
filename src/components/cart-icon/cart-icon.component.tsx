import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import { CartIconContainer, ShoppingIcon, ItemCount} from './cart-icon.styles'

export default function CartIcon({onCartClick}:{onCartClick: React.MouseEventHandler<HTMLDivElement>}) {
  const { cartItemsCount } = useContext(CartContext);
  return (
    <CartIconContainer onClick={onCartClick}>
      <ShoppingIcon />
      <ItemCount>{cartItemsCount}</ItemCount>
    </CartIconContainer>)
}