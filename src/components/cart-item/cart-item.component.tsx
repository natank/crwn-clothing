import {
  CartItemContainer,
  CartItemImage,
  ItemDetails,
  ItemName
} from './cart-item.styles';

export default function CartItem({
  cartItem
}: {
  cartItem: CART_ITEM_TYPE;
}) {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CartItemContainer>
      <CartItemImage src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <ItemName>{name}</ItemName>
        <span>
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
}
