import React, { useState } from 'react';
import { SITE_CONFIG } from '../../config/siteConfig';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import MegaMenu from './MegaMenu';
import MobileNav from './MobileNav';
import SearchBar from '../common/SearchBar';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Search, 
  ShoppingCart, 
  FileSpreadsheet, 
  User, 
  Menu, 
  ChevronDown,
  Building2
} from 'lucide-react';

export default function Header({ currentPath, onNavigate, onOpenQuoteModal }) {
  const { cartCount, quoteCount } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);

  return (
    <>
      {/* 1. TOP UTILITY BAR */}
      <div className="top-utility-bar">
        <div className="container">
          <div className="topbar-content">
            <div className="topbar-left">
              <span className="topbar-item">
                <Phone size={13} />
                <a href={`tel:${SITE_CONFIG.primaryPhoneClean}`}>{SITE_CONFIG.primaryPhone}</a>
              </span>
              <span className="topbar-item topbar-email">
                <Mail size={13} />
                <a href={`mailto:${SITE_CONFIG.primaryEmail}`}>{SITE_CONFIG.primaryEmail}</a>
              </span>
              <span className="topbar-item topbar-location">
                <MapPin size={13} />
                <span>Haridwar Bypass Rd, Dehradun</span>
              </span>
            </div>

            <div className="topbar-right">
              <span className="topbar-item topbar-gstin" style={{ fontSize: '0.75rem' }}>
                <Building2 size={13} />
                <span>GSTIN: <strong>{SITE_CONFIG.gstin}</strong></span>
              </span>
              <span className="topbar-badge">
                Bulk Orders & Hospital Supply
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <header className="main-header">
        <div className="container">
          <div className="header-container">
            {/* Logo */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="brand-logo"
              aria-label="Royal Crown Healthcare Ventures Home"
            >
              <img
                src={encodeURI('/RCCS healthcare.jpeg')}
                alt="Royal Crown Healthcare Ventures"
                className="brand-image"
                style={{ height: '48px', objectFit: 'contain' }}
              />
            </a>

            {/* Desktop Navigation */}
            <nav className="main-nav" aria-label="Main Navigation">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/');
                }}
                className={`nav-link ${currentPath === '/' ? 'active' : ''}`}
              >
                Home
              </a>

              <div className={`nav-item-dropdown ${isProductsMenuOpen ? 'is-open' : ''}`}>
                <a
                  href="/products"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsProductsMenuOpen((isOpen) => !isOpen);
                  }}
                  className={`nav-link ${currentPath.startsWith('/products') || currentPath.startsWith('/category') ? 'active' : ''}`}
                  aria-expanded={isProductsMenuOpen}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                >
                  <span>Products</span>
                  <ChevronDown size={14} />
                </a>
                <MegaMenu onNavigate={onNavigate} isOpen={isProductsMenuOpen} />
              </div>

              <a
                href="/about"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/about');
                }}
                className={`nav-link ${currentPath === '/about' ? 'active' : ''}`}
              >
                About Us
              </a>

              <a
                href="/blog"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/blog');
                }}
                className={`nav-link ${currentPath.startsWith('/blog') ? 'active' : ''}`}
              >
                Insights
              </a>

              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/contact');
                }}
                className={`nav-link ${currentPath === '/contact' ? 'active' : ''}`}
              >
                Contact
              </a>
            </nav>

            {/* Header Right Actions */}
            <div className="header-actions">
              {/* Search Toggle */}
              <div className="desktop-search">
                <SearchBar onNavigate={onNavigate} />
              </div>

              <button
                className="action-icon-btn mobile-search-toggle"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Toggle search"
              >
                <Search size={18} />
              </button>

              {/* Account */}
              <button
                className="action-icon-btn header-account"
                onClick={() => onNavigate('/account')}
                title={isAuthenticated ? `Logged in: ${user?.name}` : "Customer Account / Login"}
                aria-label="User Account"
              >
                <User size={18} />
              </button>

              {/* Quote Basket (B2B RFQ) */}
              <button
                className="action-icon-btn header-quote"
                onClick={() => onOpenQuoteModal()}
                title="B2B Quotation List"
                aria-label="View Quotation Basket"
              >
                <FileSpreadsheet size={18} />
                {quoteCount > 0 && <span className="action-badge quote-badge">{quoteCount}</span>}
              </button>

              {/* Shopping Cart */}
              <button
                className="action-icon-btn header-cart"
                onClick={() => onNavigate('/cart')}
                title="Shopping Cart"
                aria-label="View Shopping Cart"
              >
                <ShoppingCart size={18} />
                {cartCount > 0 && <span className="action-badge">{cartCount}</span>}
              </button>

              {/* Primary CTA */}
              <button
                onClick={() => onOpenQuoteModal()}
                className="btn btn-primary btn-sm header-cta"
              >
                Request a Quote
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                className="mobile-menu-toggle"
                onClick={() => setIsMobileNavOpen(true)}
                aria-label="Open Navigation Menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>

          {/* Mobile Search Expand */}
          {isSearchOpen && (
            <div className="mobile-search-panel">
              <SearchBar onNavigate={onNavigate} autoFocus onClose={() => setIsSearchOpen(false)} />
            </div>
          )}
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onNavigate={onNavigate}
      />
    </>
  );
}
