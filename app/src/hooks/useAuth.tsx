
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of our authentication context
interface AuthContextType {
  isAuthenticated: boolean;
  login: (secretCode: string) => boolean;
  logout: () => void;
  showSecretPrompt: boolean;
  setShowSecretPrompt: (show: boolean) => void;
  verifySecretCode: (code: string) => boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
  showSecretPrompt: false,
  setShowSecretPrompt: () => {},
  verifySecretCode: () => false,
});

// Secret code for logout (in a real app, this would be stored securely)
const ADMIN_SECRET_CODE = "1234";
const SYSTEM_SECRET_CODE = "admin123";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showSecretPrompt, setShowSecretPrompt] = useState<boolean>(false);
  
  // Check if user is already logged in from localStorage
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (secretCode: string): boolean => {
    // In a real app, you'd validate credentials against a backend
    if (secretCode === ADMIN_SECRET_CODE) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    setShowSecretPrompt(false);
  };

  const verifySecretCode = (code: string): boolean => {
    return code === SYSTEM_SECRET_CODE;
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        login, 
        logout,
        showSecretPrompt,
        setShowSecretPrompt,
        verifySecretCode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
