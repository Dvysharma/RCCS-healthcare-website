import React from 'react';
import { PackageCheck, Boxes, Clock, Truck, ShieldCheck } from 'lucide-react';

export default function WhyUs() {
  const points = [
    {
      icon: PackageCheck,
      title: "Reliable Supply",
      text: "Essential healthcare products for routine hospital and clinical requirements, ensuring clinical workflows remain uninterrupted."
    },
    {
      icon: Boxes,
      title: "Wide Product Range",
      text: "Multiple categories of medical consumables, surgical equipment, and healthcare supplies under one roof in Dehradun."
    },
    {
      icon: Clock,
      title: "Responsive Support",
      text: "Quick assistance for product enquiries, custom bulk quotations, and order-related coordination from our regional desk."
    },
    {
      icon: Truck,
      title: "Bulk & Institutional Supply",
      text: "Direct support for institutional, hospital, and clinic procurement requirements with transparent GST invoicing."
    },
    {
      icon: ShieldCheck,
      title: "Quality-Focused Approach",
      text: "Products selected strictly with healthcare use, clinical reliability, and practical operational requirements in mind."
    }
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid var(--color-border)' }}>
      <div className="container">
        <div className="section-header text-center">
          <span className="section-eyebrow">Supplier Reliability</span>
          <h2 className="section-title">Why Royal Crown Healthcare Ventures</h2>
          <p className="section-description">
            Dependable healthcare procurement built on product availability, responsive regional support, and practical hospital fulfillment.
          </p>
        </div>

        <div className="why-grid">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div key={idx} className="why-card">
                <div className="why-card-icon">
                  <Icon size={24} />
                </div>
                <h3 className="why-card-title">{pt.title}</h3>
                <p className="why-card-text">{pt.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
