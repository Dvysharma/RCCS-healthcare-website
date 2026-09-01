import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { addToast } = useToast();
  
  // Cart Items State
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('rc_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Quote / RFQ List State for Institutional Customers
  const [quoteItems, setQuoteItems] = useState(() => {
    try {
      const saved = localStorage.getItem('rc_quotes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('rc_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('rc_quotes', JSON.stringify(quoteItems));
    } catch (e) {
      console.error('Failed to save quotes to localStorage', e);
    }
  }, [quoteItems]);

  // Cart Handlers
  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, addedAt: new Date().toISOString() }];
    });
    addToast(`Added "${product.name}" to cart`, 'success');
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    addToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Quote Handlers
  const addToQuote = (product, targetQuantity = 10, notes = '') => {
    setQuoteItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, targetQuantity: item.targetQuantity + targetQuantity, notes: notes || item.notes }
            : item
        );
      }
      return [...prev, { product, targetQuantity, notes, addedAt: new Date().toISOString() }];
    });
    addToast(`Added "${product.name}" to Quotation List`, 'success');
  };

  const removeFromQuote = (productId) => {
    setQuoteItems((prev) => prev.filter((item) => item.product.id !== productId));
    addToast('Item removed from quotation list', 'info');
  };

  const clearQuote = () => {
    setQuoteItems([]);
  };

  // Calculated values
  const cartSubtotal = cartItems.reduce((acc, item) => {
    const price = typeof item.product.price === 'number' ? item.product.price : 0;
    return acc + price * item.quantity;
  }, 0);

  const cartGst = Math.round(cartSubtotal * 0.12); // Standard 12% medical GST estimate
  const cartTotal = cartSubtotal + cartGst;
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const quoteCount = quoteItems.length;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartGst,
        cartTotal,
        cartCount,
        quoteItems,
        addToQuote,
        removeFromQuote,
        clearQuote,
        quoteCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
