import { Link } from 'react-router-dom';
const Landing = () => {
  return (
    <div>
      <h1>I am the shop landing page</h1>
      <Link to="/cart">Cart</Link>
    </div>
  );
};
export default Landing;
