import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import WhatsAppFloat from './components/common/WhatsAppFloat';
import QuoteModal from './components/common/QuoteModal';
import EnquiryModal from './components/common/EnquiryModal';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmPage from './pages/OrderConfirmPage';
import AccountPage from './pages/AccountPage';
import SearchPage from './pages/SearchPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
  
  // Modals state
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteModalProduct, setQuoteModalProduct] = useState(null);

  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryModalProduct, setEnquiryModalProduct] = useState(null);

  // Sync with browser history
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname + window.location.search);
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (toPath) => {
    window.history.pushState({}, '', toPath);
    setCurrentPath(toPath);
    window.scrollTo(0, 0);
  };

  const handleOpenQuoteModal = (product = null) => {
    setQuoteModalProduct(product);
    setQuoteModalOpen(true);
  };

  const handleOpenEnquiryModal = (product = null) => {
    setEnquiryModalProduct(product);
    setEnquiryModalOpen(true);
  };

  // Routing Logic
  const renderRoute = () => {
    const pathOnly = currentPath.split('?')[0];
    const urlParams = new URLSearchParams(currentPath.includes('?') ? currentPath.split('?')[1] : '');

    // 1. Home
    if (pathOnly === '/' || pathOnly === '') {
      return (
        <HomePage
          onNavigate={navigate}
          onOpenQuoteModal={handleOpenQuoteModal}
          onOpenEnquiryModal={handleOpenEnquiryModal}
        />
      );
    }

    // 2. All Products
    if (pathOnly === '/products') {
      return (
        <ProductsPage
          onNavigate={navigate}
          onOpenQuoteModal={handleOpenQuoteModal}
          initialCategory={urlParams.get('category') || ''}
          initialSubcategory={urlParams.get('sub') || ''}
        />
      );
    }

    // 3. Category Page: /category/:slug
    if (pathOnly.startsWith('/category/')) {
      const slug = pathOnly.replace('/category/', '');
      return (
        <CategoryPage
          slug={slug}
          onNavigate={navigate}
          onOpenQuoteModal={handleOpenQuoteModal}
        />
      );
    }

    // 4. Product Detail Page: /product/:slug
    if (pathOnly.startsWith('/product/')) {
      const slug = pathOnly.replace('/product/', '');
      return (
        <ProductDetailPage
          slug={slug}
          onNavigate={navigate}
          onOpenQuoteModal={handleOpenQuoteModal}
          onOpenEnquiryModal={handleOpenEnquiryModal}
        />
      );
    }

    // 5. About Us
    if (pathOnly === '/about') {
      return (
        <AboutPage
          onNavigate={navigate}
          onOpenQuoteModal={handleOpenQuoteModal}
        />
      );
    }

    // 6. Contact
    if (pathOnly === '/contact') {
      return (
        <ContactPage
          onNavigate={navigate}
        />
      );
    }

    // 7. Blog listing
    if (pathOnly === '/blog') {
      return (
        <BlogPage
          onNavigate={navigate}
        />
      );
    }

    // 8. Blog detail: /blog/:slug
    if (pathOnly.startsWith('/blog/')) {
      const slug = pathOnly.replace('/blog/', '');
      return (
        <BlogDetailPage
          slug={slug}
          onNavigate={navigate}
          onOpenQuoteModal={handleOpenQuoteModal}
        />
      );
    }

    // 9. Privacy Policy
    if (pathOnly === '/privacy-policy') {
      return (
        <PrivacyPolicyPage
          onNavigate={navigate}
        />
      );
    }

    // 10. Terms & Conditions
    if (pathOnly === '/terms-and-conditions') {
      return (
        <TermsPage
          onNavigate={navigate}
        />
      );
    }

    // 11. Shopping Cart
    if (pathOnly === '/cart') {
      return (
        <CartPage
          onNavigate={navigate}
          onOpenQuoteModal={handleOpenQuoteModal}
        />
      );
    }

    // 12. Checkout
    if (pathOnly === '/checkout') {
      return (
        <CheckoutPage
          onNavigate={navigate}
        />
      );
    }

    // 13. Order Confirmation: /order-confirmation/:id
    if (pathOnly.startsWith('/order-confirmation/')) {
      const orderId = pathOnly.replace('/order-confirmation/', '');
      return (
        <OrderConfirmPage
          orderId={orderId}
          onNavigate={navigate}
        />
      );
    }

    // 14. Customer Account / Login
    if (pathOnly === '/account') {
      return (
        <AccountPage
          onNavigate={navigate}
        />
      );
    }

    // 15. Search Results: /search
    if (pathOnly === '/search') {
      return (
        <SearchPage
          initialQuery={urlParams.get('q') || ''}
          onNavigate={navigate}
          onOpenQuoteModal={handleOpenQuoteModal}
        />
      );
    }

    // 16. Admin CMS
    if (pathOnly === '/admin') {
      return (
        <AdminPage
          onNavigate={navigate}
        />
      );
    }

    // 17. 404 Not Found fallback
    return (
      <NotFoundPage
        onNavigate={navigate}
      />
    );
  };

  return (
    <div className="app-layout">
      {/* Header with Topbar & Nav */}
      <Header
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
      />

      {/* Main Page View */}
      <main id="main-content">
        {renderRoute()}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigate} />

      {/* Global WhatsApp Floating Button */}
      <WhatsAppFloat />

      {/* Global B2B RFQ Quotation Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialProduct={quoteModalProduct}
      />

      {/* Global Product & Sourcing Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        product={enquiryModalProduct}
      />
    </div>
  );
}
