import { useDispatch } from 'react-redux';
import { addCartItem } from '../../store/cart/cart.action';
import {
  ProductCardContainer,
  ProductImage,
  Footer,
  Name,
  Price,
  Button
} from './product-card.styles';

export default function ProductCard({
  product
}: {
  product: PRODUCT_TYPE;
}) {
  const { name, price, imageUrl } = product;
  const dispatch = useDispatch();

  function onItemAdded() {
    dispatch(addCartItem(product));
  }
  return (
    <ProductCardContainer>
      <ProductImage src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
        <Button
          onClick={onItemAdded}
          buttonType="inverted"
          type="button"
        >
          Add to cart
        </Button>
      </Footer>
    </ProductCardContainer>
  );
}
