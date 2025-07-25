import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Slider,
  Paper,
  InputAdornment,
  IconButton,
  Typography,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  FilterList as FilterIcon,
  Sort as SortIcon
} from '@mui/icons-material';
import { Filtroj } from '../types';

interface SearchFormProps {
  filtroj: Filtroj;
  onFiltroj: (filtroj: Filtroj) => void;
  onClearFiltroj: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  filtroj,
  onFiltroj,
  onClearFiltroj
}) => {
  const handleSerĉoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFiltroj({ ...filtroj, serĉo: event.target.value });
  };

  const handleNiveloChange = (event: any) => {
    onFiltroj({ ...filtroj, nivelo: event.target.value });
  };

  const handleOrderChange = (event: any) => {
    const [order, sort] = event.target.value.split('|');
    onFiltroj({ ...filtroj, order, sort });
  };

  const handleLongecoChange = (event: Event, newValue: number | number[]) => {
    const [min, max] = newValue as number[];
    onFiltroj({ ...filtroj, longecoMin: min, longecoMax: max });
  };

  const handleHasSonoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFiltroj({ ...filtroj, hasSono: event.target.checked });
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <FilterIcon sx={{ mr: 1 }} />
        <Typography variant="h6">Filtres de recherche</Typography>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {/* Recherche */}
        <Box sx={{ flex: '1 1 400px', minWidth: 0 }}>
          <TextField
            fullWidth
            label="Rechercher par titre, auteur ou mots-clés"
            value={filtroj.serĉo}
            onChange={handleSerĉoChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: filtroj.serĉo && (
                <InputAdornment position="end">
                  <IconButton onClick={() => onFiltroj({ ...filtroj, serĉo: '' })}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Niveau */}
        <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
          <FormControl fullWidth>
            <InputLabel>Niveau</InputLabel>
            <Select
              value={filtroj.nivelo}
              label="Niveau"
              onChange={handleNiveloChange}
            >
              <MenuItem value="">Tous les niveaux</MenuItem>
              <MenuItem value="facile">Facile</MenuItem>
              <MenuItem value="intermediaire">Intermédiaire</MenuItem>
              <MenuItem value="avance">Avancé</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Ordre de tri */}
        <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
          <FormControl fullWidth>
            <InputLabel>Trier par</InputLabel>
            <Select
              value={`${filtroj.order}|${filtroj.sort}`}
              label="Trier par"
              onChange={handleOrderChange}
            >
              <MenuItem value="ekdato|DESC">Les plus récents</MenuItem>
              <MenuItem value="nivelo|ASC">Les plus faciles</MenuItem>
              <MenuItem value="nivelo|DESC">Les plus difficiles</MenuItem>
              <MenuItem value="vortoj|ASC">Les plus courts</MenuItem>
              <MenuItem value="vortoj|DESC">Les plus longs</MenuItem>
              <MenuItem value="titolo|ASC">Ordre alphabétique</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Longueur */}
      <Box sx={{ mt: 3 }}>
        <Typography gutterBottom>Longueur du texte (mots)</Typography>
        <Slider
          value={[filtroj.longecoMin, filtroj.longecoMax]}
          onChange={handleLongecoChange}
          valueLabelDisplay="auto"
          min={200}
          max={4000}
          step={50}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2">{filtroj.longecoMin} mots</Typography>
          <Typography variant="body2">{filtroj.longecoMax} mots</Typography>
        </Box>
      </Box>

      {/* Case à cocher pour l'enregistrement sonore */}
      <Box sx={{ mt: 3 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={filtroj.hasSono}
              onChange={handleHasSonoChange}
              color="primary"
            />
          }
          label="Contient un enregistrement sonore"
        />
      </Box>

      {/* Bouton réinitialiser */}
      <Box sx={{ mt: 3 }}>
        <Button
          variant="outlined"
          onClick={onClearFiltroj}
          startIcon={<ClearIcon />}
        >
          Réinitialiser les filtres
        </Button>
      </Box>
    </Paper>
  );
};

export default SearchForm;