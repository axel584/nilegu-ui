import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  AppBar,
  Toolbar,
  Breadcrumbs,
  Link,
  Alert,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserMenu } from '../components/UserMenu';
import { Texto } from '../types';
import { legotajxojService } from '../services/api';
import TextCard from '../components/TextCard';
import Footer from '../components/Footer';

const ListeALirePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [tekstoj, setTekstoj] = useState<Texto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    const fetchSavedTekstoj = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await legotajxojService.getSavedTekstoj();
        // Transformer les données si nécessaire
        setTekstoj(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement de la liste');
        setTekstoj([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedTekstoj();
  }, [isAuthenticated, navigate]);

  const handleTekstoClick = (tekstoId: string) => {
    navigate(`/teksto/${tekstoId}`);
  };

  const handleRemoveTeksto = async (tekstoId: string) => {
    try {
      await legotajxojService.removeTeksto(tekstoId);
      // Retirer le texte de la liste locale
      setTekstoj(prev => prev.filter(teksto => teksto.id !== tekstoId));
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  if (!isAuthenticated) {
    return null; // Redirection en cours
  }


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
          <UserMenu user={user || undefined} />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link color="inherit" href="/" underline="hover">
            Accueil
          </Link>
          <Typography color="text.primary">Ma liste à lire</Typography>
        </Breadcrumbs>

        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Ma liste à lire
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Retrouvez ici tous les textes que vous avez sauvegardés pour les lire plus tard.
          </Typography>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          ) : tekstoj.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Votre liste est vide
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Visitez le <Link href="/catalog" underline="hover">catalogue</Link> et ajoutez des textes à votre liste en cliquant sur l'étoile.
              </Typography>
            </Box>
          ) : (
            <>
              <Typography variant="h6" sx={{ mb: 3 }}>
                {tekstoj.length} texte{tekstoj.length !== 1 ? 's' : ''} dans votre liste
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                {tekstoj.map((teksto) => (
                  <Box sx={{ flex: '1 1 350px', minWidth: 0 }} key={teksto.id}>
                    <TextCard
                      teksto={teksto}
                      onTekstoClick={handleTekstoClick}
                      onSaveTeksto={handleRemoveTeksto}
                      isSaved={true}
                    />
                  </Box>
                ))}
              </Box>
            </>
          )}
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
};

export default ListeALirePage;