import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import { CartContext } from '../../context/cart.context';
import { UserContext } from '../../context/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils'
import {NavigationContainer, NavLinks, NavLink, LogoContainer } from './navigation.styles';

const Navigation = () => {
  const userContext = useContext(UserContext);
  const {isCartOpen, setIsCartOpen} = useContext(CartContext);
  const { currentUser } = userContext ? userContext : { currentUser: null };
  
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">
            SHOP
          </NavLink>
          <>{
              currentUser ? (
                <NavLink to="/auth">
                  <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
                </NavLink>) : 
                (<NavLink to='/auth'>SIGN IN</NavLink>)
          }</>
          <CartIcon onCartClick={()=> setIsCartOpen && setIsCartOpen(!isCartOpen)}/>
        </NavLinks>
        {isCartOpen ? <CartDropdown /> : null}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
