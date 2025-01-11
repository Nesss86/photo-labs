import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { FavProvider } from 'context/FavContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FavProvider>
    <App />
  </FavProvider>
);
