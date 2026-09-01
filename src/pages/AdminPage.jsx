import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { CATEGORIES } from '../data/categories';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import { 
  Package, 
  FileSpreadsheet, 
  ShoppingBag, 
  Settings, 
  Plus, 
  Trash2, 
  Edit, 
  Download, 
  RotateCcw, 
  CheckCircle2,
  AlertCircle,
  Save
} from 'lucide-react';

export default function AdminPage({ onNavigate }) {
  const { 
    products, 
    categories, 
    enquiries, 
    orders, 
    siteConfig,
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateEnquiryStatus,
    updateOrderStatus,
    updateSiteConfig,
    resetToFactoryDefaults,
    exportDataJSON
  } = useCMS();

  const [activeTab, setActiveTab] = useState('products'); // 'products', 'enquiries', 'orders', 'settings'
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // New Product Form State
  const [newProd, setNewProd] = useState({
    name: '',
    sku: '',
    category: 'cssd-sterilization',
    subcategory: '',
    shortDescription: '',
    description: '',
    price: 450,
    priceDisplay: '₹450 / Box',
    isPriceOnRequest: false,
    moq: '1 Box',
    stock: 'In Stock',
    featured: false,
    images: ['https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=800&q=80']
  });

  // Settings State
  const [configForm, setConfigForm] = useState({
    primaryPhone: siteConfig.primaryPhone,
    secondaryPhone: siteConfig.secondaryPhone,
    primaryEmail: siteConfig.primaryEmail,
    gstin: siteConfig.gstin,
    street: siteConfig.address.street,
    landmark: siteConfig.address.landmark,
    city: siteConfig.address.city,
    operatingHours: siteConfig.operatingHours
  });

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!newProd.name || !newProd.sku) return;
    addProduct(newProd);
    setIsAddingProduct(false);
    setNewProd({
      name: '',
      sku: '',
      category: 'cssd-sterilization',
      subcategory: '',
      shortDescription: '',
      description: '',
      price: 450,
      priceDisplay: '₹450 / Box',
      isPriceOnRequest: false,
      moq: '1 Box',
      stock: 'In Stock',
      featured: false,
      images: ['https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=800&q=80']
    });
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateSiteConfig({
      primaryPhone: configForm.primaryPhone,
      primaryPhoneClean: configForm.primaryPhone.replace(/\s+/g, ''),
      secondaryPhone: configForm.secondaryPhone,
      secondaryPhoneClean: configForm.secondaryPhone.replace(/\s+/g, ''),
      primaryEmail: configForm.primaryEmail,
      gstin: configForm.gstin,
      operatingHours: configForm.operatingHours,
      address: {
        ...siteConfig.address,
        street: configForm.street,
        landmark: configForm.landmark,
        city: configForm.city,
        formatted: `${configForm.street}, ${configForm.landmark}, ${configForm.city}, Uttarakhand, India`
      }
    });
  };

  return (
    <div className="admin-page">
      <Breadcrumbs
        items={[{ label: 'Admin / CMS Portal' }]}
        onNavigate={onNavigate}
      />

      <div className="container section-padding-sm">
        {/* Header with quick stats & export */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.25rem 1.75rem' }}>
          <div>
            <span className="section-eyebrow">Content Management System</span>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary-900)' }}>
              Royal Crown Administration Portal
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button className="btn btn-secondary btn-sm" onClick={exportDataJSON}>
              <Download size={14} />
              <span>Export Catalogue Backup (JSON)</span>
            </button>
            <button className="btn btn-secondary btn-sm" onClick={resetToFactoryDefaults} title="Reset to original dataset">
              <RotateCcw size={14} />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* Admin Two-Column Layout */}
        <div className="admin-layout">
          {/* Admin Sidebar Navigation */}
          <aside className="admin-sidebar">
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94A3B8', padding: '0.5rem 0.875rem', fontWeight: 700 }}>
              Management Modules
            </div>

            <div
              className={`admin-nav-item ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              <Package size={16} />
              <span>Products ({products.length})</span>
            </div>

            <div
              className={`admin-nav-item ${activeTab === 'enquiries' ? 'active' : ''}`}
              onClick={() => setActiveTab('enquiries')}
            >
              <FileSpreadsheet size={16} />
              <span>Enquiries & RFQ ({enquiries.length})</span>
            </div>

            <div
              className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <ShoppingBag size={16} />
              <span>Orders & Proforma ({orders.length})</span>
            </div>

            <div
              className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={16} />
              <span>Website & Contact Settings</span>
            </div>
          </aside>

          {/* Admin Main Content Area */}
          <div>
            {/* 1. PRODUCTS MANAGEMENT TAB */}
            {activeTab === 'products' && (
              <div className="admin-content-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary-900)' }}>
                      Product Catalogue Manager
                    </h2>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                      Manage products, pricing, SKUs, and featured highlights.
                    </span>
                  </div>

                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setIsAddingProduct(!isAddingProduct)}
                  >
                    <Plus size={14} />
                    <span>{isAddingProduct ? 'Close Form' : 'Add New Product'}</span>
                  </button>
                </div>

                {/* Add Product Form Drawer/Panel */}
                {isAddingProduct && (
                  <form onSubmit={handleAddProductSubmit} style={{ background: 'var(--color-bg-page)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.5rem', marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary-900)', marginBottom: '1rem' }}>
                      Add New Medical Product
                    </h3>

                    <div className="form-row form-row-2">
                      <div className="form-group">
                        <label className="form-label required">Product Name</label>
                        <input
                          type="text"
                          required
                          className="form-control"
                          placeholder="e.g. Sterile Latex Surgical Gloves"
                          value={newProd.name}
                          onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label required">SKU Code</label>
                        <input
                          type="text"
                          required
                          className="form-control"
                          placeholder="RC-GLV-01"
                          value={newProd.sku}
                          onChange={(e) => setNewProd({ ...newProd, sku: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-row form-row-2">
                      <div className="form-group">
                        <label className="form-label required">Medical Category</label>
                        <select
                          className="form-control"
                          value={newProd.category}
                          onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                        >
                          {CATEGORIES.map((cat) => (
                            <option key={cat.id} value={cat.slug}>{cat.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Unit Price (INR)</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="450"
                          value={newProd.price || ''}
                          onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value), priceDisplay: `₹${e.target.value}` })}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label required">Short Specification Summary</label>
                      <textarea
                        rows={2}
                        required
                        className="form-control"
                        placeholder="Brief overview of materials, sizing, and sterile standard..."
                        value={newProd.shortDescription}
                        onChange={(e) => setNewProd({ ...newProd, shortDescription: e.target.value, description: e.target.value })}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
                      <label className="form-checkbox">
                        <input
                          type="checkbox"
                          checked={newProd.featured}
                          onChange={(e) => setNewProd({ ...newProd, featured: e.target.checked })}
                        />
                        <span>Show on Homepage Featured Grid</span>
                      </label>

                      <button type="submit" className="btn btn-primary btn-sm" style={{ marginLeft: 'auto' }}>
                        Save Product to Catalogue
                      </button>
                    </div>
                  </form>
                )}

                {/* Products Table */}
                <div style={{ overflowX: 'auto' }}>
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>SKU</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Featured</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((prod) => (
                        <tr key={prod.id}>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                              <img src={prod.images[0]} alt={prod.name} style={{ width: '32px', height: '32px', objectFit: 'contain', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xs)' }} />
                              <span style={{ fontWeight: 600, color: 'var(--color-primary-900)', fontSize: '0.8125rem' }}>{prod.name}</span>
                            </div>
                          </td>
                          <td style={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}>{prod.sku}</td>
                          <td style={{ fontSize: '0.8125rem' }}>{prod.category}</td>
                          <td style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{prod.priceDisplay || (prod.price ? `₹${prod.price}` : 'Price on Request')}</td>
                          <td>
                            <button
                              style={{ fontSize: '0.75rem', padding: '0.125rem 0.5rem', borderRadius: 'var(--radius-xs)', background: prod.featured ? 'var(--color-accent-100)' : 'var(--color-bg-page)', color: prod.featured ? 'var(--color-accent-800)' : 'var(--color-text-muted)', fontWeight: 600 }}
                              onClick={() => updateProduct({ ...prod, featured: !prod.featured })}
                            >
                              {prod.featured ? 'Featured' : 'Standard'}
                            </button>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <button
                              onClick={() => deleteProduct(prod.id)}
                              style={{ color: 'var(--color-danger)', padding: '0.25rem' }}
                              title="Delete Product"
                            >
                              <Trash2 size={15} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 2. ENQUIRIES & RFQ TRACKER */}
            {activeTab === 'enquiries' && (
              <div className="admin-content-card">
                <div style={{ marginBottom: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary-900)' }}>
                    Customer Enquiries & Quotation Requests ({enquiries.length})
                  </h2>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                    Track incoming hospital RFQs, product requests, and general messages.
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {enquiries.map((enq) => (
                    <div key={enq.id} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div>
                          <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--color-primary-900)', marginRight: '0.5rem' }}>
                            {enq.id}
                          </span>
                          <span style={{ fontSize: '0.75rem', background: 'var(--color-teal-50)', color: 'var(--color-teal-700)', padding: '0.125rem 0.5rem', borderRadius: 'var(--radius-xs)', fontWeight: 600 }}>
                            {enq.type}
                          </span>
                        </div>

                        <select
                          className="form-control"
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', width: 'auto' }}
                          value={enq.status || 'New'}
                          onChange={(e) => updateEnquiryStatus(enq.id, e.target.value)}
                        >
                          <option value="New">Status: New</option>
                          <option value="Under Review">Status: Under Review</option>
                          <option value="Quotation Sent">Status: Quotation Sent</option>
                          <option value="Fulfilled">Status: Fulfilled</option>
                        </select>
                      </div>

                      <div style={{ fontSize: '0.875rem', color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
                        <strong>{enq.name}</strong> • {enq.company || 'Healthcare Facility'} • Phone: <strong>{enq.phone}</strong> {enq.email ? `• ${enq.email}` : ''}
                      </div>

                      <div style={{ background: 'var(--color-bg-page)', padding: '0.75rem', borderRadius: 'var(--radius-xs)', fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                        <div><strong>Items / Subject:</strong> {enq.items}</div>
                        {enq.message && <div style={{ marginTop: '0.25rem' }}><strong>Requirement Note:</strong> {enq.message}</div>}
                      </div>

                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Received: {new Date(enq.date).toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. ORDERS TRACKER */}
            {activeTab === 'orders' && (
              <div className="admin-content-card">
                <div style={{ marginBottom: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary-900)' }}>
                    Placed Orders & Proforma Invoices ({orders.length})
                  </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {orders.map((ord) => (
                    <div key={ord.id} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--color-primary-900)' }}>
                          {ord.id}
                        </span>
                        <span style={{ fontWeight: 800, color: 'var(--color-primary-900)' }}>
                          ₹{ord.total?.toLocaleString()}
                        </span>
                      </div>

                      <div style={{ fontSize: '0.875rem', color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
                        {ord.customerName} ({ord.facilityName}) • {ord.address} • Phone: {ord.phone}
                      </div>

                      <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                        Method: {ord.paymentMethod} • Status: <strong>{ord.orderStatus}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. SETTINGS & CENTRAL CONFIG EDITOR */}
            {activeTab === 'settings' && (
              <div className="admin-content-card">
                <div style={{ marginBottom: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary-900)' }}>
                    Centralized Business & Contact Settings
                  </h2>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                    Modify phone numbers, email, GSTIN, and address across the entire website from this single location.
                  </span>
                </div>

                <form onSubmit={handleSaveSettings}>
                  <div className="form-row form-row-2">
                    <div className="form-group">
                      <label className="form-label required">Primary Website Contact Phone</label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        value={configForm.primaryPhone}
                        onChange={(e) => setConfigForm({ ...configForm, primaryPhone: e.target.value })}
                      />
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Currently active across headers, footers, and direct click-to-call.
                      </span>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Secondary / Privacy Policy Phone (Verification Pending)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={configForm.secondaryPhone}
                        onChange={(e) => setConfigForm({ ...configForm, secondaryPhone: e.target.value })}
                      />
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-warning)' }}>
                        Verify with business owner prior to full production launch.
                      </span>
                    </div>
                  </div>

                  <div className="form-row form-row-2">
                    <div className="form-group">
                      <label className="form-label required">Official Business Email</label>
                      <input
                        type="email"
                        required
                        className="form-control"
                        value={configForm.primaryEmail}
                        onChange={(e) => setConfigForm({ ...configForm, primaryEmail: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label required">GSTIN Registration Number</label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        value={configForm.gstin}
                        onChange={(e) => setConfigForm({ ...configForm, gstin: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-row form-row-3">
                    <div className="form-group">
                      <label className="form-label required">Street Address</label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        value={configForm.street}
                        onChange={(e) => setConfigForm({ ...configForm, street: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label required">Landmark</label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        value={configForm.landmark}
                        onChange={(e) => setConfigForm({ ...configForm, landmark: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label required">City / State</label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        value={configForm.city}
                        onChange={(e) => setConfigForm({ ...configForm, city: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Operating Supply Hours</label>
                    <input
                      type="text"
                      className="form-control"
                      value={configForm.operatingHours}
                      onChange={(e) => setConfigForm({ ...configForm, operatingHours: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    <Save size={16} />
                    <span>Save Configuration Settings</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
