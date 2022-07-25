import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/Navigation/navigation.component';
import SignIn from './routes/sign-in/sign-in.component';
import Home from './routes/home/home.component';
import './categories.styles.scss';
import React from 'react';

import './App.scss';

const Shop = () => {
  return <h1>I am the shop page</h1>;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
}

export default App;
