import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  CircularProgress,
  Alert,
  AppBar,
  Toolbar,
  Breadcrumbs,
  Link
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useReadTexts } from '../hooks/useTekstoj';
import { useAuth } from '../contexts/AuthContext';
import { UserMenu } from '../components/UserMenu';
import TextCard from '../components/TextCard';
import Footer from '../components/Footer';

const HistoriquePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { tekstoj, loading, error } = useReadTexts();

  const handleTekstoClick = (tekstoId: string) => {
    navigate(`/text/${tekstoId}`);
  };

  // Fonction vide pour onSaveTeksto car on n'a pas besoin de cette fonctionnalité dans l'historique
  const handleSaveTeksto = () => {
    // Ne rien faire - cette fonctionnalité n'est pas nécessaire dans l'historique
  };

  if (!isAuthenticated) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Alert severity="warning">
            Vous devez être connecté pour voir votre historique de lecture.
          </Alert>
        </Container>
      </Box>
    );
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
          <Typography color="text.primary">Historique</Typography>
        </Breadcrumbs>

        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Historique des lectures
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Retrouvez tous les textes que vous avez commencé à lire.
          </Typography>
        </Paper>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress size={60} />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {!loading && !error && tekstoj.length === 0 && (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Aucun texte dans votre historique
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Commencez à lire des textes pour les voir apparaître ici.
            </Typography>
          </Paper>
        )}

        {!loading && !error && tekstoj.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {tekstoj.map((teksto) => (
              <Box sx={{ flex: '1 1 350px', minWidth: 0 }} key={teksto.id}>
                <TextCard
                  teksto={teksto}
                  onTekstoClick={handleTekstoClick}
                  onSaveTeksto={handleSaveTeksto}
                  isSaved={false} // Dans l'historique, on ne gère pas les favoris
                />
              </Box>
            ))}
          </Box>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default HistoriquePage;