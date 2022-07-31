import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const rootElement = document.getElementById(
  'root'
) as HTMLElement;

// const root = ReactDOM.createRoot(rootElement);
ReactDOM.render(<App />, rootElement);
