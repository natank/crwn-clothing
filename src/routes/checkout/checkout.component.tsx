// @ts-nocheck
import { useSelector } from 'react-redux';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total
} from './checkout.styles';
import {
  selectCartItems,
  selectCartValue
} from '../../store/cart/cart.selector';
import PaymentForm from '../../components/payment-form/payment-form.component';
export default function Checkout() {
  const cartItems = useSelector(selectCartItems);
  const cartValue = useSelector(selectCartValue);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((cartItem) => (
        <CheckoutItem
          key={cartItem.id}
          cartItem={cartItem}
        />
      ))}
      <Total>Total: ${cartValue}</Total>

      <PaymentForm />
    </CheckoutContainer>
  );
}
