import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper
} from '@mui/material';

const HistoriquePage: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Historique
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Cette page affichera l'historique de vos lectures et activités.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default HistoriquePage;