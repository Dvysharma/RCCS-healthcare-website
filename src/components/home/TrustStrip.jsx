import React from 'react';
import { SITE_CONFIG } from '../../config/siteConfig';
import { Package, Layers, Building, Headphones } from 'lucide-react';

export default function TrustStrip() {
  const icons = [Package, Layers, Building, Headphones];

  return (
    <div className="trust-strip">
      <div className="container">
        <div className="trust-grid">
          {SITE_CONFIG.pillars.map((pillar, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div key={idx} className="trust-item">
                <div className="trust-icon-box">
                  <Icon size={20} />
                </div>
                <div>
                  <div className="trust-title">{pillar.title}</div>
                  <div className="trust-desc">{pillar.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
