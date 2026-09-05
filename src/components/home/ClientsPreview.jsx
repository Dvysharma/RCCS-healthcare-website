import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { Building2 } from 'lucide-react';

export default function ClientsPreview() {
  const { clients } = useCMS();

  return (
    <section className="section-padding clients-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-eyebrow">Our Clients</span>
          <h2 className="section-title">Trusted by Healthcare Teams</h2>
          <p className="section-description">Healthcare facilities and institutions we support with dependable supply.</p>
        </div>
        {clients.length > 0 ? (
          <div className="clients-logo-grid">
            {clients.map((client) => (
              <div className="client-logo-card" key={client.id}>
                <img src={client.logo} alt={client.name} loading="lazy" />
                <span>{client.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="clients-empty-state">
            <Building2 size={22} />
            <span>Client partner logos will appear here.</span>
          </div>
        )}
      </div>
    </section>
  );
}
