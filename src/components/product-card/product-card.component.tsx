import { useContext } from 'react';
import {ProductCardContainer, ProductImage, Footer, Name, Price, Button } from './product-card.styles';

import { CartContext } from '../../context/cart.context';
export default function ProductCard({ product }: {product: PRODUCT_TYPE}) {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  function onItemAdded(){
    addItemToCart && addItemToCart(product);
  }
  return ( 
    <ProductCardContainer>
      <ProductImage src={imageUrl} alt={`${name}`}/>
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
        <Button onClick={onItemAdded} buttonType='inverted' type='button'>Add to cart</Button>
      </Footer>
    </ProductCardContainer>
  );
}

