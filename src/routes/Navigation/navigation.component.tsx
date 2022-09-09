import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from '../../context/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils'
import './navigation.styles.scss';

const Navigation = () => {
  const userContext = useContext(UserContext);
  const { currentUser } = userContext ? userContext : { currentUser: null };

  console.log("currentUser =", currentUser)
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          <>{
              currentUser ? (
                <Link className="nav-link" to="/auth">
                  <span className='nav-link' onClick={signOutUser}>SIGN OUT</span>
                </Link>) : 
                (<Link className='navLink' to='/auth'>SIGN IN</Link>)
          }</>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
