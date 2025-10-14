import React, { useEffect, useState } from 'react';
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
  Link,
  Divider,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserMenu } from '../components/UserMenu';
import Footer from '../components/Footer';
import { profilService } from '../services/api';
import { User } from '../types';

interface ExtendedUser extends User {
  // Ajouter des champs supplémentaires qui pourraient venir de l'API profil
  registradDato?: string;
  plenaAdreso?: string;
  telefono?: string;
  lando?: string;
  lingvoj?: string[];
  [key: string]: any; // Pour d'autres champs qui pourraient exister
}

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [profileData, setProfileData] = useState<ExtendedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!isAuthenticated || !user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await profilService.getProfil(user.id);
        setProfileData(data);
      } catch (err: any) {
        console.error('Error fetching profile:', err);
        setError(err.message || 'Erreur lors du chargement du profil');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Alert severity="warning">
            Vous devez être connecté pour voir votre profil.
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
          <Typography variant="appTitle" component="div" sx={{ flexGrow: 1, color: 'white' }}>
            Nilegu
          </Typography>
          <UserMenu user={user || undefined} />
        </Toolbar>
      </AppBar>

      {/* Breadcrumbs */}
      <Container maxWidth="lg" sx={{ pt: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate('/')}
            sx={{ cursor: 'pointer' }}
          >
            Accueil
          </Link>
          <Typography color="text.primary">Mon profil</Typography>
        </Breadcrumbs>
      </Container>

      {/* Contenu principal */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Mon profil
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Informations de votre compte Ikurso
        </Typography>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {!loading && !error && profileData && (
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
            {/* Informations personnelles */}
            <Box sx={{ flex: 1 }}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Informations personnelles
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Nom d'utilisateur
                  </Typography>
                  <Typography variant="body1">
                    {profileData.enirnomo || 'Non renseigné'}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Prénom
                  </Typography>
                  <Typography variant="body1">
                    {profileData.personnomo || 'Non renseigné'}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Nom de famille
                  </Typography>
                  <Typography variant="body1">
                    {profileData.familinomo || 'Non renseigné'}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Adresse e-mail
                  </Typography>
                  <Typography variant="body1">
                    {profileData.retadreso || 'Non renseigné'}
                  </Typography>
                </Box>

                {profileData.naskigxdato && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Date de naissance
                    </Typography>
                    <Typography variant="body1">
                      {new Date(profileData.naskigxdato).toLocaleDateString('fr-FR')}
                    </Typography>
                  </Box>
                )}

                {profileData.lando && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Pays
                    </Typography>
                    <Typography variant="body1">
                      {profileData.lando}
                    </Typography>
                  </Box>
                )}

                {(profileData.adreso1 || profileData.adreso2 || profileData.urbo || profileData.posxtkodo) && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Adresse
                    </Typography>
                    <Typography variant="body1">
                      {[
                        profileData.adreso1,
                        profileData.adreso2,
                        [profileData.posxtkodo, profileData.urbo].filter(Boolean).join(' ')
                      ].filter(Boolean).join(', ') || 'Non renseigné'}
                    </Typography>
                  </Box>
                )}

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Date d'inscription
                  </Typography>
                  <Typography variant="body1">
                    {profileData.ekdato ? new Date(profileData.ekdato).toLocaleDateString('fr-FR') : 'Non renseigné'}
                  </Typography>
                </Box>
              </Paper>
            </Box>

            {/* Informations sur le compte */}
            <Box sx={{ flex: 1 }}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Compte et permissions
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Identifiant
                  </Typography>
                  <Typography variant="body1">
                    {profileData.id}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Statut
                  </Typography>
                  <Chip 
                    label={profileData.rajtoj_label || profileData.rajtoj || 'Non défini'} 
                    color="primary" 
                    size="small" 
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Cours
                  </Typography>
                  <Typography variant="body1">
                    {profileData.kurso || 'Non renseigné'}
                  </Typography>
                </Box>

                {profileData.lasteniro && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Dernière connexion
                    </Typography>
                    <Typography variant="body1">
                      {new Date(profileData.lasteniro).toLocaleString('fr-FR')}
                    </Typography>
                  </Box>
                )}

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Compte activé
                  </Typography>
                  <Chip 
                    label={profileData.aktivigita ? 'Oui' : 'Non'} 
                    color={profileData.aktivigita ? 'success' : 'error'} 
                    size="small" 
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Profil visible
                  </Typography>
                  <Chip 
                    label={profileData.videbla ? 'Oui' : 'Non'} 
                    color={profileData.videbla ? 'success' : 'default'} 
                    size="small" 
                  />
                </Box>

                {profileData.noto && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Note
                    </Typography>
                    <Typography variant="body1">
                      {profileData.noto}
                    </Typography>
                  </Box>
                )}

                {/* Préférences de communication */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Préférences de communication
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    <Chip 
                      label={`Info: ${profileData.stop_info ? 'Arrêté' : 'Actif'}`} 
                      color={profileData.stop_info ? 'error' : 'success'} 
                      variant="outlined" 
                      size="small" 
                    />
                    <Chip 
                      label={`Rappels: ${profileData.stop_rappel ? 'Arrêté' : 'Actif'}`} 
                      color={profileData.stop_rappel ? 'error' : 'success'} 
                      variant="outlined" 
                      size="small" 
                    />
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Box>
        )}
      </Container>

      <Footer />
    </Box>
  );
};

export default ProfilePage;