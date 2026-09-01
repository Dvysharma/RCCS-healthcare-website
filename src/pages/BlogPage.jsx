import React, { useState, useMemo } from 'react';
import { BLOGS } from '../data/blogs';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import { Search, Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';

export default function BlogPage({ onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Infection Control', 'PPE & Safety', 'Healthcare Procurement'];

  const filteredBlogs = useMemo(() => {
    return BLOGS.filter((b) => {
      const matchCat = selectedCategory === 'All' || b.category === selectedCategory;
      const matchSearch = !searchQuery.trim() ||
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = BLOGS[0];

  return (
    <div className="blog-page">
      <Breadcrumbs
        items={[{ label: 'Healthcare Insights' }]}
        onNavigate={onNavigate}
      />

      <div className="container section-padding-sm">
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <span className="section-eyebrow">Medical Knowledge Desk</span>
          <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: 'var(--color-primary-900)', marginBottom: '0.5rem' }}>
            Healthcare Insights & Procurement Protocols
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', maxWidth: '720px' }}>
            Clinical guides, sterilization standards, and supply chain insights for hospital administrators and procurement professionals.
          </p>
        </div>

        {/* Featured Hero Article */}
        {featuredPost && selectedCategory === 'All' && !searchQuery && (
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', marginBottom: '3rem', cursor: 'pointer' }}
            onClick={() => onNavigate(`/blog/${featuredPost.slug}`)}
            className="form-row-2"
          >
            <div style={{ height: '320px', overflow: 'hidden' }}>
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--color-teal-700)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                <span>{featuredPost.category}</span>
                <span>•</span>
                <span style={{ color: 'var(--color-text-muted)' }}>{featuredPost.date}</span>
                <span>•</span>
                <span style={{ color: 'var(--color-text-muted)' }}>{featuredPost.readTime}</span>
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-primary-900)', marginBottom: '0.75rem', lineHeight: 1.3 }}>
                {featuredPost.title}
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                {featuredPost.excerpt}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--color-teal-700)', fontSize: '0.875rem' }}>
                <span>Read Full Clinical Article</span>
                <ArrowRight size={16} />
              </div>
            </div>
          </div>
        )}

        {/* Filter Controls & Search */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', padding: '1rem', background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ width: '260px' }}>
            <div className="search-input-box" style={{ padding: '0.125rem 0.625rem' }}>
              <Search size={14} className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ fontSize: '0.8125rem' }}
              />
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="why-card"
              style={{ padding: 0, overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
              onClick={() => onNavigate(`/blog/${blog.slug}`)}
            >
              <div style={{ width: '100%', height: '190px', overflow: 'hidden' }}>
                <img
                  src={blog.image}
                  alt={blog.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
              </div>

              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--color-teal-700)', fontWeight: 700, textTransform: 'uppercase' }}>
                    {blog.category}
                  </span>
                  <span>•</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={12} />
                    <span>{blog.date}</span>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-primary-900)', marginBottom: '0.5rem', lineHeight: 1.35 }}>
                  {blog.title}
                </h3>

                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem', flex: 1 }}>
                  {blog.excerpt}
                </p>

                <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-teal-700)' }}>
                  <span>Read Article</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
