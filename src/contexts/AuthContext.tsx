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
  const [user, setUser] = useState<User | null>(() => {
    // Récupérer l'utilisateur depuis localStorage au démarrage
    const savedUser = localStorage.getItem('auth_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkAuth = async () => {
    try {
      setLoading(true);
      setError(null);
      const currentUser = await authService.getMe();
      setUser(currentUser);
      // Sauvegarder dans localStorage
      localStorage.setItem('auth_user', JSON.stringify(currentUser));
      console.log('AuthContext - User loaded:', currentUser ? `${currentUser.personnomo || currentUser.nomo} (${currentUser.retpoŝto})` : 'No user authenticated');
    } catch (err) {
      setError('Erreur lors de la vérification de l\'authentification');
      setUser(null);
      // Supprimer de localStorage en cas d'erreur
      localStorage.removeItem('auth_user');
      console.log('AuthContext - Authentication failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const login = (user: User) => {
    setUser(user);
    setError(null);
    // Sauvegarder dans localStorage
    localStorage.setItem('auth_user', JSON.stringify(user));
    console.log('AuthContext - User logged in:', user.personnomo || user.nomo);
  };

  const logout = () => {
    setUser(null);
    setError(null);
    // Supprimer de localStorage
    localStorage.removeItem('auth_user');
    console.log('AuthContext - User logged out');
  };

  useEffect(() => {
    // Si on a un utilisateur en localStorage, on peut éviter l'appel API initial
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setLoading(false);
        console.log('AuthContext - User restored from localStorage:', parsedUser.personnomo || parsedUser.nomo);
      } catch (err) {
        console.error('AuthContext - Error parsing saved user:', err);
        localStorage.removeItem('auth_user');
        checkAuth();
      }
    } else {
      checkAuth();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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