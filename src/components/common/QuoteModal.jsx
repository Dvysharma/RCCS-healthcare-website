import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useCMS } from '../../context/CMSContext';
import { useToast } from '../../context/ToastContext';
import { SITE_CONFIG } from '../../config/siteConfig';
import { X, FileSpreadsheet, Trash2, Send, MessageSquare, Building2, CheckCircle2 } from 'lucide-react';

export default function QuoteModal({ isOpen, onClose, initialProduct = null }) {
  const { quoteItems, removeFromQuote, clearQuote, addToQuote } = useCart();
  const { submitEnquiry } = useCMS();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    contactName: '',
    facilityName: '',
    phone: '',
    email: '',
    gstin: '',
    deliveryLocation: 'Dehradun, Uttarakhand',
    customRequirement: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');

  // If opened for a single specific product and quoteItems is empty, ensure it is in the list
  useEffect(() => {
    if (initialProduct && isOpen) {
      const exists = quoteItems.some((item) => item.product.id === initialProduct.id);
      if (!exists) {
        addToQuote(initialProduct, 10);
      }
    }
  }, [initialProduct, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateQuoteSummaryText = () => {
    const itemsList = quoteItems.length > 0
      ? quoteItems.map((item) => `• ${item.product.name} (SKU: ${item.product.sku}) - Qty: ${item.targetQuantity} units`).join('\n')
      : (initialProduct ? `• ${initialProduct.name} (SKU: ${initialProduct.sku}) - Bulk Requirement` : 'General Medical Supplies Requirement');

    return `*ROYAL CROWN HEALTHCARE - RFQ QUOTATION REQUEST*\n\n` +
      `*Facility:* ${formData.facilityName || 'Healthcare Facility'}\n` +
      `*Contact:* ${formData.contactName}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Email:* ${formData.email}\n` +
      `*Location:* ${formData.deliveryLocation}\n` +
      (formData.gstin ? `*GSTIN:* ${formData.gstin}\n` : '') +
      `\n*Required Items:*\n${itemsList}\n\n` +
      (formData.customRequirement ? `*Notes:* ${formData.customRequirement}\n` : '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.contactName || !formData.phone) {
      addToast('Please provide your name and phone number', 'error');
      return;
    }

    const itemsSummary = quoteItems.length > 0
      ? quoteItems.map((item) => `${item.product.name} [SKU: ${item.product.sku}] (Qty: ${item.targetQuantity})`).join(', ')
      : (initialProduct ? `${initialProduct.name} [SKU: ${initialProduct.sku}]` : 'Bulk Catalog Requirement');

    const enquiryRecord = submitEnquiry({
      type: "Bulk Quotation Request",
      name: formData.contactName,
      company: formData.facilityName || "Clinic / Hospital",
      phone: formData.phone,
      email: formData.email,
      gstin: formData.gstin,
      location: formData.deliveryLocation,
      items: itemsSummary,
      message: formData.customRequirement || "Bulk procurement inquiry"
    });

    setSubmissionId(enquiryRecord.id);
    setIsSubmitted(true);
    addToast('Quotation request submitted successfully!', 'success');
  };

  const handleWhatsAppSend = () => {
    const text = generateQuoteSummaryText();
    const url = `https://wa.me/${SITE_CONFIG.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleReset = () => {
    setIsSubmitted(false);
    clearQuote();
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <FileSpreadsheet size={20} color="var(--color-teal-700)" />
            <h3 className="modal-title">Bulk Procurement & Quotation Request</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {isSubmitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <CheckCircle2 size={56} color="var(--color-teal-700)" style={{ margin: '0 auto 1rem' }} />
              <h4 style={{ fontSize: '1.375rem', marginBottom: '0.5rem', color: 'var(--color-primary-900)' }}>
                Quotation Request Received!
              </h4>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', maxWidth: '480px', margin: '0 auto 1.5rem' }}>
                Thank you, <strong>{formData.contactName}</strong>. Your reference ID is <strong>{submissionId}</strong>. Our hospital procurement desk in Dehradun will review product availability and share pricing promptly.
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <button className="btn btn-whatsapp" onClick={handleWhatsAppSend}>
                  <MessageSquare size={16} />
                  <span>Send via WhatsApp Now</span>
                </button>
                <button className="btn btn-secondary" onClick={handleReset}>
                  <span>Close & Continue Browsing</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Product items in quotation basket */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--color-teal-700)', marginBottom: '0.625rem' }}>
                  Quotation Items ({quoteItems.length})
                </div>

                {quoteItems.length === 0 ? (
                  <div style={{ padding: '1rem', background: 'var(--color-bg-page)', border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
                    No specific items in quotation list. You can specify your bulk requirements in the form below.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '180px', overflowY: 'auto', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '0.5rem' }}>
                    {quoteItems.map((item) => (
                      <div key={item.product.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem', background: '#FFFFFF', border: '1px solid var(--color-border-light)', borderRadius: 'var(--radius-xs)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img src={item.product.images[0]} alt={item.product.name} style={{ width: '36px', height: '36px', objectFit: 'contain', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xs)' }} />
                          <div>
                            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-primary-900)' }}>{item.product.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>SKU: {item.product.sku}</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-teal-700)' }}>
                            Target: {item.targetQuantity} units
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFromQuote(item.product.id)}
                            style={{ color: 'var(--color-danger)', padding: '0.25rem' }}
                            title="Remove"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Institutional & Contact Form */}
              <div className="form-row form-row-2">
                <div className="form-group">
                  <label className="form-label required">Contact Person Name</label>
                  <input
                    type="text"
                    name="contactName"
                    required
                    className="form-control"
                    placeholder="e.g. Dr. Rajesh Kumar / Mr. Sharma"
                    value={formData.contactName}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Hospital / Clinic / Business Name</label>
                  <input
                    type="text"
                    name="facilityName"
                    className="form-control"
                    placeholder="e.g. Doon Care Hospital / City Clinic"
                    value={formData.facilityName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row form-row-2">
                <div className="form-group">
                  <label className="form-label required">Mobile Number</label>
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
                    placeholder="procurement@facility.org"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row form-row-2">
                <div className="form-group">
                  <label className="form-label">GSTIN (Optional for Tax Invoice)</label>
                  <input
                    type="text"
                    name="gstin"
                    className="form-control"
                    placeholder="05AAAAA0000A1Z5"
                    value={formData.gstin}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Delivery Destination</label>
                  <input
                    type="text"
                    name="deliveryLocation"
                    className="form-control"
                    placeholder="City, State (e.g. Dehradun, Uttarakhand)"
                    value={formData.deliveryLocation}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Specific Requirements / Required Delivery Timeline</label>
                <textarea
                  name="customRequirement"
                  className="form-control"
                  placeholder="Specify required batch quantities, regular monthly schedule, or urgent dispatch requirements..."
                  value={formData.customRequirement}
                  onChange={handleChange}
                />
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn btn-whatsapp"
                  onClick={handleWhatsAppSend}
                >
                  <MessageSquare size={16} />
                  <span>Enquire on WhatsApp</span>
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  <Send size={16} />
                  <span>Submit Quotation Request</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
