import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { authService } from '../services/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (identigilo: string, pasvorto: string) => Promise<void>;
  logout: () => Promise<void>;
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
    const savedToken = localStorage.getItem('auth_token');
    // Ne restaurer l'utilisateur que si on a à la fois les données utilisateur et le token
    return (savedUser && savedToken) ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkAuth = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('auth_token');
      
      if (!token) {
        setUser(null);
        localStorage.removeItem('auth_user');
        return;
      }
      
      const currentUser = await authService.getMe();
      setUser(currentUser);
      // Sauvegarder dans localStorage
      if (currentUser) {
        localStorage.setItem('auth_user', JSON.stringify(currentUser));
      }
      console.log('AuthContext - User loaded:', currentUser ? `${currentUser.personnomo || currentUser.nomo} (${currentUser.retpoŝto})` : 'No user authenticated');
    } catch (err) {
      setError('Erreur lors de la vérification de l\'authentification');
      setUser(null);
      // Supprimer de localStorage en cas d'erreur
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_token');
      console.log('AuthContext - Authentication failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const login = async (identigilo: string, pasvorto: string) => {
    try {
      setLoading(true);
      setError(null);
      const { user, token } = await authService.login(identigilo, pasvorto);
      setUser(user);
      // Sauvegarder dans localStorage (le token est déjà sauvegardé dans authService.login)
      localStorage.setItem('auth_user', JSON.stringify(user));
      console.log('AuthContext - User logged in:', user.personnomo || user.nomo);
    } catch (error: any) {
      setError(error.message || 'Erreur lors de la connexion');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.warn('Logout service failed, but continuing with local cleanup');
    } finally {
      setUser(null);
      setError(null);
      // Les tokens et données utilisateur sont déjà supprimés dans authService.logout
      console.log('AuthContext - User logged out');
    }
  };

  useEffect(() => {
    // Si on a un utilisateur et un token en localStorage, on peut éviter l'appel API initial
    const savedUser = localStorage.getItem('auth_user');
    const savedToken = localStorage.getItem('auth_token');
    
    if (savedUser && savedToken) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setLoading(false);
        console.log('AuthContext - User restored from localStorage:', parsedUser.personnomo || parsedUser.nomo);
      } catch (err) {
        console.error('AuthContext - Error parsing saved user:', err);
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token');
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