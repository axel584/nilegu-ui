import React, { useState, useRef } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  AppBar,
  Toolbar,
  Breadcrumbs,
  Link,
  CircularProgress,
  Alert,
  Card,
  CardContent
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Stop as StopIcon,
  VolumeUp as VolumeIcon,
  ArrowBack as ArrowBackIcon,
  Translate as TranslateIcon
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useTekstoDetaloj } from '../hooks/useTekstoj';
import { Vorto } from '../types';

const TextReaderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { teksto, loading, error } = useTekstoDetaloj(id || null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selectedWord, setSelectedWord] = useState<Vorto | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleWordClick = (vorto: Vorto) => {
    setSelectedWord(vorto);
    setShowTranslation(true);
  };

  const handleCloseTranslation = () => {
    setShowTranslation(false);
    setSelectedWord(null);
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getNiveloColor = (nivelo: string | number) => {
    const niveauNum = typeof nivelo === 'string' ? parseInt(nivelo, 10) : nivelo;
    if (niveauNum >= 0 && niveauNum <= 999) {
      return '#4CAF50'; // Vert pour facile
    } else if (niveauNum >= 1000 && niveauNum <= 1999) {
      return '#FF9800'; // Orange pour intermédiaire
    } else if (niveauNum >= 2000) {
      return '#F44336'; // Rouge pour avancé
    }
    return '#757575'; // Gris par défaut
  };

  const getNiveloLabel = (nivelo: string | number) => {
    const niveauNum = typeof nivelo === 'string' ? parseInt(nivelo, 10) : nivelo;
    
    if (niveauNum >= 0 && niveauNum <= 999) {
      return 'Facile';
    } else if (niveauNum >= 1000 && niveauNum <= 1999) {
      return 'Intermédiaire';
    } else if (niveauNum >= 2000) {
      return 'Avancé';
    }
    
    return nivelo; // Retourne la valeur originale si elle ne correspond à aucun critère
  };

  const isUrl = (text: string) => {
    try {
      new URL(text);
      return true;
    } catch {
      return false;
    }
  };

  const renderText = (text: string, ŝlosilvortoj: string[], vortaro?: { [key: string]: string }) => {
    // S'assurer que ŝlosilvortoj est un tableau
    const vortoj = Array.isArray(ŝlosilvortoj) ? ŝlosilvortoj : [];
    
    // Créer un set pour un accès rapide aux mots-clés
    const vortoSet = new Set(vortoj.map(v => v.toLowerCase()));
    
    // Diviser le texte en mots et ponctuation
    const words = text.split(/(\s+|[.,!?;:])/);
    
    return words.map((word, index) => {
      const cleanWord = word.replace(/[.,!?;:]/, '').toLowerCase();
      const isKeyword = vortoSet.has(cleanWord);
      const hasTranslation = vortaro && vortaro[cleanWord];
      
      if ((isKeyword || hasTranslation) && word.trim()) {
        return (
          <span
            key={index}
            onClick={() => {
              // Créer un objet Vorto avec la vraie traduction si disponible
              const vorto: Vorto = {
                vorto: cleanWord,
                traduko: hasTranslation ? vortaro[cleanWord] : `Traduction de "${cleanWord}"`,
                tipo: hasTranslation ? 'dictionnaire' : 'mots-clés'
              };
              handleWordClick(vorto);
            }}
            style={{
              cursor: 'pointer',
              color: hasTranslation ? '#554E47' : '#2196F3',
              textDecorationColor: hasTranslation ? '#554E47' : '#2196F3',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = hasTranslation ? '#f5f5f5' : '#e3f2fd';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {word}
          </span>
        );
      }
      return <span key={index}>{word}</span>;
    });
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

  if (!teksto) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">
          Texte non trouvé
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* AppBar */}
      <AppBar position="static" sx={{ bgcolor: '#554E47' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate('/catalog')}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link color="inherit" href="/" underline="hover">
            Accueil
          </Link>
          <Link color="inherit" href="/catalog" underline="hover">
            Catalogue
          </Link>
          <Typography color="text.primary">{teksto.titolo}</Typography>
        </Breadcrumbs>

        {/* Informations du texte */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {teksto.titolo}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              par {teksto.aŭtoro}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip label={`${teksto.longeco} mots`} size="small" />
              <Chip 
                label={getNiveloLabel(teksto.nivelo)} 
                size="small" 
                sx={{
                  bgcolor: getNiveloColor(teksto.nivelo),
                  color: 'white',
                }}
              />
            </Box>
            {teksto.priskribo && (
              <Typography variant="body2" color="text.secondary">
                {isUrl(teksto.priskribo) ? (
                  <Link
                    href={teksto.priskribo}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: 'primary.main', textDecoration: 'underline' }}
                  >
                    {teksto.priskribo}
                  </Link>
                ) : (
                  teksto.priskribo
                )}
              </Typography>
            )}
          </CardContent>
        </Card>

        {/* Lecteur audio */}
        {teksto.sono && teksto.sono.trim() !== '' && (
          <Paper sx={{ p: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <VolumeIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Écouter le texte</Typography>
            </Box>
            
            <audio
              ref={audioRef}
              src={teksto.sono}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleEnded}
              style={{ display: 'none' }}
            />
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton
                onClick={handlePlayPause}
                sx={{ 
                  bgcolor: 'primary.main', 
                  color: 'white',
                  '&:hover': { bgcolor: 'primary.dark' }
                }}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </IconButton>
              
              <IconButton onClick={handleStop}>
                <StopIcon />
              </IconButton>
              
              <Box sx={{ flex: 1, ml: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </Typography>
              </Box>
            </Box>
          </Paper>
        )}

        {/* Instructions */}
        <Paper sx={{ p: 3, mb: 4, bgcolor: '#f5f5f5' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <TranslateIcon sx={{ mr: 1, color: '#554E47' }} />
            <Typography variant="h6" sx={{ color: '#554E47' }}>
              Comment utiliser cette page
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Cliquez sur les mots soulignés pour voir leur traduction. 
            Écoutez l'audio en même temps que vous lisez pour améliorer votre prononciation.
          </Typography>
        </Paper>

        {/* Texte */}
        <Paper sx={{ p: 4 }}>
          <Typography 
            variant="body1" 
            sx={{ 
              lineHeight: 1.8,
              fontSize: '1.1rem',
              textAlign: 'justify'
            }}
          >
            {renderText(teksto.enhavo, teksto.ŝlosilvortoj || [], teksto.vortaro)}
          </Typography>
        </Paper>
      </Container>

      {/* Dialog de traduction */}
      <Dialog
        open={showTranslation}
        onClose={handleCloseTranslation}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TranslateIcon sx={{ mr: 1 }} />
            Traduction
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedWord && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedWord.vorto}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                <strong>Traduction :</strong> {selectedWord.traduko}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTranslation}>
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TextReaderPage; 