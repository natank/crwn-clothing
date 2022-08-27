import React, { useRef, useEffect, useState } from 'react';
import {
  useNavigate,
  useLocation,
  matchPath,
  Location,
} from 'react-router-dom';
// @ts-ignore
import mount from 'shop/ShopApp';

function ShopApp ()  {
  const location = useLocation()
  console.log(`in shopp app location = ${JSON.stringify(location)}`)
  const ref = useRef(null);
  const { pathname } = location;
  const navigate = useNavigate();
  let onParentNavigate: (location: Location) => void | undefined;
  useEffect(() => {
    const shopProps = mount(pathname, ref.current, {
      onNavigate: (props: {
        location: { pathname: string };
      }) => {
        console.log(`onNavigate pathname=${pathname} nextPathName=${props.location.pathname}`)
        const nextPathname = props.location.pathname;
        navigate(nextPathname);
      }
    });
    onParentNavigate = shopProps.onParentNavigate;
    onParentNavigate(location);
  }, [location]);
  return <div ref={ref} />;
};

export default ShopApp;
