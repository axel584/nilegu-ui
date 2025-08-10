import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Divider,
  Box
} from '@mui/material';
import { AccountCircle, ExitToApp } from '@mui/icons-material';
import { User } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface UserMenuProps {
  user: User;
}

export const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { logout } = useAuth();

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
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {user.nomo}
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
        <MenuItem onClick={handleLogout}>
          <ExitToApp sx={{ mr: 1 }} />
          Elsaluti
        </MenuItem>
      </Menu>
    </Box>
  );
};