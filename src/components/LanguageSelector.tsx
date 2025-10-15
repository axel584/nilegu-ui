import React, { useEffect } from 'react';
import { Select, MenuItem, FormControl, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Language as LanguageIcon } from '@mui/icons-material';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  // Charger la langue sauvegardée au démarrage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (event: any) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage);
    // Sauvegarder la langue dans le localStorage
    localStorage.setItem('preferredLanguage', newLanguage);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <LanguageIcon sx={{ color: 'white' }} />
      <FormControl size="small">
        <Select
          value={i18n.language}
          onChange={handleLanguageChange}
          sx={{
            color: 'white',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '.MuiSvgIcon-root': {
              color: 'white',
            },
          }}
        >
          <MenuItem value="de">Deutsch</MenuItem>
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="es">Español</MenuItem>
          <MenuItem value="eo">Esperanto</MenuItem>
          <MenuItem value="fr">Français</MenuItem>
          <MenuItem value="it">Italiano</MenuItem>
          <MenuItem value="pt">Português</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSelector;
