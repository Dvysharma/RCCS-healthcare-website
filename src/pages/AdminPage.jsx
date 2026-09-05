import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
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
  Save,
  Building2,
  FileText
} from 'lucide-react';

export default function AdminPage({ onNavigate }) {
  const { 
    products, 
    categories, 
    clients,
    blogs,
    enquiries, 
    orders, 
    siteConfig,
    addProduct, 
    updateProduct, 
    deleteProduct, 
    addCategory,
    deleteCategory,
    moveCategory,
    addClient,
    deleteClient,
    addBlog,
    deleteBlog,
    updateEnquiryStatus,
    updateOrderStatus,
    updateSiteConfig,
    resetToFactoryDefaults,
    exportDataJSON
  } = useCMS();

  const [activeTab, setActiveTab] = useState('products'); // 'products', 'categories', 'clients', 'blogs', 'enquiries', 'orders', 'settings'
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
    images: ['https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=800&q=80', '', '', '', '', '', '']
  });

  const [newCategory, setNewCategory] = useState({ name: '', shortName: '', description: '', image: '' });
  const [newClient, setNewClient] = useState({ name: '', logo: '' });
  const [newBlog, setNewBlog] = useState({ title: '', category: '', author: '', excerpt: '', image: '', contentText: '' });

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
      images: ['https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=800&q=80', '', '', '', '', '', '']
    });
  };

  const readImageFile = (file, onLoad) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => onLoad(event.target.result);
    reader.readAsDataURL(file);
  };

  const handleProductImageUpload = (index, file) => {
    readImageFile(file, (image) => {
      setNewProd((prev) => {
        const images = [...prev.images];
        images[index] = image;
        return { ...prev, images };
      });
    });
  };

  const handleAddCategorySubmit = (e) => {
    e.preventDefault();
    if (!newCategory.name) return;
    addCategory({ ...newCategory, image: newCategory.image || 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=800&q=80' });
    setNewCategory({ name: '', shortName: '', description: '', image: '' });
  };

  const handleAddClientSubmit = (e) => {
    e.preventDefault();
    if (!newClient.name || !newClient.logo) return;
    addClient(newClient);
    setNewClient({ name: '', logo: '' });
  };

  const handleAddBlogSubmit = (e) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.excerpt || !newBlog.image) return;
    addBlog({
      title: newBlog.title,
      category: newBlog.category || 'Healthcare Insights',
      author: newBlog.author || 'Royal Crown Healthcare Ventures',
      excerpt: newBlog.excerpt,
      image: newBlog.image,
      readTime: '5 min read',
      tags: [],
      content: [{ type: 'paragraph', text: newBlog.contentText || newBlog.excerpt }]
    });
    setNewBlog({ title: '', category: '', author: '', excerpt: '', image: '', contentText: '' });
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
              className={`admin-nav-item ${activeTab === 'categories' ? 'active' : ''}`}
              onClick={() => setActiveTab('categories')}
            >
              <Package size={16} />
              <span>Categories ({categories.length})</span>
            </div>

            <div
              className={`admin-nav-item ${activeTab === 'clients' ? 'active' : ''}`}
              onClick={() => setActiveTab('clients')}
            >
              <Building2 size={16} />
              <span>Client Logos ({clients.length})</span>
            </div>

            <div
              className={`admin-nav-item ${activeTab === 'blogs' ? 'active' : ''}`}
              onClick={() => setActiveTab('blogs')}
            >
              <FileText size={16} />
              <span>Blogs ({blogs.length})</span>
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
                          {categories.map((cat) => (
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

                    <div className="form-group">
                      <label className="form-label">Product Photos (up to 7)</label>
                      <div className="admin-image-upload-grid">
                        {newProd.images.map((image, index) => (
                          <label className="admin-image-upload" key={index}>
                            <span>Photo {index + 1}</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleProductImageUpload(index, e.target.files[0])}
                            />
                            {image && <img src={image} alt={`Product preview ${index + 1}`} />}
                          </label>
                        ))}
                      </div>
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

            {/* 2. CATEGORY MANAGEMENT */}
            {activeTab === 'categories' && (
              <div className="admin-content-card">
                <div style={{ marginBottom: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary-900)' }}>Product Category Manager</h2>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>Create, delete, and reorder the categories shown across the website.</span>
                </div>
                <form onSubmit={handleAddCategorySubmit} className="form-row form-row-2" style={{ marginBottom: '2rem' }}>
                  <div className="form-group"><label className="form-label required">Category Name</label><input className="form-control" required value={newCategory.name} onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })} /></div>
                  <div className="form-group"><label className="form-label">Short Name</label><input className="form-control" value={newCategory.shortName} onChange={(e) => setNewCategory({ ...newCategory, shortName: e.target.value })} /></div>
                  <div className="form-group"><label className="form-label">Description</label><textarea className="form-control" rows={2} value={newCategory.description} onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })} /></div>
                  <div className="form-group"><label className="form-label">Image URL</label><input className="form-control" type="url" value={newCategory.image} onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })} /></div>
                  <button className="btn btn-primary btn-sm" type="submit"><Plus size={14} /> Add Category</button>
                </form>
                <div className="admin-list-stack">
                  {categories.map((category, index) => (
                    <div className="admin-list-row" key={category.id}>
                      <div><strong>{category.name}</strong><span>{category.slug}</span></div>
                      <div className="admin-row-actions">
                        <button className="btn btn-secondary btn-sm" type="button" disabled={index === 0} onClick={() => moveCategory(category.id, -1)}>Up</button>
                        <button className="btn btn-secondary btn-sm" type="button" disabled={index === categories.length - 1} onClick={() => moveCategory(category.id, 1)}>Down</button>
                        <button className="btn btn-danger btn-sm" type="button" onClick={() => deleteCategory(category.id)}><Trash2 size={14} /> Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. CLIENT LOGO MANAGEMENT */}
            {activeTab === 'clients' && (
              <div className="admin-content-card">
                <div style={{ marginBottom: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary-900)' }}>Our Clients</h2>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>Upload client partner logos for the homepage.</span>
                </div>
                <form onSubmit={handleAddClientSubmit} className="form-row form-row-2" style={{ marginBottom: '2rem' }}>
                  <div className="form-group"><label className="form-label required">Client / Institution Name</label><input className="form-control" required value={newClient.name} onChange={(e) => setNewClient({ ...newClient, name: e.target.value })} /></div>
                  <div className="form-group"><label className="form-label required">Logo Image</label><input className="form-control" required type="file" accept="image/*" onChange={(e) => readImageFile(e.target.files[0], (logo) => setNewClient({ ...newClient, logo }))} /></div>
                  <button className="btn btn-primary btn-sm" type="submit"><Plus size={14} /> Add Client Logo</button>
                </form>
                <div className="admin-list-stack">
                  {clients.length === 0 && <p style={{ color: 'var(--color-text-muted)' }}>No client logos uploaded yet.</p>}
                  {clients.map((client) => (
                    <div className="admin-list-row" key={client.id}>
                      <div className="admin-client-preview"><img src={client.logo} alt={client.name} /><strong>{client.name}</strong></div>
                      <button className="btn btn-danger btn-sm" type="button" onClick={() => deleteClient(client.id)}><Trash2 size={14} /> Delete</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. BLOG MANAGEMENT */}
            {activeTab === 'blogs' && (
              <div className="admin-content-card">
                <div style={{ marginBottom: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary-900)' }}>Blog Content Manager</h2>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>Upload article images and publish blog content from the admin panel.</span>
                </div>
                <form onSubmit={handleAddBlogSubmit}>
                  <div className="form-row form-row-2">
                    <div className="form-group"><label className="form-label required">Blog Title</label><input className="form-control" required value={newBlog.title} onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })} /></div>
                    <div className="form-group"><label className="form-label">Category</label><input className="form-control" value={newBlog.category} onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })} /></div>
                    <div className="form-group"><label className="form-label">Author</label><input className="form-control" value={newBlog.author} onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })} /></div>
                    <div className="form-group"><label className="form-label required">Blog Photo</label><input className="form-control" required type="file" accept="image/*" onChange={(e) => readImageFile(e.target.files[0], (image) => setNewBlog({ ...newBlog, image }))} /></div>
                  </div>
                  <div className="form-group"><label className="form-label required">Excerpt</label><textarea className="form-control" required rows={2} value={newBlog.excerpt} onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })} /></div>
                  <div className="form-group"><label className="form-label">Article Content</label><textarea className="form-control" rows={6} value={newBlog.contentText} onChange={(e) => setNewBlog({ ...newBlog, contentText: e.target.value })} /></div>
                  <button className="btn btn-primary btn-sm" type="submit"><Plus size={14} /> Publish Blog</button>
                </form>
                <div className="admin-list-stack" style={{ marginTop: '2rem' }}>
                  {blogs.map((blog) => (
                    <div className="admin-list-row" key={blog.id}>
                      <div><strong>{blog.title}</strong><span>{blog.category} • {blog.date}</span></div>
                      <button className="btn btn-danger btn-sm" type="button" onClick={() => deleteBlog(blog.id)}><Trash2 size={14} /> Delete</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. ENQUIRIES & RFQ TRACKER */}
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
