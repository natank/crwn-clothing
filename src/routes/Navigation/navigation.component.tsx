import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import {
  NavigationContainer,
  NavLinks,
  NavLink,
  LogoContainer
} from './navigation.styles';

import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { toggleCart } from '../../store/cart/cart.action';

const Navigation = () => {
  // @ts-ignore
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          <>
            {currentUser ? (
              <NavLink to="/auth">
                <NavLink as="span" onClick={signOutUser}>
                  SIGN OUT
                </NavLink>
              </NavLink>
            ) : (
              <NavLink to="/auth">SIGN IN</NavLink>
            )}
          </>
          <CartIcon
            onCartClick={() => dispatch(toggleCart())}
          />
        </NavLinks>
        {isCartOpen ? <CartDropdown /> : null}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
