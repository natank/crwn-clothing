import React, {
  lazy,
  Suspense,
  useState,
  useEffect
} from 'react';
import {
  Route,
  Routes,
  BrowserRouter as Router,
} from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName
} from '@material-ui/core/styles';

import ShopApp from './components/ShopApp';
import HomeApp from './components/HomeApp';
import AuthenticationApp from './components/AuthenticationApp';
import Navigation from './components/Navigation/navigation.component';

const generateClassName = createGenerateClassName({
  productionPrefix: 'co'
});

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<HomeApp />} />
          <Route path="shop" element={<ShopApp />} />
          <Route path="auth" element={<AuthenticationApp />} />
        </Route>
    </Routes>
    </Router>
  );
}

export default App;
