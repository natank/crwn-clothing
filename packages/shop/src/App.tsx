import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core/styles';
import Landing from './components/Landing';
import Cart from './components/Cart';
import { BrowserHistory } from 'history';

export default ({
  history
}: {
  history: BrowserHistory;
}) => {
  console.log(`rendering shop with history ${JSON.stringify(history)}`)
  return (
    <div>
      <StylesProvider>
        <Router>
          <Routes>
            <Route path="/*" element={<Landing />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
      </StylesProvider>
    </div>
  );
};
