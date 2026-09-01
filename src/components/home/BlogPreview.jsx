import React from 'react';
import { BLOGS } from '../../data/blogs';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

export default function BlogPreview({ onNavigate }) {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-page)', borderTop: '1px solid var(--color-border)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="section-eyebrow">Industry Knowledge</span>
            <h2 className="section-title">Healthcare Insights</h2>
            <p className="section-description" style={{ maxWidth: '600px' }}>
              Practical guides on clinical consumables, sterilization compliance, and healthcare procurement.
            </p>
          </div>

          <button
            className="btn btn-outline"
            onClick={() => onNavigate('/blog')}
          >
            <span>Read All Articles</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {BLOGS.slice(0, 3).map((blog) => (
            <div
              key={blog.id}
              className="why-card"
              style={{ padding: 0, overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
              onClick={() => onNavigate(`/blog/${blog.slug}`)}
            >
              <div style={{ width: '100%', height: '180px', overflow: 'hidden', backgroundColor: 'var(--color-bg-subtle)' }}>
                <img
                  src={blog.image}
                  alt={blog.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
              </div>

              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--color-teal-700)', fontWeight: 600, textTransform: 'uppercase' }}>
                    {blog.category}
                  </span>
                  <span>•</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={12} />
                    <span>{blog.date}</span>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--color-primary-900)', marginBottom: '0.5rem', lineHeight: 1.35 }}>
                  {blog.title}
                </h3>

                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: '1rem', flex: 1 }}>
                  {blog.excerpt}
                </p>

                <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--color-border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-teal-700)' }}>
                  <span>Read Full Article</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
