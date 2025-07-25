import { useState, useEffect, useCallback } from 'react';
import { Texto, TextoDetaloj, Filtroj, APIResponse, APITeksto } from '../types';
import { tekstojService } from '../services/api';

export const useTekstoj = () => {
  const [tekstoj, setTekstoj] = useState<Texto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTekstoj = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await tekstojService.getTekstoj();
      
      // S'assurer que les données sont un tableau
      if (Array.isArray(data)) {
        setTekstoj(data);
      } else if (data && typeof data === 'object' && 'tekstoj' in data && Array.isArray((data as any).tekstoj)) {
        // Si l'API retourne un objet avec une propriété 'tekstoj'
        setTekstoj((data as any).tekstoj);
      } else {
        console.warn('Format de données inattendu:', data);
        setTekstoj([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      setTekstoj([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTekstoj();
  }, []);

  return { tekstoj, loading, error, refetch: fetchTekstoj };
};

export const useTekstoDetaloj = (id: string | null) => {
  const [teksto, setTeksto] = useState<TextoDetaloj | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTeksto = async (tekstoId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await tekstojService.getTekstoDetaloj(tekstoId);
      setTeksto(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTeksto(id);
    }
  }, [id]);

  return { teksto, loading, error, refetch: () => id && fetchTeksto(id) };
};

export const useTekstojSearch = () => {
  const [tekstoj, setTekstoj] = useState<Texto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 20,
    offset: 0,
    count: 0
  });
  const [isInitialized, setIsInitialized] = useState(false);

  const fetchAllTekstoj = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await tekstojService.getTekstoj();
      
      // S'assurer que les données sont un tableau
      if (Array.isArray(data)) {
        setTekstoj(data);
        setPagination({
          total: data.length,
          limit: data.length,
          offset: 0,
          count: data.length
        });
      } else if (data && typeof data === 'object' && 'tekstoj' in data && Array.isArray((data as any).tekstoj)) {
        setTekstoj((data as any).tekstoj);
        setPagination({
          total: (data as any).tekstoj.length,
          limit: (data as any).tekstoj.length,
          offset: 0,
          count: (data as any).tekstoj.length
        });
      } else {
        console.warn('Format de données inattendu:', data);
        setTekstoj([]);
        setPagination({
          total: 0,
          limit: 20,
          offset: 0,
          count: 0
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      setTekstoj([]);
      setPagination({
        total: 0,
        limit: 20,
        offset: 0,
        count: 0
      });
    } finally {
      setLoading(false);
      setIsInitialized(true);
    }
  }, []);

  const searchTekstoj = useCallback(async (filtroj: Filtroj, offset: number = 0) => {
    try {
      setLoading(true);
      setError(null);
      const data = await tekstojService.searchTekstoj(filtroj, offset);
      
      // Le service searchTekstoj retourne déjà un objet APIResponse avec des données transformées
      if (data && typeof data === 'object' && 'data' in data && 'pagination' in data) {
        const apiResponse = data as APIResponse;
        // Les données sont déjà transformées en Texto par le service
        setTekstoj(apiResponse.data);
        setPagination(apiResponse.pagination);
      } else if (Array.isArray(data)) {
        // Fallback si on reçoit directement un tableau
        setTekstoj(data as Texto[]);
        setPagination({
          total: (data as any[]).length,
          limit: (data as any[]).length,
          offset: 0,
          count: (data as any[]).length
        });
      } else {
        console.warn('Format de données inattendu:', data);
        setTekstoj([]);
        setPagination({
          total: 0,
          limit: 20,
          offset: 0,
          count: 0
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      setTekstoj([]);
      setPagination({
        total: 0,
        limit: 20,
        offset: 0,
        count: 0
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Charger tous les textes au démarrage seulement si pas encore initialisé
  useEffect(() => {
    if (!isInitialized) {
      // Utiliser la recherche sans filtres avec pagination au lieu de fetchAllTekstoj
      searchTekstoj({
        serĉo: '',
        nivelo: '',
        longecoMin: 200,
        longecoMax: 4000,
        ŝlosilvortoj: [],
        hasSono: false,
        order: 'ekdato',
        sort: 'DESC'
      }, 0);
    }
  }, [searchTekstoj, isInitialized]);

  return { 
    tekstoj, 
    loading, 
    error, 
    pagination,
    searchTekstoj, 
    refetch: fetchAllTekstoj 
  };
}; 