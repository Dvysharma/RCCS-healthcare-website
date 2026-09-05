import React from 'react';
import Hero from '../components/home/Hero';
import TrustStrip from '../components/home/TrustStrip';
import CategoryGrid from '../components/home/CategoryGrid';
import FeaturedGrid from '../components/home/FeaturedGrid';
import BulkCta from '../components/home/BulkCta';
import WhyUs from '../components/home/WhyUs';
import Segments from '../components/home/Segments';
import AboutPreview from '../components/home/AboutPreview';
import EnquiryCta from '../components/home/EnquiryCta';
import BlogPreview from '../components/home/BlogPreview';
import ClientsPreview from '../components/home/ClientsPreview';

export default function HomePage({ onNavigate, onOpenQuoteModal, onOpenEnquiryModal }) {
  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <Hero
        onNavigate={onNavigate}
        onOpenQuoteModal={onOpenQuoteModal}
      />

      {/* 2. Trust Strip */}
      <TrustStrip />

      {/* 3. Shop by Category (10 Major Categories) */}
      <CategoryGrid onNavigate={onNavigate} />

      {/* 4. Featured Products Showcase */}
      <FeaturedGrid
        onNavigate={onNavigate}
        onOpenQuoteModal={onOpenQuoteModal}
      />

      {/* 5. Bulk Order / Procurement CTA */}
      <BulkCta onOpenQuoteModal={onOpenQuoteModal} />

      {/* 6. Why Royal Crown Healthcare Ventures */}
      <WhyUs />

      {/* 7. Healthcare Customer Types / Care Environments */}
      <Segments />

      {/* 8. About Preview */}
      <AboutPreview onNavigate={onNavigate} />

      {/* 9. Client Partners */}
      <ClientsPreview />

      {/* 10. Product Enquiry CTA (Can't find what you need?) */}
      <EnquiryCta onOpenEnquiryModal={onOpenEnquiryModal} />

      {/* 11. Healthcare Insights / Blog Preview */}
      <BlogPreview onNavigate={onNavigate} />
    </div>
  );
}
