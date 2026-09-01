import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart, FileSpreadsheet, ShieldCheck, ArrowLeft } from 'lucide-react';

export default function CartPage({ onNavigate, onOpenQuoteModal }) {
  const { cartItems, updateCartQuantity, removeFromCart, clearCart, cartSubtotal, cartGst, cartTotal } = useCart();
  const [requireGstInvoice, setRequireGstInvoice] = useState(true);
  const [gstinInput, setGstinInput] = useState('');

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <Breadcrumbs items={[{ label: 'Shopping Cart' }]} onNavigate={onNavigate} />
        <div className="container section-padding" style={{ textAlign: 'center' }}>
          <div style={{ maxWidth: '440px', margin: '0 auto', background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '3rem 2rem' }}>
            <ShoppingCart size={56} color="var(--color-text-light)" style={{ margin: '0 auto 1rem' }} />
            <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--color-primary-900)', marginBottom: '0.5rem' }}>
              Your Cart is Empty
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              You haven't added any medical supplies or consumables to your cart yet.
            </p>
            <button className="btn btn-primary btn-block" onClick={() => onNavigate('/products')}>
              Browse Product Catalogue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <Breadcrumbs items={[{ label: 'Shopping Cart' }]} onNavigate={onNavigate} />

      <div className="container section-padding-sm">
        <div style={{ marginBottom: '2rem' }}>
          <span className="section-eyebrow">Order Preparation</span>
          <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 800, color: 'var(--color-primary-900)' }}>
            Shopping Cart ({cartItems.reduce((a, b) => a + b.quantity, 0)} Items)
          </h1>
        </div>

        <div className="cart-grid">
          {/* LEFT: Cart Items List */}
          <div className="cart-items-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-primary-900)' }}>
                Product Details
              </span>
              <button
                onClick={clearCart}
                style={{ fontSize: '0.75rem', color: 'var(--color-danger)', fontWeight: 600 }}
              >
                Clear Cart
              </button>
            </div>

            {cartItems.map((item) => {
              const unitPrice = typeof item.product.price === 'number' ? item.product.price : 0;
              const itemTotal = unitPrice * item.quantity;
              return (
                <div key={item.product.id} className="cart-item-row">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="cart-item-img"
                  />

                  <div>
                    <h3
                      style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-primary-900)', cursor: 'pointer', marginBottom: '0.25rem' }}
                      onClick={() => onNavigate(`/product/${item.product.slug}`)}
                    >
                      {item.product.name}
                    </h3>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                      SKU: <span style={{ fontFamily: 'monospace' }}>{item.product.sku}</span> | Unit: ₹{unitPrice}
                    </div>

                    {/* Quantity Controls */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xs)', background: '#FFFFFF' }}>
                      <button
                        style={{ padding: '0.25rem 0.5rem', color: 'var(--color-text-secondary)' }}
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ padding: '0.25rem 0.75rem', fontSize: '0.8125rem', fontWeight: 700, minWidth: '28px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        style={{ padding: '0.25rem 0.5rem', color: 'var(--color-text-secondary)' }}
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--color-primary-900)' }}>
                      ₹{itemTotal.toLocaleString()}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      style={{ color: 'var(--color-text-light)', padding: '0.25rem' }}
                      title="Remove item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Back to Products */}
            <div style={{ paddingTop: '1.5rem', marginTop: '1rem', borderTop: '1px solid var(--color-border-light)' }}>
              <button
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: 'var(--color-teal-700)', fontSize: '0.875rem', fontWeight: 600 }}
                onClick={() => onNavigate('/products')}
              >
                <ArrowLeft size={16} />
                <span>Continue Browsing Products</span>
              </button>
            </div>
          </div>

          {/* RIGHT: Order Summary & Actions */}
          <div className="cart-summary-card">
            <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-primary-900)', marginBottom: '1.25rem' }}>
              Order Summary
            </h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{cartSubtotal.toLocaleString()}</span>
            </div>

            <div className="summary-row">
              <span>Estimated GST (12%)</span>
              <span>₹{cartGst.toLocaleString()}</span>
            </div>

            <div className="summary-row">
              <span>Standard Logistics Dispatch</span>
              <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>Calculated at Checkout</span>
            </div>

            <div className="summary-row total">
              <span>Total Payable</span>
              <span>₹{cartTotal.toLocaleString()}</span>
            </div>

            {/* GST Invoice Section */}
            <div style={{ margin: '1.25rem 0', padding: '1rem', backgroundColor: 'var(--color-bg-page)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xs)' }}>
              <label className="form-checkbox" style={{ fontWeight: 600 }}>
                <input
                  type="checkbox"
                  checked={requireGstInvoice}
                  onChange={(e) => setRequireGstInvoice(e.target.checked)}
                />
                <span>Require GST Business Tax Invoice</span>
              </label>

              {requireGstInvoice && (
                <div style={{ marginTop: '0.5rem' }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Clinic/Hospital GSTIN (Optional)"
                    value={gstinInput}
                    onChange={(e) => setGstinInput(e.target.value)}
                    style={{ fontSize: '0.8125rem', padding: '0.375rem 0.625rem' }}
                  />
                </div>
              )}
            </div>

            {/* Primary Checkout CTA */}
            <button
              className="btn btn-primary btn-lg btn-block"
              onClick={() => onNavigate('/checkout')}
              style={{ marginBottom: '0.75rem' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>

            {/* B2B RFQ Alternative CTA */}
            <button
              className="btn btn-navy btn-block"
              onClick={() => onOpenQuoteModal()}
              title="Request institutional rate or quotation"
            >
              <FileSpreadsheet size={15} />
              <span>Convert to Bulk RFQ Quotation</span>
            </button>

            <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--color-text-muted)', justifyContent: 'center' }}>
              <ShieldCheck size={14} color="var(--color-teal-700)" />
              <span>Direct regional supply from Dehradun, Uttarakhand</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
