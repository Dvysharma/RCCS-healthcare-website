import React, { useState } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { useCMS } from '../context/CMSContext';
import { useToast } from '../context/ToastContext';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Building2, 
  Clock, 
  Send, 
  MessageSquare, 
  CheckCircle2,
  Navigation
} from 'lucide-react';

export default function ContactPage({ onNavigate }) {
  const { submitEnquiry } = useCMS();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    subject: 'Bulk Procurement & Pricing Inquiry',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      addToast('Please provide your name and phone number', 'error');
      return;
    }

    submitEnquiry({
      type: "Contact Form Message",
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      company: formData.company || "General Inquiry",
      items: formData.subject,
      message: formData.message
    });

    setIsSubmitted(true);
    addToast('Thank you! Your message has been sent to our supply team.', 'success');
  };

  const handleWhatsApp = () => {
    const text = `Hello Royal Crown Healthcare Ventures, I would like to contact your supply desk:\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      `Message: ${formData.message || 'General Procurement Enquiry'}`;
    const url = `https://wa.me/${SITE_CONFIG.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="contact-page">
      <Breadcrumbs
        items={[{ label: 'Contact Us' }]}
        onNavigate={onNavigate}
      />

      <div className="container section-padding">
        <div className="section-header">
          <span className="section-eyebrow">Direct Medical Supply Support</span>
          <h1 className="section-title">Contact Royal Crown Healthcare Ventures</h1>
          <p className="section-description">
            Reach out for product availability, bulk hospital quotations, institutional tenders, or sample requests.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }} className="form-row-2">
          {/* LEFT: Contact Information & Logistics Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '2rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary-900)', marginBottom: '1.5rem' }}>
                Central Supply Office & Facility
              </h2>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-xs)', background: 'var(--color-teal-50)', color: 'var(--color-teal-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                      Physical Address
                    </div>
                    <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-primary-900)', marginTop: '2px' }}>
                      {SITE_CONFIG.address.formatted}
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--color-teal-700)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Navigation size={12} />
                      <span>Near Decathlon Showroom, Dehradun</span>
                    </div>
                  </div>
                </li>

                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-xs)', background: 'var(--color-teal-50)', color: 'var(--color-teal-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                      Primary Phone (Orders & Enquiries)
                    </div>
                    <a href={`tel:${SITE_CONFIG.primaryPhoneClean}`} style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--color-primary-900)' }}>
                      {SITE_CONFIG.primaryPhone}
                    </a>
                  </div>
                </li>

                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-xs)', background: 'var(--color-teal-50)', color: 'var(--color-teal-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                      Official Email
                    </div>
                    <a href={`mailto:${SITE_CONFIG.primaryEmail}`} style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-teal-700)' }}>
                      {SITE_CONFIG.primaryEmail}
                    </a>
                  </div>
                </li>

                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-xs)', background: 'var(--color-teal-50)', color: 'var(--color-teal-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Building2 size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                      Tax & Business Registration
                    </div>
                    <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-primary-900)', fontFamily: 'monospace' }}>
                      GSTIN: {SITE_CONFIG.gstin}
                    </div>
                  </div>
                </li>

                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-xs)', background: 'var(--color-teal-50)', color: 'var(--color-teal-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Clock size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                      Business Hours
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                      {SITE_CONFIG.operatingHours}
                    </div>
                  </div>
                </li>
              </ul>

              {/* Quick Actions */}
              <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a href={`tel:${SITE_CONFIG.primaryPhoneClean}`} className="btn btn-primary btn-sm">
                  <Phone size={14} />
                  <span>Call Supply Desk</span>
                </a>
                <button className="btn btn-whatsapp btn-sm" onClick={handleWhatsApp}>
                  <MessageSquare size={14} />
                  <span>Chat on WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Location Map Visual Placeholder */}
            <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.25rem', overflow: 'hidden' }}>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-primary-900)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} color="var(--color-teal-700)" />
                <span>Facility Map Location (Dehradun)</span>
              </div>
              <div style={{ height: '180px', backgroundColor: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-xs)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '1rem', border: '1px dashed var(--color-border)' }}>
                <Navigation size={28} color="var(--color-teal-700)" style={{ marginBottom: '0.5rem' }} />
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-primary-900)' }}>
                  Haridwar Bypass Road, Near Decathlon
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  Dehradun, Uttarakhand, India
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Interactive Contact Form */}
          <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary-900)', marginBottom: '0.375rem' }}>
              Send an Inquiry
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
              Fill out the form below and our procurement specialists will respond with pricing and dispatch details.
            </p>

            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <CheckCircle2 size={56} color="var(--color-teal-700)" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-primary-900)', marginBottom: '0.5rem' }}>
                  Message Sent Successfully
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
                  Thank you, <strong>{formData.name}</strong>. Our team will review your requirement and reach out via phone or email.
                </p>
                <button className="btn btn-secondary" onClick={() => setIsSubmitted(false)}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label required">Your Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="form-control"
                    placeholder="e.g. Dr. Neeraj Pant / Procurement Manager"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-row form-row-2">
                  <div className="form-group">
                    <label className="form-label required">Mobile Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="form-control"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="name@facility.org"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Hospital / Clinic / Organization Name</label>
                  <input
                    type="text"
                    name="company"
                    className="form-control"
                    placeholder="e.g. Doon Medical Care"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Subject / Purpose</label>
                  <select
                    name="subject"
                    className="form-control"
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="Bulk Procurement & Pricing Inquiry">Bulk Procurement & Pricing Inquiry</option>
                    <option value="Product Availability & Stock Check">Product Availability & Stock Check</option>
                    <option value="Institutional Tender / Supply Contract">Institutional Tender / Supply Contract</option>
                    <option value="Sample Pack / Technical Specs Request">Sample Pack / Technical Specs Request</option>
                    <option value="Other Medical Sourcing Inquiry">Other Medical Sourcing Inquiry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label required">Detailed Requirement / Message</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="form-control"
                    placeholder="Specify the required product categories, approximate monthly volumes, or delivery timelines..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                  style={{ marginTop: '1rem' }}
                >
                  <Send size={16} />
                  <span>Submit Message to Supply Team</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
