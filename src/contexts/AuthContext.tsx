import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { authService } from '../services/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  refetch: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkAuth = async () => {
    try {
      setLoading(true);
      setError(null);
      const currentUser = await authService.getMe();
      setUser(currentUser);
      console.log('AuthContext - User loaded:', currentUser ? `${currentUser.nomo} (${currentUser.retpoŝto})` : 'No user authenticated');
    } catch (err) {
      setError('Erreur lors de la vérification de l\'authentification');
      setUser(null);
      console.log('AuthContext - Authentication failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const login = (user: User) => {
    setUser(user);
    setError(null);
    console.log('AuthContext - User logged in:', user.nomo);
  };

  const logout = () => {
    setUser(null);
    setError(null);
    console.log('AuthContext - User logged out');
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    logout,
    refetch: checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};