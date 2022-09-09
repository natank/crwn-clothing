import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core/styles';
import Landing from './components/Landing';
import Cart from './components/Cart';

export default function App({ onNavigate , initialPath}: { initialPath: string, onNavigate?: ({ pathname }: { pathname: string })=> void }) {
  console.log(`rendering shop with history ${JSON.stringify(history)}`)
  const location = useLocation()
	const {pathname} = location;
	const navigate = useNavigate();
	useEffect(()=>{
		onNavigate && onNavigate({pathname: location.pathname}) 
	},[pathname])
	useEffect(() => {
		navigate(initialPath)
	}, [initialPath])
  return (
    <div>
      <StylesProvider>
        <Routes>
          <Route path="/*" element={<Landing />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </StylesProvider>
    </div>
  );
};
