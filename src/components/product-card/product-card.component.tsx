import { useContext } from 'react';
import './product-card.styles.scss';
import Button from '../button/button.component';
import { CartContext } from '../../context/cart.context';
export default function ProductCard({ product }: {product: PRODUCT_TYPE}) {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  function onItemAdded(){
    addItemToCart && addItemToCart(product);
  }
  return ( 
    <div className='product-card-container'>
      <img src={imageUrl} alt={`${name}`}/>
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
        <Button onClick={onItemAdded} buttonType='inverted' type='button'>Add to cart</Button>
      </div>
    </div>
  );
}

