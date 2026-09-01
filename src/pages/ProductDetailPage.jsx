import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { SITE_CONFIG } from '../config/siteConfig';
import { CATEGORIES } from '../data/categories';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import ProductCard from '../components/common/ProductCard';
import { 
  ShoppingCart, 
  FileSpreadsheet, 
  MessageSquare, 
  ShieldCheck, 
  Truck, 
  Box, 
  Check, 
  Plus, 
  Minus,
  Maximize2,
  HelpCircle,
  CreditCard
} from 'lucide-react';

export default function ProductDetailPage({ slug, onNavigate, onOpenQuoteModal, onOpenEnquiryModal }) {
  const { products } = useCMS();
  const { addToCart, addToQuote } = useCart();
  const { addToast } = useToast();

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs', 'desc', 'packaging'
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);

  // Find product by slug
  const product = products.find((p) => p.slug === slug) || products[0];
  const categoryObj = CATEGORIES.find((c) => c.slug === product.category);

  // Related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleWhatsApp = () => {
    const text = `Hello Royal Crown Healthcare Ventures, I am interested in ${product.name}, SKU: ${product.sku}. Please share availability and pricing.`;
    const url = `https://wa.me/${SITE_CONFIG.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    onNavigate('/checkout');
  };

  const images = product.images && product.images.length > 0
    ? product.images
    : ["https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=800&q=80"];

  return (
    <div className="product-detail-page">
      <Breadcrumbs
        items={[
          { label: 'Products', path: '/products' },
          ...(categoryObj ? [{ label: categoryObj.name, path: `/category/${categoryObj.slug}` }] : []),
          { label: product.name }
        ]}
        onNavigate={onNavigate}
      />

      <div className="container section-padding-sm">
        <div className="product-detail-grid">
          {/* LEFT: Image Gallery & Zoom */}
          <div className="detail-gallery">
            <div className="detail-main-image-wrap" onClick={() => setIsZoomModalOpen(true)} style={{ cursor: 'zoom-in' }}>
              <button
                className="action-icon-btn"
                style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', zIndex: 2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomModalOpen(true);
                }}
                title="Zoom Product Image"
              >
                <Maximize2 size={16} />
              </button>
              <img
                src={images[selectedImageIndex]}
                alt={product.name}
                className="detail-main-image"
              />
            </div>

            {images.length > 1 && (
              <div className="detail-thumb-row">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`detail-thumb-btn ${selectedImageIndex === idx ? 'active' : ''}`}
                    onClick={() => setSelectedImageIndex(idx)}
                  >
                    <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Procurement Highlights Box */}
            <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.8125rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)' }}>
                <ShieldCheck size={16} color="var(--color-teal-700)" />
                <span>Verified Hospital Grade & Medical Standard</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)' }}>
                <Truck size={16} color="var(--color-teal-700)" />
                <span>Direct Supply from Dehradun Depot</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)' }}>
                <Box size={16} color="var(--color-teal-700)" />
                <span>MOQ: <strong>{product.moq || 'Standard Packaging'}</strong></span>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Information & Purchasing / Quote Actions */}
          <div className="detail-info">
            <span style={{ color: 'var(--color-teal-700)', fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.375rem' }}>
              {categoryObj ? categoryObj.name : 'Medical Consumables'}
            </span>

            <h1 className="detail-title">{product.name}</h1>

            <div className="detail-meta-strip">
              <span className="product-card-sku">SKU: {product.sku}</span>
              <span style={{ color: 'var(--color-border-strong)' }}>|</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-success)', fontWeight: 600 }}>
                <Check size={14} />
                <span>{product.availability || 'In Stock'}</span>
              </span>
              {product.brand && (
                <>
                  <span style={{ color: 'var(--color-border-strong)' }}>|</span>
                  <span style={{ color: 'var(--color-text-muted)' }}>Series: {product.brand}</span>
                </>
              )}
            </div>

            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              {product.shortDescription}
            </p>

            {/* Price Box */}
            <div className="detail-price-box">
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                Unit / Packaging Price
              </div>
              {product.isPriceOnRequest || !product.price ? (
                <div>
                  <div className="product-card-price on-request" style={{ fontSize: '1.5rem' }}>
                    Price on Request
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                    Institutional & bulk hospital tier pricing available on submission of required quantities.
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                  <span className="detail-price-value">{product.priceDisplay || `₹${product.price}`}</span>
                  {product.compareAtPrice && (
                    <span style={{ fontSize: '1rem', textDecoration: 'line-through', color: 'var(--color-text-light)' }}>
                      ₹{product.compareAtPrice}
                    </span>
                  )}
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>+ Applicable GST</span>
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Quantity:</span>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', background: '#FFFFFF' }}>
                <button
                  style={{ padding: '0.5rem 0.75rem', color: 'var(--color-text-secondary)' }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span style={{ padding: '0.5rem 1rem', fontWeight: 700, fontSize: '0.9375rem', minWidth: '40px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  style={{ padding: '0.5rem 0.75rem', color: 'var(--color-text-secondary)' }}
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              {product.packaging && (
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  Pack: {product.packaging.split('|')[0]}
                </span>
              )}
            </div>

            {/* Action Buttons Group */}
            <div className="detail-actions-group">
              {product.price && !product.isPriceOnRequest ? (
                <>
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={() => addToCart(product, quantity)}
                  >
                    <ShoppingCart size={16} />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    className="btn btn-navy btn-lg"
                    onClick={handleBuyNow}
                  >
                    <CreditCard size={16} />
                    <span>Buy Now</span>
                  </button>
                </>
              ) : null}

              <button
                className="btn btn-quote btn-lg"
                onClick={() => onOpenQuoteModal(product)}
              >
                <FileSpreadsheet size={16} />
                <span>Request Bulk Quote</span>
              </button>

              <button
                className="btn btn-whatsapp btn-lg"
                onClick={handleWhatsApp}
              >
                <MessageSquare size={16} />
                <span>Enquire on WhatsApp</span>
              </button>
            </div>

            {/* Contact Procurement Sourcing Direct */}
            <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--color-border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Have a customized facility tender or requirement?</span>
              <button
                style={{ color: 'var(--color-teal-700)', fontWeight: 600, textDecoration: 'underline' }}
                onClick={() => onOpenEnquiryModal(product)}
              >
                Send Custom Inquiry
              </button>
            </div>
          </div>
        </div>

        {/* BELOW: Technical Specifications, Description & Packaging Tabs */}
        <div style={{ marginTop: '3.5rem', background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
          {/* Tab Headers */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-page)', overflowX: 'auto' }}>
            <button
              style={{ padding: '0.875rem 1.5rem', fontNumber: 600, fontSize: '0.875rem', fontWeight: activeTab === 'specs' ? 700 : 500, color: activeTab === 'specs' ? 'var(--color-teal-700)' : 'var(--color-text-secondary)', borderBottom: activeTab === 'specs' ? '2px solid var(--color-teal-700)' : 'none', background: activeTab === 'specs' ? '#FFFFFF' : 'transparent' }}
              onClick={() => setActiveTab('specs')}
            >
              Technical Specifications
            </button>
            <button
              style={{ padding: '0.875rem 1.5rem', fontNumber: 600, fontSize: '0.875rem', fontWeight: activeTab === 'desc' ? 700 : 500, color: activeTab === 'desc' ? 'var(--color-teal-700)' : 'var(--color-text-secondary)', borderBottom: activeTab === 'desc' ? '2px solid var(--color-teal-700)' : 'none', background: activeTab === 'desc' ? '#FFFFFF' : 'transparent' }}
              onClick={() => setActiveTab('desc')}
            >
              Product Overview & Features
            </button>
            <button
              style={{ padding: '0.875rem 1.5rem', fontNumber: 600, fontSize: '0.875rem', fontWeight: activeTab === 'packaging' ? 700 : 500, color: activeTab === 'packaging' ? 'var(--color-teal-700)' : 'var(--color-text-secondary)', borderBottom: activeTab === 'packaging' ? '2px solid var(--color-teal-700)' : 'none', background: activeTab === 'packaging' ? '#FFFFFF' : 'transparent' }}
              onClick={() => setActiveTab('packaging')}
            >
              Packaging & Logistics
            </button>
          </div>

          {/* Tab Content */}
          <div style={{ padding: '1.75rem' }}>
            {activeTab === 'specs' && (
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-primary-900)', marginBottom: '0.75rem' }}>
                  Technical Parameters
                </h3>
                {product.specifications ? (
                  <table className="specs-table">
                    <tbody>
                      {Object.entries(product.specifications).map(([key, val], idx) => (
                        <tr key={idx}>
                          <th>{key}</th>
                          <td>{val}</td>
                        </tr>
                      ))}
                      <tr>
                        <th>Catalogue SKU</th>
                        <td>{product.sku}</td>
                      </tr>
                      <tr>
                        <th>Supply Origin</th>
                        <td>Dehradun, Uttarakhand, India</td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <p style={{ color: 'var(--color-text-muted)' }}>Specifications available upon request from our technical team.</p>
                )}
              </div>
            )}

            {activeTab === 'desc' && (
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-primary-900)', marginBottom: '0.75rem' }}>
                  Clinical Description
                </h3>
                <p style={{ lineHeight: '1.7', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
                  {product.description}
                </p>

                {product.features && product.features.length > 0 && (
                  <div>
                    <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-primary-900)', marginBottom: '0.75rem' }}>
                      Key Clinical Advantages:
                    </h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {product.features.map((feat, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                          <Check size={16} color="var(--color-teal-700)" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'packaging' && (
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-primary-900)', marginBottom: '0.75rem' }}>
                  Packaging & Carton Breakdown
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem', lineHeight: '1.6' }}>
                  {product.packaging || "Packed in standard sterile medical dispenser boxes with outer corrugated master shipper."}
                </p>
                <div style={{ background: 'var(--color-bg-page)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xs)', padding: '1rem', fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                  <strong>Institutional Shipping Note:</strong> Outer cartons are sealed with tamper-evident tape and labeled with product batch numbers, manufacturing dates, and sterilization expiration dates for institutional audit compliance.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products in this Category */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '3.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary-900)', marginBottom: '1.25rem' }}>
              Related Medical Supplies
            </h3>
            <div className="product-grid-4">
              {relatedProducts.map((rel) => (
                <ProductCard
                  key={rel.id}
                  product={rel}
                  onNavigate={onNavigate}
                  onOpenQuoteModal={onOpenQuoteModal}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Zoom Modal */}
      {isZoomModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsZoomModalOpen(false)}>
          <div style={{ maxWidth: '90vw', maxHeight: '90vh', background: '#FFFFFF', padding: '1rem', borderRadius: 'var(--radius-sm)', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
            <button
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--color-primary-900)', color: '#FFFFFF', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onClick={() => setIsZoomModalOpen(false)}
            >
              &times;
            </button>
            <img
              src={images[selectedImageIndex]}
              alt={product.name}
              style={{ maxWidth: '85vw', maxHeight: '80vh', objectFit: 'contain' }}
            />
            <div style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-primary-900)' }}>
              {product.name} (SKU: {product.sku})
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
