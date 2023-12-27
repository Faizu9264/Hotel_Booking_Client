import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css'
import store from './redux/store';
import ContextProvider from './context/ContextProvider';



const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <Provider store={store}>
      <ContextProvider>
        <App />
      </ContextProvider>
    </Provider>
  );
}
