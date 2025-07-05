import { useState, useEffect } from 'react';
import { Texto, TextoDetaloj, Filtroj } from '../types';
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchTekstoj = async (filtroj: Filtroj) => {
    try {
      setLoading(true);
      setError(null);
      const data = await tekstojService.searchTekstoj(filtroj);
      
      // S'assurer que les données sont un tableau
      if (Array.isArray(data)) {
        setTekstoj(data);
      } else if (data && typeof data === 'object' && 'tekstoj' in data && Array.isArray((data as any).tekstoj)) {
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

  return { tekstoj, loading, error, searchTekstoj };
}; 