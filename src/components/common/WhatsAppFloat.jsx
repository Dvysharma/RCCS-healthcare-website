import React from 'react';
import { SITE_CONFIG } from '../../config/siteConfig';
import { MessageSquare } from 'lucide-react';

export default function WhatsAppFloat() {
  const handleClick = (e) => {
    e.preventDefault();
    const message = `Hello Royal Crown Healthcare Ventures, I am looking for medical supplies and hospital consumables in Dehradun. Please assist me.`;
    const url = `https://wa.me/${SITE_CONFIG.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <a
      href={`https://wa.me/${SITE_CONFIG.whatsappNumber.replace('+', '')}`}
      onClick={handleClick}
      className="whatsapp-float-btn"
      aria-label="Chat on WhatsApp with Royal Crown Healthcare Ventures"
    >
      <MessageSquare size={18} />
      <span>Quick WhatsApp</span>
    </a>
  );
}
