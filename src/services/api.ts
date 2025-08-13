import axios from 'axios';
import { Texto, TextoDetaloj, APITeksto, APIResponse, User, AuthResponse } from '../types';
import { PAGINATION_CONFIG } from '../config/constants';

const API_BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:8080/api.php'
  : 'https://ikurso.esperanto-france.org/api.php';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const tekstojService = {
  // Récupérer la liste des textes
  getTekstoj: async (): Promise<Texto[]> => {
    try {
      const response = await api.get('?path=tekstoj');
      console.log('API Response:', response.data);
      
      // L'API retourne un objet avec une propriété 'data' contenant le tableau
      if (response.data && typeof response.data === 'object' && 'data' in response.data && Array.isArray(response.data.data)) {
        // Transformer les données pour correspondre à notre interface Texto
        const tekstoj = response.data.data.map((item: any) => ({
          id: item.id,
          titolo: item.titolo,
          aŭtoro: item.auxtoro || item.aŭtoro, // Note: l'API utilise 'auxtoro' au lieu de 'aŭtoro'
          nivelo: item.nivelo,
          longeco: parseInt(item.vortoj) || 0, // 'vortoj' contient le nombre de mots
          priskribo: item.fonto, // Utiliser la source comme description
          ŝlosilvortoj: item.etikedoj ? item.etikedoj.split(',').map((tag: string) => tag.trim()) : [],
          audioUrl: item.sono || null,
          sono: item.sono || null,
          leganto: item.leganto || null // Inclure le nom de la personne qui lit
        }));
        
        console.log('Transformed data:', tekstoj);
        return tekstoj;
      }
      
      console.warn('Format de données non reconnu, retour d\'un tableau vide');
      return [];
    } catch (error) {
      console.error('Erreur lors de la récupération des textes:', error);
      throw new Error('Impossible de récupérer les textes');
    }
  },

  // Récupérer les détails d'un texte spécifique
  getTekstoDetaloj: async (id: string): Promise<TextoDetaloj> => {
    try {
      const response = await api.get(`?path=tekstoj/${id}`);
      console.log('Teksto detaloj response:', response.data);
      
      // S'assurer que les données sont correctement formatées
      const data = response.data;
      if (data && typeof data === 'object') {
        // Transformer les données pour correspondre à l'interface TextoDetaloj
        const tekstoDetaloj: TextoDetaloj = {
          id: data.id || id,
          titolo: data.titolo || 'Titre inconnu',
          aŭtoro: data.aŭtoro || data.auxtoro || 'Auteur inconnu',
          nivelo: data.nivelo || 'Inconnu',
          longeco: data.longeco || parseInt(data.vortoj) || 0,
          priskribo: data.priskribo || data.fonto || '',
          ŝlosilvortoj: data.ŝlosilvortoj || (data.etikedoj ? (data.etikedoj as string).split(',').map((tag: string) => tag.trim()) : []),
          audioUrl: data.sono || data.audioUrl || null, // Utiliser le champ "sono" de l'API
          sono: data.sono || null, // Garder aussi le champ original
          enhavo: Array.isArray(data.enhavo) ? data.enhavo.map((section: any) => section.teksto) : (data.enhavo || data.contenu || ''),
          traduko: data.traduko || undefined,
          notoj: data.notoj || undefined,
          vortaro: Array.isArray(data.enhavo) ? data.enhavo.reduce((acc: any, section: any) => ({ ...acc, ...section.vortaro }), {}) : (data.vortaro || undefined),
          leganto: data.leganto || null
        };
        
        console.log('Transformed teksto detaloj:', tekstoDetaloj);
        return tekstoDetaloj;
      }
      
      throw new Error('Format de données invalide');
    } catch (error) {
      console.error(`Erreur lors de la récupération du texte ${id}:`, error);
      throw new Error(`Impossible de récupérer le texte ${id}`);
    }
  },

  // Rechercher des textes avec filtres
  searchTekstoj: async (filtroj: any, offset: number = 0): Promise<APIResponse> => {
    try {
      // Transformer les filtres pour correspondre aux noms attendus par l'API
      const apiParams: any = {
        offset: offset,
        limit: PAGINATION_CONFIG.ITEMS_PER_PAGE
      };
      
      if (filtroj.serĉo && filtroj.serĉo.trim() !== '') {
        apiParams.q = filtroj.serĉo; // paramètre de recherche
      }
      
      if (filtroj.nivelo && filtroj.nivelo.trim() !== '') {
        // Transformer les valeurs de niveau en plages numériques
        switch (filtroj.nivelo) {
          case 'facile':
            apiParams.nivelo_min = 0;
            apiParams.nivelo_max = 999;
            break;
          case 'intermediaire':
            apiParams.nivelo_min = 1000;
            apiParams.nivelo_max = 1999;
            break;
          case 'avance':
            apiParams.nivelo_min = 2000;
            apiParams.nivelo_max = 9999; // ou une valeur très élevée
            break;
          default:
            // Si c'est une valeur numérique directe, l'utiliser telle quelle
            if (!isNaN(parseInt(filtroj.nivelo))) {
              apiParams.nivelo = filtroj.nivelo;
            }
        }
      }
      
      
      if (filtroj.longecoMin > 200 || filtroj.longecoMax < 4000) {
        apiParams.vortoj_min = filtroj.longecoMin;
        apiParams.vortoj_max = filtroj.longecoMax;
      }
      
      if (filtroj.ŝlosilvortoj && filtroj.ŝlosilvortoj.length > 0) {
        apiParams.etikedoj = filtroj.ŝlosilvortoj.join(',');
      }
      
      if (filtroj.hasSono) {
        apiParams.has_sono = 'true';
      }
      
      // Gestion de l'ordre de tri
      if (filtroj.order && filtroj.sort) {
        apiParams.sort = filtroj.order;  // Le champ à trier
        apiParams.order = filtroj.sort;  // ASC ou DESC
      }
      
      console.log('API params:', apiParams);
      
      // Toujours utiliser les paramètres avec offset pour la pagination
      const response = await api.get('?path=tekstoj', { params: apiParams });
      
      console.log('Search API Response:', response.data);
      
      // L'API retourne un objet avec une propriété 'data' contenant le tableau
      if (response.data && typeof response.data === 'object' && 'data' in response.data && Array.isArray(response.data.data)) {
        // Transformer les données APITeksto vers Texto
        const tekstoj = response.data.data.map((item: any) => ({
          id: item.id,
          titolo: item.titolo,
          aŭtoro: item.auxtoro || item.aŭtoro, // Note: l'API utilise 'auxtoro' au lieu de 'aŭtoro'
          nivelo: item.nivelo,
          longeco: parseInt(item.vortoj) || 0, // 'vortoj' contient le nombre de mots
          priskribo: item.fonto, // Utiliser la source comme description
          ŝlosilvortoj: item.etikedoj ? item.etikedoj.split(',').map((tag: string) => tag.trim()) : [],
          audioUrl: item.sono || null,
          sono: item.sono || null,
          leganto: item.leganto || null // Inclure le nom de la personne qui lit
        }));
        
        console.log('Transformed search data:', tekstoj);
        
        // Retourner la structure APIResponse avec pagination
        return {
          data: tekstoj,
          pagination: response.data.pagination || {
            total: tekstoj.length,
            limit: PAGINATION_CONFIG.ITEMS_PER_PAGE,
            offset: offset,
            count: tekstoj.length
          }
        };
      }
      
      console.warn('Format de données non reconnu, retour d\'un tableau vide');
      return {
        data: [],
        pagination: {
          total: 0,
          limit: PAGINATION_CONFIG.ITEMS_PER_PAGE,
          offset: offset,
          count: 0
        }
      };
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      throw new Error('Impossible de rechercher les textes');
    }
  }
};

