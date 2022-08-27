import { Link } from 'react-router-dom';

const Cart = () => {
  console.log('rendering the cart')
  return (
    <div>
      <h1>I am the cart page</h1>
      <Link to="/shop">Shop</Link>
    </div>
  );
};

export default Cart;
