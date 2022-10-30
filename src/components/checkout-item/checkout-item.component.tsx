import { useDispatch } from 'react-redux';
import {
  CheckoutItemContainer,
  ImageContainer,
  Name,
  Arrow,
  Value,
  Price,
  RemoveButton,
  Quantity
} from './checkout-item.styles';
import {
  removeCartItem,
  incrementQty,
  decrementQty
} from '../../store/cart/cart.action';

export default function CheckoutItem({
  cartItem
}: {
  cartItem: CART_ITEM_TYPE;
}) {
  const { id, name, imageUrl, price, quantity } = cartItem;
  const dispatch = useDispatch();
  const clearItemHandler = () => {
    dispatch(removeCartItem(id));
  };
  const addItemHandler = () => {
    dispatch(incrementQty(id));
  };
  const removeItemHanlder = () => {
    dispatch(decrementQty(id));
  };

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <Name>{name}</Name>
      <Quantity>
        <Arrow onClick={removeItemHanlder}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <Price>{price}</Price>
      <RemoveButton onClick={clearItemHandler}>
        &#10005;
      </RemoveButton>
    </CheckoutItemContainer>
  );
}
