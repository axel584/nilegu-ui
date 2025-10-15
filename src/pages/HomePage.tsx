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
import Footer from '../components/Footer';
import LanguageSelector from '../components/LanguageSelector';
import {
  PlayArrow as PlayIcon,
  Book as BookIcon,
  Psychology as PsychologyIcon,
  TrendingUp as TrendingUpIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
              {t('home.title')}
            </Typography>
            <Typography variant="h2" gutterBottom>
              {t('home.hero.headline')}
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
              {t('home.hero.subtitle')}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
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
                {t('home.hero.cta')}
              </Button>
              <LanguageSelector />
            </Box>
          </Container>
        </Box>

        {/* Méthode d'apprentissage */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography variant="h3" textAlign="center" gutterBottom>
            {t('home.naturalApproach.title')}
          </Typography>
          <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
            {t('home.naturalApproach.subtitle')}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            <Box sx={{ flex: '1 1 400px', minWidth: 0 }}>
              <Card sx={{ height: '100%', p: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PsychologyIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                    <Typography variant="h5">{t('home.naturalApproach.intuitive.title')}</Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    {t('home.naturalApproach.intuitive.p1')}
                  </Typography>
                  <Typography variant="body1">
                    {t('home.naturalApproach.intuitive.p2')}
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            <Box sx={{ flex: '1 1 400px', minWidth: 0 }}>
              <Card sx={{ height: '100%', p: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PlayIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                    <Typography variant="h5">{t('home.naturalApproach.listenRead.title')}</Typography>
                  </Box>
                  <Typography variant="body1" paragraph>
                    {t('home.naturalApproach.listenRead.p1')}
                  </Typography>
                  <Typography variant="body1">
                    {t('home.naturalApproach.listenRead.p2')}
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
              {t('home.whyWorks.title')}
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 4 }}>
              <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
                <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                  <BookIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    {t('home.whyWorks.progressive.title')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('home.whyWorks.progressive.description')}
                  </Typography>
                </Paper>
              </Box>

              <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
                <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                  <TrendingUpIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    {t('home.whyWorks.natural.title')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('home.whyWorks.natural.description')}
                  </Typography>
                </Paper>
              </Box>

              <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
                <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                  <PsychologyIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    {t('home.whyWorks.durable.title')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('home.whyWorks.durable.description')}
                  </Typography>
                </Paper>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Niveaux */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography variant="h4" textAlign="center" gutterBottom>
            {t('home.levels.title')}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 4 }}>
            {[
              { niveau: t('home.levels.beginner.label'), description: t('home.levels.beginner.description'), color: '#4CAF50' },
              { niveau: t('home.levels.intermediate.label'), description: t('home.levels.intermediate.description'), color: '#FF9800' },
              { niveau: t('home.levels.advanced.label'), description: t('home.levels.advanced.description'), color: '#F44336' }
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
              {t('home.cta.title')}
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              {t('home.cta.subtitle')}
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
              {t('home.cta.button')}
            </Button>
          </Container>
        </Box>
        <Footer />
      </Box>
  );
};

export default HomePage; 