export const legotajxojService = {
  // Sauvegarder un texte pour plus tard
  saveTeksto: async (tekstoId: string): Promise<void> => {
    try {
      const response = await api.post('?path=legotajxoj', {
        teksto_id: tekstoId
      });
      
      console.log('Save teksto response:', response.data);
    } catch (error: any) {
      console.error('Save teksto error:', error);
      
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Erreur lors de la sauvegarde du texte');
      }
    }
  },

  // Récupérer les textes sauvegardés de l'utilisateur
  getSavedTekstoj: async (): Promise<Texto[]> => {
    try {
      const response = await api.get('?path=legotajxoj');
      console.log('Get saved tekstoj response:', response.data);
      
      if (response.data && Array.isArray(response.data.data)) {
        // Transformer les données APITeksto vers Texto
        const tekstoj = response.data.data.map((item: any) => ({
          id: item.id,
          titolo: item.titolo,
          aŭtoro: item.auxtoro || item.aŭtoro,
          nivelo: item.nivelo,
          longeco: parseInt(item.vortoj) || 0,
          priskribo: item.fonto,
          ŝlosilvortoj: item.etikedoj ? item.etikedoj.split(',').map((tag: string) => tag.trim()) : [],
          audioUrl: item.sono || null,
          sono: item.sono || null,
          leganto: item.leganto || null
        }));
        
        return tekstoj;
      }
      
      return [];
    } catch (error: any) {
      console.error('Get saved tekstoj error:', error);
      throw new Error('Erreur lors du chargement de la liste à lire');
    }
  },

  // Supprimer un texte de la liste sauvegardée
  removeTeksto: async (tekstoId: string): Promise<void> => {
    try {
      const response = await api.delete(`?path=legotajxoj&teksto_id=${tekstoId}`);
      console.log('Remove teksto response:', response.data);
    } catch (error: any) {
      console.error('Remove teksto error:', error);
      
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Erreur lors de la suppression du texte');
      }
    }
  }
};

export const authService = {
  // Vérifier l'authentification de l'utilisateur actuel
  getMe: async (): Promise<User | null> => {
    try {
      const response = await api.get('?path=auth/me');
      console.log('Auth me response:', response.data);
      
      if (response.data && response.data.user) {
        const userData = response.data.user;
        return {
          id: userData.id,
          nomo: userData.nomo,
          personnomo: userData.personnomo,
          retpoŝto: userData.retpoŝto,
          rolo: userData.rolo
        };
      }
      
      return null;
    } catch (error) {
      console.log('User not authenticated:', error);
      return null;
    }
  },

  // Connecter un utilisateur
  login: async (identigilo: string, pasvorto: string): Promise<User> => {
    try {
      const response = await api.post('?path=auth/login', {
        identigilo,
        pasvorto
      });
      
      console.log('Login response:', response.data);
      
      if (response.data && response.data.user) {
        const userData = response.data.user;
        return {
          id: userData.id,
          nomo: userData.nomo,
          personnomo: userData.personnomo,
          retpoŝto: userData.retpoŝto,
          rolo: userData.rolo
        };
      }
      
      throw new Error('Réponse de connexion invalide');
    } catch (error: any) {
      console.error('Login error:', error);
      
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.response?.status === 401) {
        throw new Error('Identifiant ou mot de passe incorrect');
      } else {
        throw new Error('Erreur lors de la connexion');
      }
    }
  }
};

export default api; 