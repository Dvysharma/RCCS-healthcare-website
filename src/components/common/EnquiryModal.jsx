import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { useToast } from '../../context/ToastContext';
import { SITE_CONFIG } from '../../config/siteConfig';
import { X, HelpCircle, Send, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function EnquiryModal({ isOpen, onClose, product = null }) {
  const { submitEnquiry } = useCMS();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    requirement: product ? `Inquiry regarding ${product.name} (SKU: ${product.sku})` : ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

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
      type: product ? "Product Enquiry" : "General Supply Enquiry",
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      company: formData.company || "Direct Inquiry",
      items: product ? `${product.name} [SKU: ${product.sku}]` : "Custom Sourcing Request",
      message: formData.requirement
    });

    setIsSubmitted(true);
    addToast('Enquiry received. Our team will contact you shortly.', 'success');
  };

  const handleWhatsApp = () => {
    const text = `Hello Royal Crown Healthcare Ventures, I have an inquiry:\n` +
      `Name: ${formData.name}\n` +
      `Facility: ${formData.company}\n` +
      `Product/Requirement: ${formData.requirement || (product ? product.name : 'Custom Medical Supply')}`;
    const url = `https://wa.me/${SITE_CONFIG.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <HelpCircle size={20} color="var(--color-teal-700)" />
            <h3 className="modal-title">{product ? `Enquire: ${product.name}` : "Product Sourcing & Availability Enquiry"}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {isSubmitted ? (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <CheckCircle2 size={48} color="var(--color-teal-700)" style={{ margin: '0 auto 1rem' }} />
              <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-primary-900)' }}>
                Thank You!
              </h4>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
                Our team has received your enquiry and will respond with availability and pricing shortly.
              </p>
              <button className="btn btn-primary" onClick={onClose}>
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label required">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="form-control"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row form-row-2">
                <div className="form-group">
                  <label className="form-label required">Phone Number</label>
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
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Hospital / Clinic / Company Name</label>
                <input
                  type="text"
                  name="company"
                  className="form-control"
                  placeholder="Optional clinic or business name"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label required">What are you looking for?</label>
                <textarea
                  name="requirement"
                  required
                  className="form-control"
                  placeholder="Describe the medical supplies, sizes, required quantities, or specific brands you are seeking..."
                  value={formData.requirement}
                  onChange={handleChange}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.25rem' }}>
                <button type="button" className="btn btn-whatsapp" onClick={handleWhatsApp}>
                  <MessageSquare size={16} />
                  <span>WhatsApp</span>
                </button>
                <button type="submit" className="btn btn-primary">
                  <Send size={16} />
                  <span>Submit Enquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
