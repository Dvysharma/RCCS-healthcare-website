import React from 'react';
import { 
  Building2, 
  Stethoscope, 
  FlaskConical, 
  HeartHandshake, 
  GraduationCap, 
  UserCheck, 
  Briefcase,
  Store
} from 'lucide-react';

export default function Segments() {
  const segments = [
    { name: "Hospitals & Tertiary Centers", icon: Building2 },
    { name: "Private Clinics & Doctors", icon: Stethoscope },
    { name: "Pathology & Diagnostic Labs", icon: FlaskConical },
    { name: "Nursing Homes & Maternity", icon: HeartHandshake },
    { name: "Healthcare Institutions", icon: GraduationCap },
    { name: "Medical Practitioners", icon: UserCheck },
    { name: "Distributors & Resellers", icon: Briefcase },
    { name: "Retail Customers & Patients", icon: Store }
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-page)', borderTop: '1px solid var(--color-border)' }}>
      <div className="container">
        <div className="section-header text-center">
          <span className="section-eyebrow">Target Environments</span>
          <h2 className="section-title">Healthcare Supplies for Every Care Environment</h2>
          <p className="section-description">
            Tailored supply solutions for clinical, surgical, diagnostic, and individual patient care settings.
          </p>
        </div>

        <div className="care-segments-grid">
          {segments.map((seg, idx) => {
            const Icon = seg.icon;
            return (
              <div key={idx} className="care-segment-card">
                <div className="care-segment-icon">
                  <Icon size={32} />
                </div>
                <div className="care-segment-name">{seg.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
