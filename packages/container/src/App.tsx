import React, {
  lazy,
  Suspense,
  useState,
  useEffect
} from 'react';
import {
  Route,
  Routes,
  Router,
  BrowserRouter
} from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName
} from '@material-ui/core/styles';
import {
  BrowserHistory,
  createBrowserHistory
} from 'history';
import ShopApp from './components/ShopApp';
import Navigation from './components/Navigation/navigation.component';

const generateClassName = createGenerateClassName({
  productionPrefix: 'co'
});

function App() {
  return (
    <Router history={createBrowserHistory()}>
      <StylesProvider>
        <Navigation />
        <ShopApp />
      </StylesProvider>
    </Router>
  );
}

export default App;
