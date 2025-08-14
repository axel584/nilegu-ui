import React, { useState, useEffect, useRef } from 'react';
import { PAGINATION_CONFIG, API_CONFIG, DEFAULT_FILTERS } from '../config/constants';
import Footer from '../components/Footer';
import {
  Container,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Breadcrumbs,
  Link,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Book as BookIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTekstojSearch } from '../hooks/useTekstoj';
import { Filtroj } from '../types';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';
import { useAuth } from '../contexts/AuthContext';
import { UserMenu } from '../components/UserMenu';
import { legotajxojService } from '../services/api';

const CatalogPage: React.FC = () => {
  const navigate = useNavigate();
  const { tekstoj, loading, error, pagination, searchTekstoj } = useTekstojSearch({ skipInitialLoad: true });
  const { user, isAuthenticated } = useAuth();
  
  const [filtroj, setFiltroj] = useState<Filtroj>({
    serĉo: '',
    nivelo: '',
    longecoMin: DEFAULT_FILTERS.LONGECO_MIN,
    longecoMax: DEFAULT_FILTERS.LONGECO_MAX,
    ŝlosilvortoj: [],
    hasSono: false,
    order: DEFAULT_FILTERS.ORDER,
    sort: DEFAULT_FILTERS.SORT
  });

  const [currentPage, setCurrentPage] = useState(1);
  const prevFiltrojRef = useRef<Filtroj>(filtroj);
  const [savedTekstoj, setSavedTekstoj] = useState<Set<string>>(new Set());
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success'
  });

  // Gérer les changements de filtres et pagination
  useEffect(() => {
    // Vérifier si les filtres ont changé (pas seulement la page)
    const filtersChanged = JSON.stringify(prevFiltrojRef.current) !== JSON.stringify(filtroj);
    
    // Si les filtres ont changé, réinitialiser la page à 1
    if (filtersChanged && currentPage !== 1) {
      setCurrentPage(1);
      prevFiltrojRef.current = filtroj;
      return; // Sortir maintenant, le useEffect sera rappelé avec currentPage = 1
    }
    
    // Mettre à jour la référence
    prevFiltrojRef.current = filtroj;

    // Vérifier si des filtres sont appliqués (en excluant les valeurs vides)
    const hasFilters = (filtroj.serĉo && filtroj.serĉo.trim() !== '') || 
                      (filtroj.nivelo && filtroj.nivelo.trim() !== '') || 
                      filtroj.longecoMin > DEFAULT_FILTERS.LONGECO_MIN || filtroj.longecoMax < DEFAULT_FILTERS.LONGECO_MAX || 
                      (filtroj.ŝlosilvortoj && filtroj.ŝlosilvortoj.length > 0) ||
                      filtroj.hasSono;

    const offset = (currentPage - 1) * pagination.limit;

    const timeoutId = setTimeout(() => {
      if (hasFilters) {
        console.log('🔍 CatalogPage useEffect: appel avec filtres', { filtroj, offset });
        searchTekstoj(filtroj, offset);
      } else {
        console.log('📝 CatalogPage useEffect: appel sans filtres', { offset });
        // Si pas de filtres, utiliser la recherche sans filtres avec pagination
        searchTekstoj({
          serĉo: '',
          nivelo: '',
          longecoMin: DEFAULT_FILTERS.LONGECO_MIN,
          longecoMax: DEFAULT_FILTERS.LONGECO_MAX,
          ŝlosilvortoj: [],
          hasSono: false,
          order: filtroj.order,
          sort: filtroj.sort
        }, offset);
      }
    }, API_CONFIG.SEARCH_DEBOUNCE_DELAY);
    return () => clearTimeout(timeoutId);
  }, [filtroj, currentPage, searchTekstoj]);


  const clearFiltroj = () => {
    console.log('🧹 CatalogPage clearFiltroj: réinitialisation des filtres');
    const defaultFiltroj = {
      serĉo: '',
      nivelo: '',
      longecoMin: DEFAULT_FILTERS.LONGECO_MIN,
      longecoMax: DEFAULT_FILTERS.LONGECO_MAX,
      ŝlosilvortoj: [],
      hasSono: false,
      order: DEFAULT_FILTERS.ORDER,
      sort: DEFAULT_FILTERS.SORT
    };
    setFiltroj(defaultFiltroj);
    setCurrentPage(1);
    // Le useEffect se chargera automatiquement de faire l'appel API
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleTekstoClick = (tekstoId: string) => {
    navigate(`/teksto/${tekstoId}`);
  };

  const handleSaveTeksto = async (tekstoId: string) => {
    if (!isAuthenticated) {
      setSnackbar({
        open: true,
        message: 'Vous devez être connecté pour sauvegarder un texte',
        severity: 'error'
      });
      return;
    }
    
    try {
      await legotajxojService.saveTeksto(tekstoId);
      setSavedTekstoj(prev => new Set(prev).add(tekstoId));
      setSnackbar({
        open: true,
        message: 'Texte sauvegardé avec succès !',
        severity: 'success'
      });
    } catch (error: any) {
      console.error('Erreur lors de la sauvegarde:', error);
      setSnackbar({
        open: true,
        message: error.message || 'Erreur lors de la sauvegarde du texte',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };


  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* AppBar */}
      <AppBar position="static" sx={{ bgcolor: '#554E47', borderRadius: 0 }}>
        <Toolbar>
          <Typography 
            variant="appTitle" 
            component="div" 
            sx={{ 
              cursor: 'pointer',
              color: 'white',
              fontSize: '2rem',
              flexGrow: 1
            }}
            onClick={() => navigate('/')}
          >
            Ni legu
          </Typography>
          <UserMenu user={isAuthenticated && user ? user : undefined} />
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

        {/* Formulaire de recherche */}
        <SearchForm
          filtroj={filtroj}
          onFiltroj={setFiltroj}
          onClearFiltroj={clearFiltroj}
        />

        {/* Résultats de recherche */}
        <SearchResults
          tekstoj={tekstoj}
          loading={loading}
          error={error}
          pagination={pagination}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onTekstoClick={handleTekstoClick}
          onSaveTeksto={handleSaveTeksto}
          savedTekstoj={savedTekstoj}
        />
      </Container>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Footer />
    </Box>
  );
};

export default CatalogPage; 