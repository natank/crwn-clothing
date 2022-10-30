// @ts-nocheck
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener
} from './utils/firebase/firebase.utils';
import { NextFn, User } from 'firebase/auth';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Checkout from './routes/checkout/checkout.component';
import Home from './routes/home/home.component';
import Shop from './routes/shop/shop.component';
import Category from './routes/category/category.component';
import { fetchCategoriesAsync } from './store/categories/categories.action';
import { setCurrentUser } from './store/user/user.action';

import './App.scss';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(((
      user: User
    ) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    }) as NextFn<User | null>);

    return unsubscribe;
  }, []);

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop">
          <Route index element={<Shop />} />
          <Route path=":category" element={<Category />} />
        </Route>
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
