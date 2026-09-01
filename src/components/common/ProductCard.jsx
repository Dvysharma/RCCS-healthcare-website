import React from 'react';
import { useCart } from '../../context/CartContext';
import { SITE_CONFIG } from '../../config/siteConfig';
import { ShoppingCart, FileSpreadsheet, Eye, MessageSquare } from 'lucide-react';

export default function ProductCard({ product, onNavigate, onOpenQuoteModal }) {
  const { addToCart, addToQuote } = useCart();

  const handleWhatsAppEnquiry = (e) => {
    e.stopPropagation();
    const msg = `Hello Royal Crown Healthcare Ventures, I am interested in ${product.name}, SKU: ${product.sku}. Please share availability and pricing.`;
    const url = `https://wa.me/${SITE_CONFIG.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  const handleCardClick = () => {
    onNavigate(`/product/${product.slug}`);
  };

  return (
    <div className="product-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      {/* Media Image */}
      <div className="product-card-media">
        {product.featured && (
          <span className="product-card-badge featured">Featured</span>
        )}
        <img
          src={product.images && product.images[0] ? product.images[0] : "https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=800&q=80"}
          alt={product.name}
          className="product-card-img"
          loading="lazy"
        />
      </div>

      {/* Body Content */}
      <div className="product-card-body">
        <span className="product-card-category">{product.category.replace('-', ' ')}</span>
        <h3 className="product-card-title" title={product.name}>
          {product.name}
        </h3>
        
        <span className="product-card-sku">SKU: {product.sku}</span>

        <p className="product-card-spec-snippet">
          {product.shortDescription}
        </p>

        {/* Footer with Price & Actions */}
        <div className="product-card-footer" onClick={(e) => e.stopPropagation()}>
          <div className="product-card-price-row">
            {product.isPriceOnRequest || !product.price ? (
              <span className="product-card-price on-request">Price on Request</span>
            ) : (
              <div>
                <span className="product-card-price">{product.priceDisplay || `₹${product.price}`}</span>
                {product.compareAtPrice && (
                  <span style={{ fontSize: '0.75rem', textDecoration: 'line-through', color: 'var(--color-text-light)', marginLeft: '0.375rem' }}>
                    ₹{product.compareAtPrice}
                  </span>
                )}
              </div>
            )}
            <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              {product.stock || 'In Stock'}
            </span>
          </div>

          <div className="product-card-actions">
            {product.price && !product.isPriceOnRequest ? (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => addToCart(product, 1)}
                title="Add to Cart"
              >
                <ShoppingCart size={14} />
                <span>Add to Cart</span>
              </button>
            ) : (
              <button
                className="btn btn-navy btn-sm"
                onClick={() => onOpenQuoteModal ? onOpenQuoteModal(product) : addToQuote(product, 10)}
                title="Request Bulk Quotation"
              >
                <FileSpreadsheet size={14} />
                <span>Quote</span>
              </button>
            )}

            <button
              className="btn btn-secondary btn-sm"
              onClick={handleWhatsAppEnquiry}
              title="Enquire on WhatsApp"
            >
              <MessageSquare size={14} color="#25D366" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
