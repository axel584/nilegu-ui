import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
  Slider,
  Paper,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert,
  AppBar,
  Toolbar,
  Breadcrumbs,
  Link,
  Pagination
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  Book as BookIcon,
  Person as PersonIcon,
  Timer as TimerIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTekstojSearch } from '../hooks/useTekstoj';
import { Filtroj } from '../types';

const CatalogPage: React.FC = () => {
  const navigate = useNavigate();
  const { tekstoj, loading, error, pagination, searchTekstoj, refetch: fetchAllTekstoj } = useTekstojSearch();
  
  const [filtroj, setFiltroj] = useState<Filtroj>({
    serĉo: '',
    nivelo: '',
    aŭtoro: '',
    longecoMin: 0,
    longecoMax: 1000,
    ŝlosilvortoj: []
  });

  const [currentPage, setCurrentPage] = useState(1);

  // Faire une requête API quand les filtres changent
  useEffect(() => {
    // Réinitialiser la page à 1 quand les filtres changent
    setCurrentPage(1);
    
    // Vérifier si des filtres sont appliqués (en excluant les valeurs vides)
    const hasFilters = (filtroj.serĉo && filtroj.serĉo.trim() !== '') || 
                      (filtroj.nivelo && filtroj.nivelo.trim() !== '') || 
                      (filtroj.aŭtoro && filtroj.aŭtoro.trim() !== '') || 
                      filtroj.longecoMin > 0 || filtroj.longecoMax < 1000 || 
                      (filtroj.ŝlosilvortoj && filtroj.ŝlosilvortoj.length > 0);

    const timeoutId = setTimeout(() => {
      // Toujours utiliser offset 0 car on a réinitialisé currentPage à 1
      if (hasFilters) {
        searchTekstoj(filtroj, 0);
      } else {
        // Si pas de filtres, utiliser la recherche sans filtres avec pagination
        searchTekstoj({
          serĉo: '',
          nivelo: '',
          aŭtoro: '',
          longecoMin: 0,
          longecoMax: 1000,
          ŝlosilvortoj: []
        }, 0);
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [filtroj, searchTekstoj]);

  // Gérer les changements de page séparément
  useEffect(() => {
    // Vérifier si des filtres sont appliqués (en excluant les valeurs vides)
    const hasFilters = (filtroj.serĉo && filtroj.serĉo.trim() !== '') || 
                      (filtroj.nivelo && filtroj.nivelo.trim() !== '') || 
                      (filtroj.aŭtoro && filtroj.aŭtoro.trim() !== '') || 
                      filtroj.longecoMin > 0 || filtroj.longecoMax < 1000 || 
                      (filtroj.ŝlosilvortoj && filtroj.ŝlosilvortoj.length > 0);

    const offset = (currentPage - 1) * pagination.limit;
    
    if (hasFilters) {
      searchTekstoj(filtroj, offset);
    } else {
      // Si pas de filtres, utiliser la recherche sans filtres avec pagination
      searchTekstoj({
        serĉo: '',
        nivelo: '',
        aŭtoro: '',
        longecoMin: 0,
        longecoMax: 1000,
        ŝlosilvortoj: []
      }, offset);
    }
  }, [currentPage, filtroj, searchTekstoj, pagination.limit]);

  const handleSerĉoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltroj(prev => ({ ...prev, serĉo: event.target.value }));
  };

  const handleNiveloChange = (event: any) => {
    setFiltroj(prev => ({ ...prev, nivelo: event.target.value }));
  };

  const handleAŭtoroChange = (event: any) => {
    setFiltroj(prev => ({ ...prev, aŭtoro: event.target.value }));
  };

  const handleLongecoChange = (event: Event, newValue: number | number[]) => {
    const [min, max] = newValue as number[];
    setFiltroj(prev => ({ ...prev, longecoMin: min, longecoMax: max }));
  };

  const clearFiltroj = () => {
    setFiltroj({
      serĉo: '',
      nivelo: '',
      aŭtoro: '',
      longecoMin: 0,
      longecoMax: 1000,
      ŝlosilvortoj: []
    });
    setCurrentPage(1);
    // Utiliser la recherche sans filtres avec pagination
    searchTekstoj({
      serĉo: '',
      nivelo: '',
      aŭtoro: '',
      longecoMin: 0,
      longecoMax: 1000,
      ŝlosilvortoj: []
    }, 0);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleTekstoClick = (tekstoId: string) => {
    navigate(`/teksto/${tekstoId}`);
  };

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(pagination.total / pagination.limit);

  // Obtenir les listes uniques pour les filtres (pour les options des selects)
  const aŭtoroj = Array.from(new Set(tekstoj.map(t => t.aŭtoro))).sort();

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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* AppBar */}
      <AppBar position="static" sx={{ bgcolor: '#554E47' }}>
        <Toolbar>
          <BookIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Catalogue de textes
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')}>
            Accueil
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link color="inherit" href="/" underline="hover">
            Accueil
          </Link>
          <Typography color="text.primary">Catalogue</Typography>
        </Breadcrumbs>

        {/* Filtres */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <FilterIcon sx={{ mr: 1 }} />
            <Typography variant="h6">Filtres de recherche</Typography>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {/* Recherche */}
            <Box sx={{ flex: '1 1 400px', minWidth: 0 }}>
              <TextField
                fullWidth
                label="Rechercher par titre, auteur ou mots-clés"
                value={filtroj.serĉo}
                onChange={handleSerĉoChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: filtroj.serĉo && (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setFiltroj(prev => ({ ...prev, serĉo: '' }))}>
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Niveau */}
            <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
              <FormControl fullWidth>
                <InputLabel>Niveau</InputLabel>
                <Select
                  value={filtroj.nivelo}
                  label="Niveau"
                  onChange={handleNiveloChange}
                >
                  <MenuItem value="">Tous les niveaux</MenuItem>
                  <MenuItem value="facile">Facile</MenuItem>
                  <MenuItem value="intermediaire">Intermédiaire</MenuItem>
                  <MenuItem value="avance">Avancé</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Auteur */}
            <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
              <FormControl fullWidth>
                <InputLabel>Auteur</InputLabel>
                <Select
                  value={filtroj.aŭtoro}
                  label="Auteur"
                  onChange={handleAŭtoroChange}
                >
                  <MenuItem value="">Tous les auteurs</MenuItem>
                  {aŭtoroj.map(aŭtoro => (
                    <MenuItem key={aŭtoro} value={aŭtoro}>
                      {aŭtoro}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Longueur */}
          <Box sx={{ mt: 3 }}>
            <Typography gutterBottom>Longueur du texte (mots)</Typography>
            <Slider
              value={[filtroj.longecoMin, filtroj.longecoMax]}
              onChange={handleLongecoChange}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
              step={10}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2">{filtroj.longecoMin} mots</Typography>
              <Typography variant="body2">{filtroj.longecoMax} mots</Typography>
            </Box>
          </Box>

          {/* Bouton réinitialiser */}
          <Box sx={{ mt: 3 }}>
            <Button
              variant="outlined"
              onClick={clearFiltroj}
              startIcon={<ClearIcon />}
            >
              Réinitialiser les filtres
            </Button>
          </Box>
        </Paper>

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
                onClick={() => handleTekstoClick(teksto.id)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" component="h2" sx={{ flex: 1, mr: 1 }}>
                      {teksto.titolo}
                    </Typography>
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

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <PersonIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {teksto.aŭtoro}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TimerIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {teksto.longeco} mots
                    </Typography>
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
                      {teksto.ŝlosilvortoj.slice(0, 3).map((vorto, index) => (
                        <Chip
                          key={index}
                          label={vorto}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.7rem' }}
                        />
                      ))}
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
              onChange={handlePageChange}
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
      </Container>
    </Box>
  );
};

export default CatalogPage; 