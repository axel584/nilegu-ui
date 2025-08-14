import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton
} from '@mui/material';
import {
  Person as PersonIcon,
  Timer as TimerIcon,
  VolumeUp as VolumeIcon,
  RecordVoiceOver as RecordVoiceOverIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon
} from '@mui/icons-material';
import { Texto } from '../types';
import { stringToRainbowColor, getContrastTextColor } from '../utils/colorUtils';

interface TextCardProps {
  teksto: Texto;
  onTekstoClick: (tekstoId: string) => void;
  onSaveTeksto: (tekstoId: string) => void;
  isSaved: boolean;
}

const TextCard: React.FC<TextCardProps> = ({
  teksto,
  onTekstoClick,
  onSaveTeksto,
  isSaved
}) => {
  const getNiveloColor = (nivelo: string) => {
    const niveloNum = parseInt(nivelo);
    if (niveloNum >= 0 && niveloNum <= 999) {
      return '#4CAF50'; // Vert pour facile
    } else if (niveloNum >= 1000 && niveloNum <= 1999) {
      return '#FF9800'; // Orange pour intermédiaire
    } else if (niveloNum >= 2000) {
      return '#F44336'; // Rouge pour avancé
    }
    return '#757575'; // Gris par défaut
  };

  const getNiveloLabel = (nivelo: string) => {
    const niveloNum = parseInt(nivelo);
    if (niveloNum >= 0 && niveloNum <= 999) {
      return 'Facile';
    } else if (niveloNum >= 1000 && niveloNum <= 1999) {
      return 'Intermédiaire';
    } else if (niveloNum >= 2000) {
      return 'Avancé';
    }
    return nivelo;
  };

  return (
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
      onClick={() => onTekstoClick(teksto.id)}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="h2" sx={{ flex: 1, mr: 1 }}>
            {teksto.titolo}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onSaveTeksto(teksto.id);
              }}
              size="small"
              sx={{
                color: isSaved ? 'primary.main' : 'grey.500',
                '&:hover': {
                  color: 'primary.main',
                }
              }}
            >
              {isSaved ? (
                <BookmarkIcon fontSize="small" />
              ) : (
                <BookmarkBorderIcon fontSize="small" />
              )}
            </IconButton>
            <Chip
              label={getNiveloLabel(teksto.nivelo)}
              size="small"
              sx={{
                bgcolor: getNiveloColor(teksto.nivelo),
                color: 'white',
                fontSize: '0.75rem',
              }}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <PersonIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {teksto.aŭtoro}
          </Typography>
        </Box>

        {teksto.leganto && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <RecordVoiceOverIcon sx={{ fontSize: 16, mr: 0.5, color: 'primary.main' }} />
            <Typography variant="body2" color="text.secondary">
              lu par {teksto.leganto}
            </Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TimerIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {teksto.longeco} mots
          </Typography>
          {teksto.audioUrl && (
            <VolumeIcon sx={{ fontSize: 16, ml: 1, color: 'primary.main' }} />
          )}
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
            {teksto.ŝlosilvortoj.slice(0, 3).map((vorto, index) => {
              const backgroundColor = stringToRainbowColor(vorto);
              const textColor = getContrastTextColor(backgroundColor);
              return (
                <Chip
                  key={index}
                  label={vorto}
                  size="small"
                  variant="outlined"
                  sx={{ 
                    fontSize: '0.7rem',
                    // backgroundColor: backgroundColor,
                    // color: textColor,
                    // border: 'none'
                  }}
                />
              );
            })}
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
  );
};

export default TextCard;