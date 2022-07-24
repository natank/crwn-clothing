import React from 'react';
import { render } from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root') as HTMLElement;
render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootElement
);