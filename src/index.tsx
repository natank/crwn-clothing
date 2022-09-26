import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/user.context';
import { CategoriesProvider } from './context/categories.context';
import { CartContextProvider } from './context/cart.context';
const { createRoot } = ReactDOM;
const rootElement = document.getElementById(
  'root'
) as HTMLElement;
const root = createRoot(rootElement);
root.render(
  <BrowserRouter>
    <UserProvider>
      <CategoriesProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </CategoriesProvider>
    </UserProvider>
  </BrowserRouter>
);
