import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { stripePromise } from './utils/stripe/stripe.utils';
import './index.scss';
import App from './App';
import { persistor, store } from './store/store';
import { Elements } from '@stripe/react-stripe-js';

const { createRoot } = ReactDOM;
const rootElement = document.getElementById(
  'root'
) as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate loading={null} persistor={persistor}>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </PersistGate>
    </BrowserRouter>
  </Provider>
);
