import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const el = document.getElementById('root');
const root = el ? ReactDOM.createRoot(el) : null;
root && root.render(<App />);
