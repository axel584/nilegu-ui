import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Breadcrumbs,
  Link,
  Button
} from '@mui/material';
import {
  Book as BookIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTekstojSearch } from '../hooks/useTekstoj';
import { Filtroj } from '../types';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';

const CatalogPage: React.FC = () => {
  const navigate = useNavigate();
  const { tekstoj, loading, error, pagination, searchTekstoj } = useTekstojSearch();
  
  const [filtroj, setFiltroj] = useState<Filtroj>({
    serĉo: '',
    nivelo: '',
    longecoMin: 200,
    longecoMax: 4000,
    ŝlosilvortoj: [],
    hasSono: false,
    order: 'ekdato',
    sort: 'DESC'
  });

  const [currentPage, setCurrentPage] = useState(1);

  // Faire une requête API quand les filtres changent
  useEffect(() => {
    // Réinitialiser la page à 1 quand les filtres changent
    setCurrentPage(1);
    
    // Vérifier si des filtres sont appliqués (en excluant les valeurs vides)
    const hasFilters = (filtroj.serĉo && filtroj.serĉo.trim() !== '') || 
                      (filtroj.nivelo && filtroj.nivelo.trim() !== '') || 
                      filtroj.longecoMin > 200 || filtroj.longecoMax < 4000 || 
                      (filtroj.ŝlosilvortoj && filtroj.ŝlosilvortoj.length > 0) ||
                      filtroj.hasSono;

    const timeoutId = setTimeout(() => {
      // Toujours utiliser offset 0 car on a réinitialisé currentPage à 1
      if (hasFilters) {
        searchTekstoj(filtroj, 0);
      } else {
        // Si pas de filtres, utiliser la recherche sans filtres avec pagination
        searchTekstoj({
          serĉo: '',
          nivelo: '',
          longecoMin: 200,
          longecoMax: 4000,
          ŝlosilvortoj: [],
          hasSono: false,
          order: filtroj.order,
          sort: filtroj.sort
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
                      filtroj.longecoMin > 200 || filtroj.longecoMax < 4000 || 
                      (filtroj.ŝlosilvortoj && filtroj.ŝlosilvortoj.length > 0) ||
                      filtroj.hasSono;

    const offset = (currentPage - 1) * pagination.limit;
    
    if (hasFilters) {
      searchTekstoj(filtroj, offset);
    } else {
      // Si pas de filtres, utiliser la recherche sans filtres avec pagination
      searchTekstoj({
        serĉo: '',
        nivelo: '',
        longecoMin: 200,
        longecoMax: 4000,
        ŝlosilvortoj: [],
        hasSono: false,
        order: filtroj.order,
        sort: filtroj.sort
      }, offset);
    }
  }, [currentPage, filtroj, searchTekstoj, pagination.limit]);


  const clearFiltroj = () => {
    const defaultFiltroj = {
      serĉo: '',
      nivelo: '',
      longecoMin: 200,
      longecoMax: 4000,
      ŝlosilvortoj: [],
      hasSono: false,
      order: 'ekdato',
      sort: 'DESC'
    };
    setFiltroj(defaultFiltroj);
    setCurrentPage(1);
    // Utiliser la recherche sans filtres avec pagination
    searchTekstoj(defaultFiltroj, 0);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleTekstoClick = (tekstoId: string) => {
    navigate(`/teksto/${tekstoId}`);
  };


  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* AppBar */}
      <AppBar position="static" sx={{ bgcolor: '#554E47', borderRadius: 0 }}>
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
        />
      </Container>
    </Box>
  );
};

export default CatalogPage; 