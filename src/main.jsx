import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ContextProvider } from '../src/GlobalContext/GlobalContext';
console.log('%c WARNING!!!', 'color: red; font-size: 3rem; background: yellow');
console.log(
  '%c If you use this console, other people could impersonate you and steal your data through an attack Self-XSS.No you write or paste any code you do not understand.',
  'color: white; font-size: 1.5rem;'
);
ReactDOM.render(
  <ContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ContextProvider>,
  document.getElementById('root')
);
