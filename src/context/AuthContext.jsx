import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { addToast } = useToast();

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('rc_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('rc_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('rc_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  const login = (email, password) => {
    // Simulated authentication
    const mockUser = {
      id: "USR-401",
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email: email,
      phone: "+91 9876543210",
      facilityName: "Healthcare Facility / Clinic",
      gstin: "05AAACR1234F1Z5",
      address: {
        street: "Rajpur Road",
        city: "Dehradun",
        state: "Uttarakhand",
        pincode: "248001"
      },
      savedAddresses: [
        {
          id: "addr-1",
          label: "Hospital Main Store",
          street: "12 Rajpur Road, Near Clock Tower",
          city: "Dehradun",
          state: "Uttarakhand",
          pincode: "248001",
          isDefault: true
        }
      ]
    };
    setUser(mockUser);
    addToast(`Welcome back, ${mockUser.name}`, 'success');
    return true;
  };

  const register = (userData) => {
    const newUser = {
      id: `USR-${Math.floor(100 + Math.random() * 900)}`,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      facilityName: userData.facilityName || "",
      gstin: userData.gstin || "",
      address: {
        street: userData.address || "",
        city: userData.city || "Dehradun",
        state: userData.state || "Uttarakhand",
        pincode: userData.pincode || "248001"
      },
      savedAddresses: [
        {
          id: "addr-1",
          label: "Primary Facility",
          street: userData.address || "Main Facility Address",
          city: userData.city || "Dehradun",
          state: userData.state || "Uttarakhand",
          pincode: userData.pincode || "248001",
          isDefault: true
        }
      ]
    };
    setUser(newUser);
    addToast('Account created successfully!', 'success');
    return true;
  };

  const updateProfile = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
    addToast('Profile updated successfully', 'success');
  };

  const logout = () => {
    setUser(null);
    addToast('Logged out successfully', 'info');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        updateProfile,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
