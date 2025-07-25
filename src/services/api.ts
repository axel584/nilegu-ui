import axios from 'axios';
import { Texto, TextoDetaloj, APITeksto, APIResponse } from '../types';

const API_BASE_URL = 'https://ikurso.esperanto-france.org/api.php';
//const API_BASE_URL = 'http://localhost:8080/api.php';

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
        const tekstoj = response.data.data.map((item: APITeksto) => ({
          id: item.id,
          titolo: item.titolo,
          aŭtoro: item.auxtoro, // Note: l'API utilise 'auxtoro' au lieu de 'aŭtoro'
          nivelo: item.nivelo,
          longeco: parseInt(item.vortoj) || 0, // 'vortoj' contient le nombre de mots
          priskribo: item.fonto, // Utiliser la source comme description
          ŝlosilvortoj: item.etikedoj ? item.etikedoj.split(',').map((tag: string) => tag.trim()) : [],
          audioUrl: null // L'API ne semble pas fournir d'URL audio dans cette liste
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
          vortaro: Array.isArray(data.enhavo) ? data.enhavo.reduce((acc: any, section: any) => ({ ...acc, ...section.vortaro }), {}) : (data.vortaro || undefined)
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
        offset: offset
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
      
      if (filtroj.aŭtoro && filtroj.aŭtoro.trim() !== '') {
        apiParams.auxtoro = filtroj.aŭtoro; // L'API utilise 'auxtoro'
      }
      
      if (filtroj.longecoMin > 0 || filtroj.longecoMax < 1000) {
        apiParams.vortoj_min = filtroj.longecoMin;
        apiParams.vortoj_max = filtroj.longecoMax;
      }
      
      if (filtroj.ŝlosilvortoj && filtroj.ŝlosilvortoj.length > 0) {
        apiParams.etikedoj = filtroj.ŝlosilvortoj.join(',');
      }
      
      if (filtroj.hasSono) {
        apiParams.has_sono = 'true';
      }
      
      console.log('API params:', apiParams);
      
      // Toujours utiliser les paramètres avec offset pour la pagination
      const response = await api.get('?path=tekstoj', { params: apiParams });
      
      console.log('Search API Response:', response.data);
      
      // L'API retourne un objet avec une propriété 'data' contenant le tableau
      if (response.data && typeof response.data === 'object' && 'data' in response.data && Array.isArray(response.data.data)) {
        // Transformer les données APITeksto vers Texto
        const tekstoj = response.data.data.map((item: APITeksto) => ({
          id: item.id,
          titolo: item.titolo,
          aŭtoro: item.auxtoro, // Note: l'API utilise 'auxtoro' au lieu de 'aŭtoro'
          nivelo: item.nivelo,
          longeco: parseInt(item.vortoj) || 0, // 'vortoj' contient le nombre de mots
          priskribo: item.fonto, // Utiliser la source comme description
          ŝlosilvortoj: item.etikedoj ? item.etikedoj.split(',').map((tag: string) => tag.trim()) : [],
          audioUrl: null // L'API ne semble pas fournir d'URL audio dans cette liste
        }));
        
        console.log('Transformed search data:', tekstoj);
        
        // Retourner la structure APIResponse avec pagination
        return {
          data: tekstoj,
          pagination: response.data.pagination || {
            total: tekstoj.length,
            limit: 20,
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
          limit: 20,
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

export default api; 