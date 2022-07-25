import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/Navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
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
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
}

export default App;
