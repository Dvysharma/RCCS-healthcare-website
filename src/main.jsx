import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastProvider } from './context/ToastContext';
import { CMSProvider } from './context/CMSContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

// Import Master Stylesheets
import './styles/index.css';
import './styles/components.css';
import './styles/pages.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastProvider>
      <CMSProvider>
        <CartProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </CartProvider>
      </CMSProvider>
    </ToastProvider>
  </React.StrictMode>
);
