import { useSelector } from 'react-redux';
import { selectCartItemsCount } from '../../store/cart/cart.selector';

import {
  CartIconContainer,
  ShoppingIcon,
  ItemCount
} from './cart-icon.styles';

export default function CartIcon({
  onCartClick
}: {
  onCartClick: React.MouseEventHandler<HTMLDivElement>;
}) {
  const cartItemsCount = useSelector(selectCartItemsCount);
  return (
    <CartIconContainer onClick={onCartClick}>
      <ShoppingIcon />
      <ItemCount>{cartItemsCount}</ItemCount>
    </CartIconContainer>
  );
}
