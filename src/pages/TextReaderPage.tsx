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
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  TextField,
  Rating
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Stop as StopIcon,
  VolumeUp as VolumeIcon,
  ArrowBack as ArrowBackIcon,
  Translate as TranslateIcon,
  Replay5 as Replay5Icon,
  VolumeDown as VolumeDownIcon,
  VolumeOff as VolumeOffIcon
} from '@mui/icons-material';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useTekstoDetaloj } from '../hooks/useTekstoj';
import { Vorto } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { UserMenu } from '../components/UserMenu';
import { legitajxojService, authService } from '../services/api';
import Footer from '../components/Footer';

// Conseils pour l'utilisation du Comprehensible Input
const COMPREHENSIBLE_INPUT_TIPS = [
  "Ne traduisez pas systématiquement chaque mot. Essayez de comprendre le sens global d'abord.",
  "Lisez à haute voix pour améliorer votre prononciation et votre fluidité.",
  "Si vous ne comprenez pas un mot, continuez votre lecture. Le contexte vous aidera souvent à en deviner le sens.",
  "Relisez le même texte plusieurs fois. Chaque lecture améliore votre compréhension.",
  "Concentrez-vous sur le plaisir de lire plutôt que sur la perfection grammaticale.",
  "Écoutez l'audio plusieurs fois, même sans regarder le texte, pour habituer votre oreille.",
  "Variez les vitesses de lecture audio pour trouver celle qui vous convient le mieux.",
  "Prenez des pauses régulières. L'apprentissage se fait aussi pendant le repos.",
  "Notez mentalement les mots qui reviennent souvent, ils sont généralement importants.",
  "Ne cherchez pas à tout comprendre à 100%. Même 70% de compréhension est un excellent résultat.",
  "Lisez régulièrement, même 10 minutes par jour, plutôt qu'une longue session occasionnelle.",
  "Choisissez des textes qui vous intéressent vraiment pour maintenir votre motivation.",
  "Essayez de visualiser l'histoire pendant que vous lisez pour mieux mémoriser.",
  "Écoutez le texte en fermant les yeux pour vous concentrer uniquement sur les sons.",
  "Relisez un passage difficile après avoir terminé tout le texte, il sera souvent plus clair.",
  "Connectez-vous avec votre compte Ikurso pour laisser une évaluation et un commentaire sur les textes que vous lisez.",
  "Sauvegardez vos textes préférés dans votre liste personnelle en vous connectant, pour les retrouver facilement plus tard.",
  "N'hésitez pas à contacter l'équipe de Ni legu pour leur proposer des textes à ajouter.",
  "Utilisez les filtres du catalogue pour trier les textes par taille ou par difficulté et trouver celui qui correspond à votre niveau.",
  "Si vous aimez l'enregistrement audio d'un lecteur, tapez son nom dans la recherche pour écouter tous ses textes.",
  "Certains mots ne sont pas dans le dictionnaire, mais vous pouvez certainement comprendre leur sens en les décomposant.",
  "Ne lisez pas une grammaire trop tôt, elle peut être utile pour comprendre certains points, mais commencez d'abord par lire.",
  "Évitez d'apprendre des listes de vocabulaire par cœur. Les mots que vous rencontrez dans les textes se mémoriseront naturellement.",
  "Pas besoin de faire des exercices de grammaire. Votre cerveau assimilera les structures en les rencontrant régulièrement dans les textes.",
  "Ne transformez pas la lecture en exercice scolaire. Le simple fait de lire avec plaisir est le meilleur apprentissage.",
  "Oubliez les flashcards et les listes de mots. Rencontrer le vocabulaire dans son contexte est bien plus efficace.",
  "L'apprentissage par la lecture est naturel : faites confiance à votre cerveau pour acquérir la langue sans effort conscient."
];

const TextReaderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { teksto, loading, error } = useTekstoDetaloj(id || null);
  const { user, isAuthenticated } = useAuth();

  // Mode développeur
  const isDevMode = searchParams.get('dev') === 'true';

  // Conseil aléatoire pour le Comprehensible Input
  const [randomTip] = useState(() =>
    COMPREHENSIBLE_INPUT_TIPS[Math.floor(Math.random() * COMPREHENSIBLE_INPUT_TIPS.length)]
  );


  // Enregistrer le début de lecture quand le texte est chargé
  React.useEffect(() => {
    if (teksto && id && isAuthenticated) {
      legitajxojService.recordTextStart(id).catch(error => {
        console.error('Erreur lors de l\'enregistrement du début de lecture:', error);
        // Ne pas afficher d'erreur à l'utilisateur pour ne pas perturber l'expérience de lecture
      });
    }
  }, [teksto, id, isAuthenticated]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selectedWord, setSelectedWord] = useState<Vorto | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);

  // États pour le formulaire d'avis
  const [rating, setRating] = useState<number | null>(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // État pour la popup de connexion
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [identifiant, setIdentifiant] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

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
      audioRef.current.playbackRate = playbackRate;
      audioRef.current.volume = volume;
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const handleRewind5Seconds = () => {
    if (audioRef.current) {
      const newTime = Math.max(0, audioRef.current.currentTime - 5);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (_event: Event, newValue: number | number[]) => {
    const volumeValue = Array.isArray(newValue) ? newValue[0] : newValue;
    setVolume(volumeValue);
    if (audioRef.current) {
      audioRef.current.volume = volumeValue;
    }
  };

  const handleFinishText = async () => {
    if (!id || !isAuthenticated || !rating) return;

    setIsSubmitting(true);
    try {
      await legitajxojService.finishText(id, rating, comment);
      console.log('Texte marqué comme terminé avec succès');
      navigate('/catalog');
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenLoginDialog = () => {
    setShowLoginDialog(true);
  };

  const handleCloseLoginDialog = () => {
    setShowLoginDialog(false);
    setIdentifiant('');
    setPassword('');
    setLoginError('');
  };

  const handleLoginSubmit = async () => {
    if (!identifiant || !password) return;

    setIsLoggingIn(true);
    setLoginError('');

    try {
      const { user: loggedInUser, token } = await authService.login(identifiant, password);
      // Sauvegarder les données utilisateur
      localStorage.setItem('auth_user', JSON.stringify(loggedInUser));
      handleCloseLoginDialog();
      // Recharger la page pour mettre à jour l'état d'authentification
      window.location.reload();
    } catch (error: any) {
      setLoginError(error.message || 'Erreur lors de la connexion');
    } finally {
      setIsLoggingIn(false);
    }
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

  const renderText = (textArray: string[] | string, ŝlosilvortoj: string[], vortaro?: { [key: string]: string }) => {
    // S'assurer que ŝlosilvortoj est un tableau
    const vortoj = Array.isArray(ŝlosilvortoj) ? ŝlosilvortoj : [];
    
    // Créer un set pour un accès rapide aux mots-clés
    const vortoSet = new Set(vortoj.map(v => v.toLowerCase()));
    
    // Convertir en tableau si c'est une chaîne
    const texts = Array.isArray(textArray) ? textArray : [textArray];
    
    return texts.map((text, textIndex) => {
      // Ignorer les textes vides
      if (!text || !text.trim()) {
        return null;
      }
      
      // Diviser le texte en mots et ponctuation (incluant les points de suspension, tirets, parenthèses et guillemets)
      const words = text.split(/(\s+|[.,!?;:…\-()'"«»\u201C\u201D\u2018\u2019‚„‹›`]+)/);

      const paragraphContent = words.map((word, index) => {
        const cleanWord = word.toLowerCase();
        const isKeyword = vortoSet.has(cleanWord);
        const hasTranslation = vortaro && vortaro[cleanWord];
        const isClickable = (isKeyword || hasTranslation) && word.trim();
        
        // En mode dev, surligner en jaune les mots non-cliquables qui contiennent des lettres
        const isWordWithLetters = /[a-zA-ZĈĜĤĴŜŬĉĝĥĵŝŭ]/.test(word);
        const shouldHighlight = isDevMode && !isClickable && isWordWithLetters && word.trim() && !/^[.,!?;:…\-\s]+$/.test(word);
        
        if (isClickable) {
          return (
            <span
              key={`${textIndex}-${index}`}
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
        
        if (shouldHighlight) {
          return (
            <span 
              key={`${textIndex}-${index}`}
              style={{ 
                backgroundColor: 'yellow',
                padding: '1px 2px',
                borderRadius: '2px'
              }}
            >
              {word}
            </span>
          );
        }
        
        return <span key={`${textIndex}-${index}`}>{word}</span>;
      });
      
      return (
        <React.Fragment key={textIndex}>
          {paragraphContent}
          {textIndex < texts.length - 1 && <br />}
        </React.Fragment>
      );
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
          <Typography variant="h6" component="div" sx={{ mr: 1 }} translate="no">
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
          <Box sx={{ flexGrow: 1 }} />
          <UserMenu user={isAuthenticated && user ? user : undefined} />
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
          <Typography color="text.primary" translate="no">{teksto.titolo}</Typography>
        </Breadcrumbs>

        {/* Informations du texte */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', gap: 3 }}>
              {/* Couverture du livre si arthur_id est disponible */}
              {teksto.arthur_id && (
                <Box
                  component="a"
                  href={teksto.priskribo || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    flexShrink: 0,
                    cursor: teksto.priskribo ? 'pointer' : 'default',
                    textDecoration: 'none'
                  }}
                  onClick={(e) => {
                    if (!teksto.priskribo) {
                      e.preventDefault();
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={`https://esperanto-france.org/couvertures/${teksto.arthur_id}.mini.jpg`}
                    alt={`Couverture de ${teksto.titolo}`}
                    sx={{
                      width: 120,
                      height: 'auto',
                      borderRadius: 1,
                      boxShadow: 2,
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': teksto.priskribo ? {
                        transform: 'scale(1.05)',
                        boxShadow: 3
                      } : {}
                    }}
                    onError={(e) => {
                      // Masquer l'image si elle ne peut pas être chargée
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </Box>
              )}

              {/* Informations textuelles */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h4" gutterBottom translate="no">
                  {teksto.titolo}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  par <span translate="no">{teksto.aŭtoro}</span>
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
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Lecteur audio */}
        {teksto.sono && teksto.sono.trim() !== '' && (
          <Paper 
            sx={{ 
              p: 3, 
              mb: 4,
              position: 'sticky',
              top: 0,
              zIndex: 1000,
              bgcolor: 'white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              borderRadius: 2
            }}
          >
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <VolumeIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Écouter le texte</Typography>
              </Box>
              {teksto.leganto && (
                <Typography variant="body2" color="text.secondary">
                  lu par <span translate="no">{teksto.leganto}</span>
                </Typography>
              )}
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
              
              <IconButton 
                onClick={handleRewind5Seconds}
                title="Revenir 5 secondes en arrière"
              >
                <Replay5Icon />
              </IconButton>
              
              <FormControl size="small" sx={{ minWidth: 80 }}>
                <Select
                  value={playbackRate}
                  onChange={(e) => handlePlaybackRateChange(e.target.value as number)}
                  displayEmpty
                  sx={{ 
                    fontSize: '0.875rem',
                    '& .MuiSelect-select': { py: 0.5 }
                  }}
                >
                  <MenuItem value={0.5}>0.5x</MenuItem>
                  <MenuItem value={0.75}>0.75x</MenuItem>
                  <MenuItem value={1}>1x</MenuItem>
                  <MenuItem value={1.25}>1.25x</MenuItem>
                </Select>
              </FormControl>
              
              <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 120, ml: 2 }}>
                {volume === 0 ? <VolumeOffIcon fontSize="small" /> : <VolumeDownIcon fontSize="small" />}
                <Slider
                  value={volume}
                  onChange={handleVolumeChange}
                  min={0}
                  max={1}
                  step={0.1}
                  sx={{ 
                    mx: 1,
                    width: 80,
                    '& .MuiSlider-thumb': {
                      width: 16,
                      height: 16,
                    },
                    '& .MuiSlider-track': {
                      height: 3,
                    },
                    '& .MuiSlider-rail': {
                      height: 3,
                    }
                  }}
                />
                <VolumeIcon fontSize="small" />
              </Box>
              
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
          <Typography variant="body2" color="text.secondary" paragraph>
            Cliquez sur les mots pour voir leur traduction.
            {teksto.sono && teksto.sono.trim() !== '' && (
              <> Écoutez l'audio en même temps que vous lisez pour améliorer votre prononciation.</>
            )}
          </Typography>
          <Box sx={{
            mt: 2,
            p: 2,
            bgcolor: 'white',
            borderRadius: 1,
            borderLeft: '4px solid #554E47'
          }}>
            <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.primary' }}>
              💡 <strong>Conseil :</strong> {randomTip}
            </Typography>
          </Box>
        </Paper>

        {/* Texte */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography 
            variant="body1" 
            sx={{ 
              lineHeight: 1.8,
              fontSize: '1.1rem',
              textAlign: 'justify'
            }}
            translate="no"
          >
            {renderText(teksto.enhavo, teksto.ŝlosilvortoj || [], teksto.vortaro)}
          </Typography>
        </Paper>

        {/* Formulaire d'avis */}
        {isAuthenticated ? (
          <Paper sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              Mon avis sur ce texte :
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography component="legend" sx={{ mb: 1 }}>
                Note :
              </Typography>
              <Rating
                name="text-rating"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
                size="large"
              />
            </Box>

            <TextField
              multiline
              rows={3}
              fullWidth
              label="Votre commentaire (optionnel)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{ mb: 3 }}
              placeholder="Partagez votre avis sur ce texte..."
            />

            <Button
              variant="contained"
              onClick={handleFinishText}
              disabled={isSubmitting || !rating}
              sx={{
                bgcolor: '#554E47',
                '&:hover': { bgcolor: '#433B35' },
                px: 4,
                py: 1.5
              }}
            >
              {isSubmitting ? 'Enregistrement...' : "J'ai fini ce texte"}
            </Button>
          </Paper>
        ) : (
          <Paper sx={{ p: 4, textAlign: 'center', bgcolor: '#f5f5f5' }}>
            <Typography variant="body1" color="text.secondary">
              Pour évaluer ce texte et laisser un commentaire,{' '}
              <Link
                component="button"
                variant="body1"
                onClick={handleOpenLoginDialog}
                sx={{
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  color: '#554E47',
                  fontWeight: 'bold',
                  '&:hover': {
                    color: '#433B35'
                  }
                }}
              >
                connectez-vous
              </Link>
              {' '}avec votre compte Ikurso
            </Typography>
          </Paper>
        )}
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
              <Typography variant="h6" gutterBottom translate="no">
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

      {/* Dialog de connexion */}
      <Dialog
        open={showLoginDialog}
        onClose={handleCloseLoginDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Connectez-vous avec votre compte Ikurso</DialogTitle>
        <DialogContent>
          {loginError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {loginError}
            </Alert>
          )}
          <TextField
            autoFocus
            margin="dense"
            label="Identifiant"
            fullWidth
            variant="outlined"
            value={identifiant}
            onChange={(e) => setIdentifiant(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Mot de passe"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isLoggingIn && identifiant && password) {
                handleLoginSubmit();
              }
            }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Si vous n'avez pas de compte ou que vous avez oublié votre mot de passe, rendez-vous sur{' '}
            <a href="https://ikurso.esperanto-france.org" target="_blank" rel="noopener noreferrer">
              https://ikurso.esperanto-france.org
            </a>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLoginDialog}>
            Annuler
          </Button>
          <Button
            onClick={handleLoginSubmit}
            variant="contained"
            disabled={isLoggingIn || !identifiant || !password}
          >
            {isLoggingIn ? 'Connexion...' : 'Se connecter'}
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </Box>
  );
};

export default TextReaderPage; 