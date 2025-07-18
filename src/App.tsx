import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { TypographyVariantsOptions } from '@mui/material/styles';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import TextReaderPage from './pages/TextReaderPage';

// Étendre les variantes typographiques
declare module '@mui/material/styles' {
  interface TypographyVariants {
    appTitle: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    appTitle?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    appTitle: true;
  }
}

// Thème global de l'application
const theme = createTheme({
  palette: {
    primary: {
      main: '#554E47', // Gris foncé
    },
    secondary: {
      main: '#2196F3', // Bleu
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 500,
    },
    h4: {
      fontWeight: 500,
    },
    // Variante pour le nom de l'application
    appTitle: {
      fontFamily: '"Nothing You Could Do", cursive',
      fontSize: '2.5rem',
      fontWeight: 400,
      color: '#554E47',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/teksto/:id" element={<TextReaderPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
