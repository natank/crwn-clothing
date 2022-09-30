import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import { CheckoutItemContainer, ImageContainer, Name, Arrow, Value, Price, RemoveButton, Quantity} from './checkout-item.styles';


export default function CheckoutItem({ cartItem }: { cartItem: CART_ITEM_TYPE}){
  const { removeItemFromCart, incrementQty, decrementQty } = useContext(CartContext);
  const { id, name, imageUrl, price, quantity } = cartItem;
  
  const clearItemHandler = () => {removeItemFromCart && removeItemFromCart(id)};
  const addItemHandler = () => { incrementQty && incrementQty(id) };
  const removeItemHanlder = () => { decrementQty && decrementQty(id) }

  return <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name}/>
      </ImageContainer>
      <Name>{name}</Name>
      <Quantity >
        <Arrow onClick={ removeItemHanlder}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={ addItemHandler }>&#10095;</Arrow>
      </Quantity>
      <Price>{price}</Price>
      <RemoveButton onClick={ clearItemHandler }>&#10005;</RemoveButton>
    </CheckoutItemContainer>
}