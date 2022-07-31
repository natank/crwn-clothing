import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core/styles';
import Landing from './components/Landing';
import Cart from './components/Cart';
import { MemoryHistory } from 'history';

export default ({
  history
}: {
  history: MemoryHistory<unknown>;
}) => {
  return (
    <div>
      <StylesProvider>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/cart" component={Cart} />
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};
