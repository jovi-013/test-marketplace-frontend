import React from 'react';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Layout = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
            Marketplace
          </Typography>
          {user ? (
            <>
              {user.user_type === 'buyer' && (
                <Button 
                  component={RouterLink} 
                  to="/my-orders" 
                  color="inherit"
                  sx={{ mr: 2 }}
                >
                  My Orders
                </Button>
              )}
              <Typography sx={{ mr: 2 }}>Welcome, {user.email}</Typography>
              <Button color="inherit" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Button component={RouterLink} to="/login" color="inherit">Login</Button>
              <Button component={RouterLink} to="/register" color="inherit">Register</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <main>
        <Outlet /> 
      </main>
    </div>
  );
};

export default Layout;