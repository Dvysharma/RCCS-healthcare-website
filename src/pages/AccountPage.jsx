import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCMS } from '../context/CMSContext';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import { User, LogIn, UserPlus, Package, MapPin, LogOut, Building2, CheckCircle2 } from 'lucide-react';

export default function AccountPage({ onNavigate }) {
  const { user, isAuthenticated, login, register, updateProfile, logout } = useAuth();
  const { orders } = useCMS();

  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'profile', 'addresses'

  // Login Form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register Form
  const [regData, setRegData] = useState({
    name: '',
    email: '',
    phone: '',
    facilityName: '',
    gstin: '',
    address: ''
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail) return;
    login(loginEmail, loginPassword);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regData.name || !regData.email || !regData.phone) return;
    register(regData);
  };

  return (
    <div className="account-page">
      <Breadcrumbs
        items={[{ label: 'Customer Account' }]}
        onNavigate={onNavigate}
      />

      <div className="container section-padding-sm">
        {!isAuthenticated ? (
          /* Login / Register Card */
          <div style={{ maxWidth: '480px', margin: '0 auto', background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '2rem' }}>
            <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border)', marginBottom: '1.5rem' }}>
              <button
                style={{ flex: 1, padding: '0.75rem', fontWeight: authMode === 'login' ? 700 : 500, color: authMode === 'login' ? 'var(--color-teal-700)' : 'var(--color-text-muted)', borderBottom: authMode === 'login' ? '2px solid var(--color-teal-700)' : 'none' }}
                onClick={() => setAuthMode('login')}
              >
                Sign In
              </button>
              <button
                style={{ flex: 1, padding: '0.75rem', fontWeight: authMode === 'register' ? 700 : 500, color: authMode === 'register' ? 'var(--color-teal-700)' : 'var(--color-text-muted)', borderBottom: authMode === 'register' ? '2px solid var(--color-teal-700)' : 'none' }}
                onClick={() => setAuthMode('register')}
              >
                Register Facility Account
              </button>
            </div>

            {authMode === 'login' ? (
              <form onSubmit={handleLoginSubmit}>
                <div className="form-group">
                  <label className="form-label required">Email Address</label>
                  <input
                    type="email"
                    required
                    className="form-control"
                    placeholder="dr.sharma@facility.org"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label required">Password</label>
                  <input
                    type="password"
                    required
                    className="form-control"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '1rem' }}>
                  <LogIn size={16} />
                  <span>Log In to Account</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit}>
                <div className="form-group">
                  <label className="form-label required">Contact Full Name</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="Dr. Rajesh / Procurement Officer"
                    value={regData.name}
                    onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label required">Email Address</label>
                  <input
                    type="email"
                    required
                    className="form-control"
                    placeholder="procurement@hospital.org"
                    value={regData.email}
                    onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label required">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    className="form-control"
                    placeholder="+91 98765 43210"
                    value={regData.phone}
                    onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Hospital / Clinic Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Doon Care Hospital"
                    value={regData.facilityName}
                    onChange={(e) => setRegData({ ...regData, facilityName: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">GSTIN (For Tax Invoicing)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="05AAAAA0000A1Z5"
                    value={regData.gstin}
                    onChange={(e) => setRegData({ ...regData, gstin: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '1rem' }}>
                  <UserPlus size={16} />
                  <span>Create Account</span>
                </button>
              </form>
            )}
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }} className="form-row-2">
            {/* Left Nav */}
            <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.5rem', height: 'fit-content' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)', marginBottom: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-primary-900)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                  {user.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--color-primary-900)' }}>{user.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{user.email}</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <button
                  style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.625rem 0.75rem', borderRadius: 'var(--radius-xs)', fontWeight: 600, fontSize: '0.875rem', color: activeTab === 'orders' ? 'var(--color-teal-700)' : 'var(--color-text-secondary)', background: activeTab === 'orders' ? 'var(--color-teal-50)' : 'transparent', textAlign: 'left' }}
                  onClick={() => setActiveTab('orders')}
                >
                  <Package size={16} />
                  <span>Order History ({orders.length})</span>
                </button>

                <button
                  style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.625rem 0.75rem', borderRadius: 'var(--radius-xs)', fontWeight: 600, fontSize: '0.875rem', color: activeTab === 'profile' ? 'var(--color-teal-700)' : 'var(--color-text-secondary)', background: activeTab === 'profile' ? 'var(--color-teal-50)' : 'transparent', textAlign: 'left' }}
                  onClick={() => setActiveTab('profile')}
                >
                  <Building2 size={16} />
                  <span>Facility Profile</span>
                </button>

                <button
                  style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.625rem 0.75rem', borderRadius: 'var(--radius-xs)', fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-danger)', textAlign: 'left', marginTop: '1rem', borderTop: '1px solid var(--color-border-light)', paddingTop: '0.75rem' }}
                  onClick={logout}
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Right Tab Content */}
            <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.75rem' }}>
              {activeTab === 'orders' && (
                <div>
                  <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-primary-900)', marginBottom: '1rem' }}>
                    Recent Orders & Procurement Records
                  </h2>

                  {orders.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {orders.map((ord) => (
                        <div key={ord.id} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xs)', padding: '1rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--color-primary-900)' }}>
                              {ord.id}
                            </span>
                            <span style={{ fontSize: '0.75rem', background: 'var(--color-success-bg)', color: 'var(--color-success)', padding: '0.125rem 0.5rem', borderRadius: 'var(--radius-xs)', fontWeight: 600 }}>
                              {ord.orderStatus || 'Confirmed'}
                            </span>
                          </div>
                          <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                            Items: {ord.items ? ord.items.map((i) => `${i.name} (x${i.quantity})`).join(', ') : 'Medical Consumables'}
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8125rem', borderTop: '1px solid var(--color-border-light)', paddingTop: '0.5rem' }}>
                            <span>Total: <strong>₹{ord.total?.toLocaleString()}</strong></span>
                            <button
                              style={{ color: 'var(--color-teal-700)', fontWeight: 600 }}
                              onClick={() => onNavigate(`/order-confirmation/${ord.id}`)}
                            >
                              View Proforma →
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>No orders placed yet.</p>
                  )}
                </div>
              )}

              {activeTab === 'profile' && (
                <div>
                  <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-primary-900)', marginBottom: '1rem' }}>
                    Facility & Account Information
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                    <div><strong>Name:</strong> {user.name}</div>
                    <div><strong>Email:</strong> {user.email}</div>
                    <div><strong>Phone:</strong> {user.phone}</div>
                    <div><strong>Facility:</strong> {user.facilityName || 'N/A'}</div>
                    <div><strong>GSTIN:</strong> {user.gstin || 'Not Provided'}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
