import React, { useState, useEffect, useMemo } from 'react';
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
  Link
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
import { useTekstoj } from '../hooks/useTekstoj';
import { Texto, Filtroj } from '../types';

const CatalogPage: React.FC = () => {
  const navigate = useNavigate();
  const { tekstoj, loading, error } = useTekstoj();
  
  const [filtroj, setFiltroj] = useState<Filtroj>({
    serĉo: '',
    nivelo: '',
    aŭtoro: '',
    longecoMin: 0,
    longecoMax: 1000,
    ŝlosilvortoj: []
  });

  const [tekstojFiltritaj, setTekstojFiltritaj] = useState<Texto[]>([]);

  // S'assurer que tekstoj est un tableau avec useMemo pour éviter les re-renders
  const tekstojArray = useMemo(() => Array.isArray(tekstoj) ? tekstoj : [], [tekstoj]);

  // Appliquer les filtres
  useEffect(() => {
    if (tekstojArray.length > 0) {
      let filtrataj = tekstojArray;

      // Filtre par recherche (titre, auteur, mots-clés)
      if (filtroj.serĉo) {
        const serĉo = filtroj.serĉo.toLowerCase();
        filtrataj = filtrataj.filter(teksto => 
          teksto.titolo.toLowerCase().includes(serĉo) ||
          teksto.aŭtoro.toLowerCase().includes(serĉo) ||
          teksto.ŝlosilvortoj?.some(vorto => vorto.toLowerCase().includes(serĉo))
        );
      }

      // Filtre par niveau
      if (filtroj.nivelo) {
        filtrataj = filtrataj.filter(teksto => teksto.nivelo === filtroj.nivelo);
      }

      // Filtre par auteur
      if (filtroj.aŭtoro) {
        filtrataj = filtrataj.filter(teksto => teksto.aŭtoro === filtroj.aŭtoro);
      }

      // Filtre par longueur
      filtrataj = filtrataj.filter(teksto => 
        teksto.longeco >= filtroj.longecoMin && teksto.longeco <= filtroj.longecoMax
      );

      setTekstojFiltritaj(filtrataj);
    } else {
      setTekstojFiltritaj([]);
    }
  }, [tekstojArray, filtroj]);

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
  };

  const handleTekstoClick = (tekstoId: string) => {
    navigate(`/teksto/${tekstoId}`);
  };

  // Obtenir les listes uniques pour les filtres
  const niveloj = Array.from(new Set(tekstojArray.map(t => t.nivelo))).sort();
  const aŭtoroj = Array.from(new Set(tekstojArray.map(t => t.aŭtoro))).sort();

  const getNiveloColor = (nivelo: string) => {
    switch (nivelo.toLowerCase()) {
      case 'komencanto':
      case 'débutant':
      case '27': // Niveau de l'API
        return '#4CAF50';
      case 'meznivela':
      case 'intermédiaire':
        return '#FF9800';
      case 'alta':
      case 'avancé':
        return '#F44336';
      default:
        return '#757575';
    }
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
      <AppBar position="static" sx={{ bgcolor: '#2E7D32' }}>
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
                  {niveloj.map(nivelo => (
                    <MenuItem key={nivelo} value={nivelo}>
                      {nivelo}
                    </MenuItem>
                  ))}
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
            {tekstojFiltritaj.length} texte{tekstojFiltritaj.length !== 1 ? 's' : ''} trouvé{tekstojFiltritaj.length !== 1 ? 's' : ''}
          </Typography>
        </Box>

        {/* Liste des textes */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {tekstojFiltritaj.map((teksto) => (
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
                      label={teksto.nivelo}
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

        {tekstojFiltritaj.length === 0 && !loading && (
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