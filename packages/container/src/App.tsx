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
import Navigation from './components/Navigation/navigation.component';

const generateClassName = createGenerateClassName({
  productionPrefix: 'co'
});

function App() {
  return (
    <Router>
      <StylesProvider>
        <Navigation />
        <Routes>
          <Route path='/*' element={<ShopApp />} />
        </Routes>
      </StylesProvider>
    </Router>
  );
}

export default App;
