import React, { useRef, useEffect } from 'react';
import {
  useNavigate,
  useLocation,
  matchPath
} from 'react-router-dom';
// @ts-ignore
import mount from 'shop/ShopApp';

const ShopApp = () => {
  const ref = useRef(null);
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  let onParentNavigate: () => void | undefined;
  useEffect(() => {
    const shopProps = mount(ref.current, {
      onNavigate: ({
        pathname: nextPathname
      }: {
        pathname: string;
      }) => {
        if (!matchPath(pathname, nextPathname))
          navigate(nextPathname);
      }
    });
    onParentNavigate = shopProps.onParentNavigate;
    onParentNavigate();
  }, [location]);
  return <div ref={ref} />;
};

export default ShopApp;
