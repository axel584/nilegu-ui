import React from 'react';
import {
  Box,
  Typography,
  Pagination,
  CircularProgress,
  Alert
} from '@mui/material';
import { Texto } from '../types';
import TextCard from './TextCard';

interface SearchResultsProps {
  tekstoj: Texto[];
  loading: boolean;
  error: string | null;
  pagination: {
    total: number;
    limit: number;
    offset: number;
    count: number;
  };
  currentPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  onTekstoClick: (tekstoId: string) => void;
  onSaveTeksto: (tekstoId: string) => void;
  savedTekstoj: Set<string>;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  tekstoj,
  loading,
  error,
  pagination,
  currentPage,
  onPageChange,
  onTekstoClick,
  onSaveTeksto,
  savedTekstoj
}) => {
  // Calculer le nombre total de pages
  const totalPages = Math.ceil(pagination.total / pagination.limit);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {error}
      </Alert>
    );
  }

  return (
    <>
      {/* Résultats */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          {pagination.total} texte{pagination.total !== 1 ? 's' : ''} trouvé{pagination.total !== 1 ? 's' : ''}
          {pagination.total > pagination.limit && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Affichage de {pagination.offset + 1} à {pagination.offset + pagination.count} sur {pagination.total} résultats
            </Typography>
          )}
        </Typography>
      </Box>

      {/* Liste des textes */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {tekstoj.map((teksto) => (
          <Box sx={{ flex: '1 1 350px', minWidth: 0 }} key={teksto.id}>
            <TextCard
              teksto={teksto}
              onTekstoClick={onTekstoClick}
              onSaveTeksto={onSaveTeksto}
              isSaved={savedTekstoj.has(teksto.id)}
            />
          </Box>
        ))}
      </Box>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={onPageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}

      {tekstoj.length === 0 && !loading && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Aucun texte trouvé
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Essayez de modifier vos critères de recherche
          </Typography>
        </Box>
      )}
    </>
  );
};

export default SearchResults;