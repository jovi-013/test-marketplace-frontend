import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('buyer');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await register(email, password, userType);
      setSuccess('Registration successful! Please log in.');
      setTimeout(() => navigate('/login'), 2000); 
    } catch (err) {
      setError('Failed to register. The email might already be in use.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal" required fullWidth id="email" label="Email Address" name="email"
            autoComplete="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal" required fullWidth name="password" label="Password" type="password"
            id="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="user-type-label">I am a...</InputLabel>
            <Select
              labelId="user-type-label"
              id="user-type-select"
              value={userType}
              label="I am a..."
              onChange={(e) => setUserType(e.target.value)}
            >
              <MenuItem value={'buyer'}>Buyer</MenuItem>
              <MenuItem value={'seller'}>Seller</MenuItem>
            </Select>
          </FormControl>
          
          {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
          {success && <Typography color="primary" sx={{ mt: 2 }}>{success}</Typography>}

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;