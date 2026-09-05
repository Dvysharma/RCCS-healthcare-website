import React from 'react';
import { useCMS } from '../context/CMSContext';
import { SITE_CONFIG } from '../config/siteConfig';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import { CheckCircle2, Printer, ArrowRight, Package, Truck, Phone } from 'lucide-react';

export default function OrderConfirmPage({ orderId, onNavigate }) {
  const { orders } = useCMS();
  const order = orders.find((o) => o.id === orderId) || orders[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="order-confirm-page">
      <Breadcrumbs
        items={[{ label: 'Order Confirmation' }]}
        onNavigate={onNavigate}
      />

      <div className="container section-padding-sm">
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          {/* Success Banner */}
          <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '2.5rem 2rem', textAlign: 'center', marginBottom: '2rem' }}>
            <CheckCircle2 size={64} color="var(--color-teal-700)" style={{ margin: '0 auto 1rem' }} />
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-teal-700)' }}>
              Order Confirmed
            </span>
            <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 800, color: 'var(--color-primary-900)', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
              Thank You For Your Order!
            </h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', maxWidth: '520px', margin: '0 auto 1.5rem' }}>
              Your order has been recorded. Our supply desk in Dehradun is preparing the shipment for dispatch.
            </p>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', background: 'var(--color-bg-page)', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Order Reference:</span>
              <strong style={{ fontSize: '1.0625rem', color: 'var(--color-primary-900)', fontFamily: 'monospace' }}>
                {order ? order.id : orderId}
              </strong>
            </div>
          </div>

          {/* Order Details & Summary Card */}
          {order && (
            <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '2rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-primary-900)' }}>
                    Order Details & Tax Proforma
                  </h2>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    Date: {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>

                <button className="btn btn-secondary btn-sm" onClick={handlePrint}>
                  <Printer size={14} />
                  <span>Print Receipt</span>
                </button>
              </div>

              {/* Facility & Shipping Details */}
              <div className="form-row form-row-2" style={{ marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--color-primary-900)', marginBottom: '0.25rem' }}>
                    Deliver To:
                  </div>
                  <div>{order.customerName}</div>
                  {order.facilityName && <div style={{ color: 'var(--color-text-muted)' }}>{order.facilityName}</div>}
                  <div style={{ color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>{order.address}</div>
                  <div style={{ color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>Phone: {order.phone}</div>
                </div>

                <div>
                  <div style={{ fontWeight: 700, color: 'var(--color-primary-900)', marginBottom: '0.25rem' }}>
                    Payment & Supplier Info:
                  </div>
                  <div>Payment Method: <strong>{order.paymentMethod}</strong></div>
                  <div>GSTIN: <strong>{SITE_CONFIG.gstin}</strong></div>
                  <div style={{ color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                    Origin: {SITE_CONFIG.address.formatted}
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div style={{ marginBottom: '1.5rem' }}>
                <table className="specs-table">
                  <thead>
                    <tr>
                      <th>Product Description</th>
                      <th style={{ textAlign: 'center' }}>Qty</th>
                      <th style={{ textAlign: 'right' }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items && order.items.map((item, idx) => (
                      <tr key={idx}>
                        <td>
                          <strong>{item.name}</strong>
                          {item.sku && <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>SKU: {item.sku}</div>}
                        </td>
                        <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                        <td style={{ textAlign: 'right', fontWeight: 600 }}>
                          ₹{((item.price || 0) * item.quantity).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={2} style={{ textAlign: 'right', fontWeight: 600 }}>Subtotal:</td>
                      <td style={{ textAlign: 'right' }}>₹{order.subtotal?.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td colSpan={2} style={{ textAlign: 'right', fontWeight: 600 }}>GST (12%):</td>
                      <td style={{ textAlign: 'right' }}>₹{order.gst?.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td colSpan={2} style={{ textAlign: 'right', fontWeight: 800, fontSize: '1rem', color: 'var(--color-primary-900)' }}>
                        Grand Total:
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 800, fontSize: '1rem', color: 'var(--color-primary-900)' }}>
                        ₹{order.total?.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Next Steps & Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <button className="btn btn-primary" onClick={() => onNavigate('/products')}>
              <span>Continue Shopping</span>
              <ArrowRight size={16} />
            </button>

            <a href={`tel:${SITE_CONFIG.primaryPhoneClean}`} className="btn btn-secondary">
              <Phone size={14} />
              <span>Contact Dispatch Desk ({SITE_CONFIG.primaryPhone})</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
