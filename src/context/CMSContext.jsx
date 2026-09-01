import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';
import { CATEGORIES as INITIAL_CATEGORIES } from '../data/categories';
import { SITE_CONFIG as INITIAL_CONFIG } from '../config/siteConfig';
import { useToast } from './ToastContext';

const CMSContext = createContext(null);

export function CMSProvider({ children }) {
  const { addToast } = useToast();

  // Products
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('rc_cms_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Categories
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('rc_cms_categories');
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  // Enquiries & RFQ submissions
  const [enquiries, setEnquiries] = useState(() => {
    try {
      const saved = localStorage.getItem('rc_cms_enquiries');
      return saved ? JSON.parse(saved) : [
        {
          id: "ENQ-1001",
          type: "Bulk Quotation",
          name: "Dr. Arvind Sharma",
          company: "City Heart Hospital, Dehradun",
          phone: "+91 9897123456",
          email: "procurement@cityheart.org",
          items: "Latex Surgical Gloves (20 Boxes), IV Sets (100 Sets), Sterilization Pouches (10 Boxes)",
          message: "Require urgent delivery to Rajpur Road branch. Please share GST proforma invoice.",
          date: "2026-08-30T10:15:00Z",
          status: "Under Review"
        }
      ];
    } catch {
      return [];
    }
  });

  // Orders
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('rc_cms_orders');
      return saved ? JSON.parse(saved) : [
        {
          id: "RCH-ORD-8821",
          customerName: "Dr. Meenakshi Rawat",
          facilityName: "Rawat Clinic & Maternity Home",
          phone: "+91 9412098765",
          email: "meenakshi.rawat@example.com",
          gstin: "05AAACR1234F1Z5",
          address: "14 EC Road, Dehradun, Uttarakhand - 248001",
          items: [
            { name: "Disposable Syringes with Mounted Needles", quantity: 5, price: 280 },
            { name: "Nitrile Examination Gloves", quantity: 4, price: 340 }
          ],
          subtotal: 2760,
          gst: 331,
          total: 3091,
          paymentMethod: "Direct Bank Transfer / NEFT",
          paymentStatus: "Pending Verification",
          orderStatus: "Processing",
          date: "2026-08-31T14:30:00Z"
        }
      ];
    } catch {
      return [];
    }
  });

  // Site Settings
  const [siteConfig, setSiteConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('rc_cms_config');
      return saved ? JSON.parse(saved) : INITIAL_CONFIG;
    } catch {
      return INITIAL_CONFIG;
    }
  });

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('rc_cms_products', JSON.stringify(products));
    } catch (e) { console.error(e); }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('rc_cms_categories', JSON.stringify(categories));
    } catch (e) { console.error(e); }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem('rc_cms_enquiries', JSON.stringify(enquiries));
    } catch (e) { console.error(e); }
  }, [enquiries]);

  useEffect(() => {
    try {
      localStorage.setItem('rc_cms_orders', JSON.stringify(orders));
    } catch (e) { console.error(e); }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('rc_cms_config', JSON.stringify(siteConfig));
    } catch (e) { console.error(e); }
  }, [siteConfig]);

  // Product Operations
  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: newProduct.id || `rc-prod-${Date.now()}`,
      slug: newProduct.slug || newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      sku: newProduct.sku || `RC-SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      status: newProduct.status || 'active',
      images: Array.isArray(newProduct.images) && newProduct.images.length > 0
        ? newProduct.images
        : ["https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=800&q=80"]
    };
    setProducts((prev) => [productWithId, ...prev]);
    addToast(`Product "${productWithId.name}" added successfully`, 'success');
    return productWithId;
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p))
    );
    addToast(`Product "${updatedProduct.name}" updated`, 'success');
  };

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    addToast('Product deleted', 'info');
  };

  // Enquiry Submission
  const submitEnquiry = (enquiryData) => {
    const newEnquiry = {
      ...enquiryData,
      id: `ENQ-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString(),
      status: "New"
    };
    setEnquiries((prev) => [newEnquiry, ...prev]);
    return newEnquiry;
  };

  const updateEnquiryStatus = (id, status) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
    addToast(`Enquiry ${id} marked as ${status}`, 'info');
  };

  // Order Submission
  const createOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: `RCH-ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString(),
      orderStatus: "Confirmed",
      paymentStatus: orderData.paymentMethod === "COD" ? "Pending on Delivery" : "Paid / Pending Verification"
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (id, orderStatus, paymentStatus) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              ...(orderStatus ? { orderStatus } : {}),
              ...(paymentStatus ? { paymentStatus } : {})
            }
          : o
      )
    );
    addToast(`Order ${id} updated`, 'info');
  };

  // Site Config Update
  const updateSiteConfig = (updatedConfig) => {
    setSiteConfig((prev) => ({ ...prev, ...updatedConfig }));
    addToast('Website configuration updated successfully', 'success');
  };

  // Reset to Default Factory Data
  const resetToFactoryDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setSiteConfig(INITIAL_CONFIG);
    localStorage.removeItem('rc_cms_products');
    localStorage.removeItem('rc_cms_categories');
    localStorage.removeItem('rc_cms_config');
    addToast('Reset to original default catalogue data', 'info');
  };

  // Export JSON
  const exportDataJSON = () => {
    const exportBundle = {
      exportDate: new Date().toISOString(),
      siteConfig,
      categories,
      products,
      enquiries,
      orders
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportBundle, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `royal_crown_catalogue_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    addToast('Catalogue exported as JSON file', 'success');
  };

  return (
    <CMSContext.Provider
      value={{
        products,
        categories,
        enquiries,
        orders,
        siteConfig,
        addProduct,
        updateProduct,
        deleteProduct,
        submitEnquiry,
        updateEnquiryStatus,
        createOrder,
        updateOrderStatus,
        updateSiteConfig,
        resetToFactoryDefaults,
        exportDataJSON
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
}
