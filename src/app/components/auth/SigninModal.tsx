import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Typography,
  IconButton,
  InputAdornment,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { LoginInput } from '../../../lib/types/user';
import UserService from '../../services/UserService';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { setUser } from '../../screens/userPage/slice';

interface SignInModalProps {
  open: boolean;
  onClose: () => void;
}

/** REDUX DISPATCH */
const actionDispatch = (dispatch: Dispatch) => ({
  setUser: (data: any) => dispatch(setUser(data)),
});

export default function SignInModal({ open, onClose }: SignInModalProps) {
  const { setUser } = actionDispatch(useDispatch());
  const [userId, setUserId] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState('');

  // Form validation
  const validateForm = () => {
    if (!userId.trim()) {
      setError('User ID is required');
      return false;
    }
    if (!userPassword.trim()) {
      setError('Password is required');
      return false;
    }
    return true;
  };

  // Handle submit
  const handleSubmit = async () => {
    setError('');
    
    if (!validateForm()) {
      return;
    }

    try {
      console.log("Login Inputs:", userId, userPassword);
      const loginInput: LoginInput = {
        userId: userId,
        userPassword: userPassword,
      };

      const user = new UserService();
      const result = await user.login(loginInput);
      console.log("Login successful:", result);
      
      // Save User info to Redux store
      setUser(result);
      
      // Save User info to localStorage (both keys for compatibility)
      localStorage.setItem('userData', JSON.stringify(result));
      localStorage.setItem('user', JSON.stringify(result));
      
      alert('Login successful! Welcome back! 🎉');
      handleClose();
    } catch (err: any) {
      console.log("Login error:", err);
      setError(err?.message || 'Login failed. Please check your credentials.');
    }
  };

  const handleClose = () => {
    setUserId('');
    setUserPassword('');
    setShowPassword(false);
    setError('');
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: '16px',
          padding: '8px',
        },
      }}
    >
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight={600}>
            Sign In
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Stack>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Welcome back! Please login to your account
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          {error && (
            <Alert severity="error" onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          <TextField
            label="User ID"
            placeholder="Enter your user ID"
            fullWidth
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit();
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Password"
            placeholder="Enter your password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit();
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button 
          onClick={handleClose} 
          variant="outlined"
          fullWidth
          sx={{ mr: 1 }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          fullWidth
        >
          Sign In
        </Button>
      </DialogActions>
    </Dialog>
  );
}
