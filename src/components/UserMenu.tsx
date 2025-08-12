import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Divider,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert
} from '@mui/material';
import { AccountCircle, ExitToApp, Login, History } from '@mui/icons-material';
import { User } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/api';

interface UserMenuProps {
  user?: User;
}

export const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [identifiant, setIdentifiant] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { logout, login: setUser } = useAuth();
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  const handleHistorique = () => {
    navigate('/historique');
    handleMenuClose();
  };

  const handleLogin = () => {
    setShowLoginDialog(true);
    handleMenuClose();
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
      const user = await authService.login(identifiant, password);
      setUser(user);
      handleCloseLoginDialog();
    } catch (error: any) {
      setLoginError(error.message || 'Erreur lors de la connexion');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <Box>
      <IconButton
        size="large"
        edge="end"
        aria-label="compte utilisateur"
        aria-controls="user-menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
        color="inherit"
      >
        <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
          <AccountCircle />
        </Avatar>
      </IconButton>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {user ? (
          <>
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {user.personnomo || user.nomo}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.retpoŝto}
              </Typography>
              {user.rolo && (
                <Typography variant="caption" color="primary">
                  {user.rolo}
                </Typography>
              )}
            </Box>
            <Divider />
            <MenuItem onClick={handleHistorique}>
              <History sx={{ mr: 1 }} />
              Historique
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ExitToApp sx={{ mr: 1 }} />
              Déconnexion
            </MenuItem>
          </>
        ) : (
          <MenuItem onClick={handleLogin}>
            <Login sx={{ mr: 1 }} />
            Connexion
          </MenuItem>
        )}
      </Menu>

      {/* Dialog de connexion */}
      <Dialog
        open={showLoginDialog}
        onClose={handleCloseLoginDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Connexion</DialogTitle>
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
    </Box>
  );
};