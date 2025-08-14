import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton
} from '@mui/material';
import { GitHub as GitHubIcon } from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#554E47',
        color: 'white',
        py: 2,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 4,
            flexWrap: 'wrap'
          }}
        >
          <Link
            href="https://ikurso.esperanto-france.org/kiujniestas.php"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'white',
              textDecoration: 'underline',
              '&:hover': {
                textDecoration: 'none',
                opacity: 0.8
              }
            }}
          >
            <Typography variant="body2">
              Qui sommes nous ?
            </Typography>
          </Link>

          <Link
            href="https://ikurso.esperanto-france.org/reago.php"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'white',
              textDecoration: 'underline',
              '&:hover': {
                textDecoration: 'none',
                opacity: 0.8
              }
            }}
          >
            <Typography variant="body2">
              Nous contacter
            </Typography>
          </Link>

          <IconButton
            href="https://github.com/axel584/nilegu-ui"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'white',
              '&:hover': {
                opacity: 0.8
              }
            }}
          >
            <GitHubIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;