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
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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
        <Typography variant="h6">{t('catalog.filters')}</Typography>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {/* Recherche */}
        <Box sx={{ flex: '1 1 400px', minWidth: 0 }}>
          <TextField
            fullWidth
            label={t('catalog.search')}
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
            <InputLabel>{t('catalog.level')}</InputLabel>
            <Select
              value={filtroj.nivelo}
              label={t('catalog.level')}
              onChange={handleNiveloChange}
            >
              <MenuItem value="">{t('catalog.allLevels')}</MenuItem>
              <MenuItem value="facile">{t('common.beginner')}</MenuItem>
              <MenuItem value="intermediaire">{t('common.intermediate')}</MenuItem>
              <MenuItem value="avance">{t('common.advanced')}</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Ordre de tri */}
        <Box sx={{ flex: '1 1 200px', minWidth: 0 }}>
          <FormControl fullWidth>
            <InputLabel>{t('catalog.sortBy')}</InputLabel>
            <Select
              value={`${filtroj.order}|${filtroj.sort}`}
              label={t('catalog.sortBy')}
              onChange={handleOrderChange}
            >
              <MenuItem value="ekdato|DESC">{t('catalog.newest')}</MenuItem>
              <MenuItem value="nivelo|ASC">{t('catalog.shortest')}</MenuItem>
              <MenuItem value="nivelo|DESC">{t('catalog.longest')}</MenuItem>
              <MenuItem value="vortoj|ASC">{t('catalog.shortest')}</MenuItem>
              <MenuItem value="vortoj|DESC">{t('catalog.longest')}</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Longueur */}
      <Box sx={{ mt: 3 }}>
        <Typography gutterBottom>{t('catalog.textLength')}</Typography>
        <Slider
          value={[filtroj.longecoMin, filtroj.longecoMax]}
          onChange={handleLongecoChange}
          valueLabelDisplay="auto"
          min={200}
          max={4000}
          step={50}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2">{filtroj.longecoMin} {t('common.words')}</Typography>
          <Typography variant="body2">{filtroj.longecoMax} {t('common.words')}</Typography>
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
          label={t('catalog.withAudio')}
        />
      </Box>

      {/* Bouton réinitialiser */}
      <Box sx={{ mt: 3 }}>
        <Button
          variant="outlined"
          onClick={onClearFiltroj}
          startIcon={<ClearIcon />}
        >
          {t('catalog.clearFilters')}
        </Button>
      </Box>
    </Paper>
  );
};

export default SearchForm;