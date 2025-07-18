import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Paper,
  Chip,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Book as BookIcon,
  Psychology as PsychologyIcon,
  TrendingUp as TrendingUpIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToCatalog = () => {
    navigate('/catalog');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
        {/* Hero Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #554E47 0%, #6B5B47 100%)',
            color: 'white',
            py: 8,
            textAlign: 'center',
          }}
        >
          <Container maxWidth="lg">
            <Typography 
              variant="appTitle" 
              sx={{ 
                mb: 2,
                color: 'white',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              Ni legu
            </Typography>
            <Typography variant="h2" gutterBottom>
              Lire, comprendre, apprendre
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
              Découvrez une langue internationale à travers des histoires captivantes
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleGoToCatalog}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  bgcolor: 'grey.100',
                },
              }}
              endIcon={<ArrowForwardIcon />}
            >
              Découvrir les textes
            </Button>
          </Container>
        </Box>

        {/* Méthode d'apprentissage */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography variant="h3" textAlign="center" gutterBottom>
            Une approche naturelle
          </Typography>
          <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
            Apprenez l'espéranto comme vous avez appris votre langue maternelle
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            <Box sx={{ flex: '1 1 400px', minWidth: 0 }}>
              <Card sx={{ height: '100%', p: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PsychologyIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                    <Typography variant="h5">Apprentissage intuitif</Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    Plongez-vous dans des histoires en espéranto et laissez votre cerveau 
                    comprendre naturellement la structure de la langue. Pas besoin d'étudier 
                    la grammaire de manière traditionnelle.
                  </Typography>
                  <Typography variant="body1">
                    Votre esprit est programmé pour apprendre les langues. Il suffit de 
                    lui donner le bon environnement.
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            <Box sx={{ flex: '1 1 400px', minWidth: 0 }}>
              <Card sx={{ height: '100%', p: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PlayIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                    <Typography variant="h5">Écoute et lecture</Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    Chaque texte est accompagné d'un enregistrement audio pour vous 
                    familiariser avec la prononciation et l'intonation de l'espéranto.
                  </Typography>
                  <Typography variant="body1">
                    Cliquez sur n'importe quel mot pour voir sa traduction et enrichir 
                    progressivement votre vocabulaire.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Container>

        {/* Avantages */}
        <Box sx={{ bgcolor: 'white', py: 8 }}>
          <Container maxWidth="lg">
            <Typography variant="h4" textAlign="center" gutterBottom>
              Pourquoi cette méthode fonctionne
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 4 }}>
              <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
                <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                  <BookIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Textes progressifs
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Commencez par des histoires simples et progressez vers des textes 
                    plus complexes selon votre niveau.
                  </Typography>
                </Paper>
              </Box>

              <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
                <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                  <TrendingUpIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Progression naturelle
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Votre compréhension s'améliore naturellement à chaque lecture, 
                    sans effort conscient.
                  </Typography>
                </Paper>
              </Box>

              <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
                <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                  <PsychologyIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Mémorisation durable
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Les mots appris en contexte sont mieux retenus que ceux 
                    mémorisés par cœur.
                  </Typography>
                </Paper>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Niveaux */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography variant="h4" textAlign="center" gutterBottom>
            Des textes pour tous les niveaux
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 4 }}>
            {[
              { niveau: 'Débutant', description: 'Histoires simples avec vocabulaire de base', color: '#4CAF50' },
              { niveau: 'Intermédiaire', description: 'Textes plus longs avec vocabulaire enrichi', color: '#FF9800' },
              { niveau: 'Avancé', description: 'Œuvres littéraires et textes complexes', color: '#F44336' }
            ].map((item, index) => (
              <Box sx={{ flex: '1 1 300px', minWidth: 0 }} key={index}>
                <Card sx={{ p: 3, textAlign: 'center' }}>
                  <Chip
                    label={item.niveau}
                    sx={{
                      bgcolor: item.color,
                      color: 'white',
                      fontSize: '1rem',
                      mb: 2,
                    }}
                  />
                  <Typography variant="body1" color="text.secondary">
                    {item.description}
                  </Typography>
                </Card>
              </Box>
            ))}
          </Box>
        </Container>

        {/* Call to action */}
        <Box sx={{ bgcolor: '#554E47', color: 'white', py: 6 }}>
          <Container maxWidth="md" sx={{ textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
              Prêt à commencer votre voyage ?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Rejoignez des milliers d'apprenants qui ont découvert l'espéranto 
              de manière naturelle et agréable.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleGoToCatalog}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  bgcolor: 'grey.100',
                },
              }}
              endIcon={<ArrowForwardIcon />}
            >
              Explorer le catalogue
            </Button>
          </Container>
        </Box>
      </Box>
  );
};

export default HomePage; 