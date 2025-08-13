import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Pagination,
  CircularProgress,
  Alert,
  IconButton
} from '@mui/material';
import {
  Person as PersonIcon,
  Timer as TimerIcon,
  VolumeUp as VolumeIcon,
  RecordVoiceOver as RecordVoiceOverIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon
} from '@mui/icons-material';
import { Texto } from '../types';
import { stringToRainbowColor, getContrastTextColor } from '../utils/colorUtils';

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
  const getNiveloColor = (nivelo: string) => {
    const niveloNum = parseInt(nivelo);
    if (niveloNum >= 0 && niveloNum <= 999) {
      return '#4CAF50'; // Vert pour facile
    } else if (niveloNum >= 1000 && niveloNum <= 1999) {
      return '#FF9800'; // Orange pour intermédiaire
    } else if (niveloNum >= 2000) {
      return '#F44336'; // Rouge pour avancé
    }
    return '#757575'; // Gris par défaut
  };

  const getNiveloLabel = (nivelo: string) => {
    const niveloNum = parseInt(nivelo);
    if (niveloNum >= 0 && niveloNum <= 999) {
      return 'Facile';
    } else if (niveloNum >= 1000 && niveloNum <= 1999) {
      return 'Intermédiaire';
    } else if (niveloNum >= 2000) {
      return 'Avancé';
    }
    return nivelo;
  };

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
            <Card 
              sx={{ 
                height: '100%', 
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                }
              }}
              onClick={() => onTekstoClick(teksto.id)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" component="h2" sx={{ flex: 1, mr: 1 }}>
                    {teksto.titolo}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        onSaveTeksto(teksto.id);
                      }}
                      size="small"
                      sx={{
                        color: savedTekstoj.has(teksto.id) ? 'primary.main' : 'grey.500',
                        '&:hover': {
                          color: 'primary.main',
                        }
                      }}
                    >
                      {savedTekstoj.has(teksto.id) ? (
                        <StarIcon fontSize="small" />
                      ) : (
                        <StarBorderIcon fontSize="small" />
                      )}
                    </IconButton>
                    <Chip
                      label={getNiveloLabel(teksto.nivelo)}
                      size="small"
                      sx={{
                        bgcolor: getNiveloColor(teksto.nivelo),
                        color: 'white',
                        fontSize: '0.75rem',
                      }}
                    />
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PersonIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {teksto.aŭtoro}
                  </Typography>
                </Box>

                {teksto.leganto && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <RecordVoiceOverIcon sx={{ fontSize: 16, mr: 0.5, color: 'primary.main' }} />
                    <Typography variant="body2" color="text.secondary">
                      lu par {teksto.leganto}
                    </Typography>
                  </Box>
                )}

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TimerIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {teksto.longeco} mots
                  </Typography>
                  {teksto.audioUrl && (
                    <VolumeIcon sx={{ fontSize: 16, ml: 1, color: 'primary.main' }} />
                  )}
                </Box>

                {teksto.priskribo && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {teksto.priskribo.length > 100 
                      ? `${teksto.priskribo.substring(0, 100)}...` 
                      : teksto.priskribo
                    }
                  </Typography>
                )}

                {teksto.ŝlosilvortoj && teksto.ŝlosilvortoj.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {teksto.ŝlosilvortoj.slice(0, 3).map((vorto, index) => {
                      const backgroundColor = stringToRainbowColor(vorto);
                      const textColor = getContrastTextColor(backgroundColor);
                      return (
                        <Chip
                          key={index}
                          label={vorto}
                          size="small"
                          variant="outlined"
                          sx={{ 
                            fontSize: '0.7rem',
                            // backgroundColor: backgroundColor,
                            // color: textColor,
                            // border: 'none'
                          }}
                        />
                      );
                    })}
                    {teksto.ŝlosilvortoj.length > 3 && (
                      <Chip
                        label={`+${teksto.ŝlosilvortoj.length - 3}`}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.7rem' }}
                      />
                    )}
                  </Box>
                )}
              </CardContent>
            </Card>
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