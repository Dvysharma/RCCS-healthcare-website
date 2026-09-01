import React from 'react';
import { BLOGS } from '../data/blogs';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import { Calendar, Clock, User, Share2, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

export default function BlogDetailPage({ slug, onNavigate, onOpenQuoteModal }) {
  const blog = BLOGS.find((b) => b.slug === slug) || BLOGS[0];
  const relatedPosts = BLOGS.filter((b) => b.id !== blog.id).slice(0, 2);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="blog-detail-page">
      <Breadcrumbs
        items={[
          { label: 'Healthcare Insights', path: '/blog' },
          { label: blog.title }
        ]}
        onNavigate={onNavigate}
      />

      <div className="container section-padding-sm">
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          {/* Back link */}
          <button
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: 'var(--color-teal-700)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1.5rem' }}
            onClick={() => onNavigate('/blog')}
          >
            <ArrowLeft size={16} />
            <span>Back to All Insights</span>
          </button>

          {/* Article Header */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8125rem', color: 'var(--color-teal-700)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              <span>{blog.category}</span>
              <span>•</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-text-muted)' }}>
                <Calendar size={13} />
                <span>{blog.date}</span>
              </div>
              <span>•</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-text-muted)' }}>
                <Clock size={13} />
                <span>{blog.readTime}</span>
              </div>
            </div>

            <h1 style={{ fontSize: 'clamp(1.85rem, 3.5vw, 2.5rem)', fontWeight: 800, color: 'var(--color-primary-900)', lineHeight: 1.25, marginBottom: '1.25rem' }}>
              {blog.title}
            </h1>

            {/* Author & Share Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.875rem 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                <User size={16} color="var(--color-teal-700)" />
                <span>By <strong>{blog.author}</strong></span>
              </div>

              <button
                className="btn btn-secondary btn-sm"
                onClick={handleShare}
              >
                <Share2 size={14} />
                <span>Share Article</span>
              </button>
            </div>
          </div>

          {/* Featured Image */}
          <div style={{ width: '100%', height: '400px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', marginBottom: '2.5rem', border: '1px solid var(--color-border)' }}>
            <img
              src={blog.image}
              alt={blog.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Article Body */}
          <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: 'clamp(1.5rem, 3vw, 2.5rem)', marginBottom: '3rem' }}>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.75', color: 'var(--color-text-primary)', fontWeight: 500, marginBottom: '1.75rem', borderLeft: '4px solid var(--color-teal-700)', paddingLeft: '1rem' }}>
              {blog.excerpt}
            </p>

            {blog.content.map((block, idx) => {
              if (block.type === 'heading') {
                return (
                  <h2 key={idx} style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--color-primary-900)', marginTop: '2rem', marginBottom: '0.75rem' }}>
                    {block.text}
                  </h2>
                );
              }
              return (
                <p key={idx} style={{ fontSize: '1rem', lineHeight: '1.75', color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
                  {block.text}
                </p>
              );
            })}

            {/* Tags */}
            {blog.tags && (
              <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--color-border-light)', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {blog.tags.map((tag, idx) => (
                  <span key={idx} style={{ fontSize: '0.75rem', background: 'var(--color-bg-page)', border: '1px solid var(--color-border)', padding: '0.25rem 0.625rem', borderRadius: 'var(--radius-xs)', color: 'var(--color-text-secondary)' }}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Sourcing Callout */}
          <div style={{ background: 'var(--color-primary-900)', color: '#FFFFFF', padding: '2rem', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '3.5rem' }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.125rem', color: '#FFFFFF', marginBottom: '0.25rem' }}>
                Require Bulk Supplies for Your Facility?
              </div>
              <div style={{ color: '#CBD5E1', fontSize: '0.875rem' }}>
                Direct regional hospital distribution in Dehradun and Uttarakhand.
              </div>
            </div>
            <button className="btn btn-primary" onClick={() => onOpenQuoteModal()}>
              Request Quotation
            </button>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary-900)', marginBottom: '1.25rem' }}>
                Related Industry Articles
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                {relatedPosts.map((rel) => (
                  <div
                    key={rel.id}
                    className="why-card"
                    style={{ padding: '1.25rem', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
                    onClick={() => onNavigate(`/blog/${rel.slug}`)}
                  >
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-teal-700)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.375rem' }}>
                      {rel.category}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--color-primary-900)', marginBottom: '0.5rem' }}>
                      {rel.title}
                    </div>
                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8125rem', color: 'var(--color-teal-700)', fontWeight: 600 }}>
                      <span>Read More</span>
                      <ArrowRight size={12} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
