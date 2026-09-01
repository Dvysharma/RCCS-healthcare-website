import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useCMS } from '../context/CMSContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import { 
  ShieldCheck, 
  CreditCard, 
  Building2, 
  Truck, 
  Lock, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function CheckoutPage({ onNavigate }) {
  const { cartItems, cartSubtotal, cartGst, cartTotal, clearCart } = useCart();
  const { createOrder } = useCMS();
  const { user } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    facilityName: user?.facilityName || '',
    phone: user?.phone || '',
    email: user?.email || '',
    streetAddress: user?.address?.street || '',
    city: user?.address?.city || 'Dehradun',
    state: user?.address?.state || 'Uttarakhand',
    pincode: user?.address?.pincode || '248001',
    gstin: user?.gstin || '',
    orderNotes: '',
    paymentMethod: 'online' // 'online', 'bank_transfer', 'cod'
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const indianStates = [
    'Uttarakhand', 'Uttar Pradesh', 'Delhi', 'Haryana', 'Punjab',
    'Himachal Pradesh', 'Rajasthan', 'Madhya Pradesh', 'Chandigarh', 'Bihar',
    'Maharashtra', 'Gujarat', 'Karnataka', 'Tamil Nadu', 'West Bengal', 'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.streetAddress) {
      addToast('Please fill out all required customer and delivery fields', 'error');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const orderRecord = createOrder({
        customerName: formData.fullName,
        facilityName: formData.facilityName || 'Direct Customer',
        phone: formData.phone,
        email: formData.email,
        gstin: formData.gstin,
        address: `${formData.streetAddress}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
        items: cartItems.map((item) => ({
          name: item.product.name,
          sku: item.product.sku,
          quantity: item.quantity,
          price: item.product.price || 0
        })),
        subtotal: cartSubtotal,
        gst: cartGst,
        total: cartTotal,
        paymentMethod: formData.paymentMethod === 'online'
          ? 'Online Payment (UPI/Card)'
          : (formData.paymentMethod === 'bank_transfer' ? 'Direct Bank Transfer / NEFT' : 'Cash on Delivery'),
        notes: formData.orderNotes
      });

      clearCart();
      setIsProcessing(false);
      onNavigate(`/order-confirmation/${orderRecord.id}`);
    }, 800);
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <Breadcrumbs items={[{ label: 'Checkout' }]} onNavigate={onNavigate} />
        <div className="container section-padding" style={{ textAlign: 'center' }}>
          <p>No items in cart to checkout.</p>
          <button className="btn btn-primary" onClick={() => onNavigate('/products')}>
            Return to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <Breadcrumbs
        items={[
          { label: 'Cart', path: '/cart' },
          { label: 'Checkout' }
        ]}
        onNavigate={onNavigate}
      />

      <div className="container section-padding-sm">
        <div style={{ marginBottom: '2rem' }}>
          <span className="section-eyebrow">Secure Order Checkout</span>
          <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 800, color: 'var(--color-primary-900)' }}>
            Hospital & Clinical Order Placement
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="cart-grid">
            {/* LEFT: Checkout Form Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Section 1: Customer Details */}
              <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.75rem' }}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-primary-900)', marginBottom: '1.25rem' }}>
                  1. Contact & Facility Details
                </h2>

                <div className="form-row form-row-2">
                  <div className="form-group">
                    <label className="form-label required">Contact Person Name</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      className="form-control"
                      placeholder="e.g. Dr. Alok Nautiyal"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Hospital / Clinic / Business Name</label>
                    <input
                      type="text"
                      name="facilityName"
                      className="form-control"
                      placeholder="e.g. Doon Medical Care"
                      value={formData.facilityName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row form-row-2">
                  <div className="form-group">
                    <label className="form-label required">Mobile Number (For Dispatch Tracking)</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="form-control"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label required">Email Address (For Tax Invoice)</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="form-control"
                      placeholder="procurement@hospital.org"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">GSTIN (Optional for Business Input Credit)</label>
                  <input
                    type="text"
                    name="gstin"
                    className="form-control"
                    placeholder="05AAAAA0000A1Z5"
                    value={formData.gstin}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Section 2: Delivery Address */}
              <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.75rem' }}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-primary-900)', marginBottom: '1.25rem' }}>
                  2. Facility Delivery Address
                </h2>

                <div className="form-group">
                  <label className="form-label required">Street / Landmark / Ward Address</label>
                  <input
                    type="text"
                    name="streetAddress"
                    required
                    className="form-control"
                    placeholder="Building, Floor, Street, Landmark"
                    value={formData.streetAddress}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-row form-row-3">
                  <div className="form-group">
                    <label className="form-label required">City / Town</label>
                    <input
                      type="text"
                      name="city"
                      required
                      className="form-control"
                      placeholder="Dehradun"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label required">State</label>
                    <select
                      name="state"
                      className="form-control"
                      value={formData.state}
                      onChange={handleChange}
                    >
                      {indianStates.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label required">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      className="form-control"
                      placeholder="248001"
                      value={formData.pincode}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Special Delivery / Unloading Instructions</label>
                  <textarea
                    name="orderNotes"
                    rows={2}
                    className="form-control"
                    placeholder="Gate number, specific delivery hours, or central store receiver name..."
                    value={formData.orderNotes}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Section 3: Payment Method */}
              <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.75rem' }}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-primary-900)', marginBottom: '1.25rem' }}>
                  3. Payment Method
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                  {/* Option 1: Online */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      padding: '1rem',
                      border: formData.paymentMethod === 'online' ? '2px solid var(--color-teal-700)' : '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-xs)',
                      background: formData.paymentMethod === 'online' ? 'var(--color-teal-50)' : '#FFFFFF',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={formData.paymentMethod === 'online'}
                      onChange={handleChange}
                      style={{ marginTop: '0.25rem' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--color-primary-900)' }}>
                        Online Payment (UPI, Credit/Debit Card, Net Banking)
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginTop: '0.125rem' }}>
                        Instant automated payment verification and prioritized dispatch queue.
                      </div>
                    </div>
                  </label>

                  {/* Option 2: Bank Transfer */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      padding: '1rem',
                      border: formData.paymentMethod === 'bank_transfer' ? '2px solid var(--color-teal-700)' : '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-xs)',
                      background: formData.paymentMethod === 'bank_transfer' ? 'var(--color-teal-50)' : '#FFFFFF',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank_transfer"
                      checked={formData.paymentMethod === 'bank_transfer'}
                      onChange={handleChange}
                      style={{ marginTop: '0.25rem' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--color-primary-900)' }}>
                        Direct Bank Transfer / NEFT / RTGS (Hospital & Institutional)
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginTop: '0.125rem' }}>
                        Proforma tax invoice issued with official bank coordinates for accounting clearance.
                      </div>
                    </div>
                  </label>

                  {/* Option 3: COD */}
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      padding: '1rem',
                      border: formData.paymentMethod === 'cod' ? '2px solid var(--color-teal-700)' : '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-xs)',
                      background: formData.paymentMethod === 'cod' ? 'var(--color-teal-50)' : '#FFFFFF',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleChange}
                      style={{ marginTop: '0.25rem' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--color-primary-900)' }}>
                        Cash / Cheque on Delivery
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginTop: '0.125rem' }}>
                        Subject to address verification by our Dehradun logistics team.
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* RIGHT: Order Summary */}
            <div className="cart-summary-card">
              <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-primary-900)', marginBottom: '1rem' }}>
                Order Breakdown ({cartItems.length} Products)
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', maxHeight: '220px', overflowY: 'auto', paddingRight: '0.25rem', marginBottom: '1rem' }}>
                {cartItems.map((item) => (
                  <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border-light)' }}>
                    <div style={{ maxWidth: '180px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--color-primary-900)' }}>{item.product.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Qty: {item.quantity} x ₹{item.product.price}</div>
                    </div>
                    <div style={{ fontWeight: 700, color: 'var(--color-primary-900)' }}>
                      ₹{((item.product.price || 0) * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{cartSubtotal.toLocaleString()}</span>
              </div>

              <div className="summary-row">
                <span>Estimated GST (12%)</span>
                <span>₹{cartGst.toLocaleString()}</span>
              </div>

              <div className="summary-row">
                <span>Dispatch Logistics</span>
                <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>Standard Dispatch Included</span>
              </div>

              <div className="summary-row total">
                <span>Total Amount</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
                style={{ marginTop: '1.5rem' }}
                disabled={isProcessing}
              >
                <Lock size={16} />
                <span>{isProcessing ? 'Confirming Order...' : 'Confirm & Place Order'}</span>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '1rem', justifyContent: 'center' }}>
                <ShieldCheck size={14} color="var(--color-teal-700)" />
                <span>GST Invoicing: 05AFSFS5983D1ZG</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
