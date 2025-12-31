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
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
import CakeIcon from '@mui/icons-material/Cake';
import { UserInput } from '../../../lib/types/user';
import UserService from '../../services/UserService';

interface SignUpModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SignUpModal({ open, onClose }: SignUpModalProps) {
  const [userId, setUserId] = useState<string>('');
  const [userPhone, setUserPhone] = useState<string>('');
  const [userAge, setUserAge] = useState<string>(''); // string sifatida saqlash
  const [userPassword, setUserPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false); // boolean bo'lishi kerak
  const [error, setError] = useState('');

  // Form validation
  const validateForm = () => {
    if (!userId.trim()) {
      setError('User ID is required');
      return false;
    }
    if (!userPhone.trim()) {
      setError('Phone number is required');
      return false;
    }
    if (userPhone.length < 9) {
      setError('Phone number must be at least 9 digits');
      return false;
    }
    if (!userAge.trim()) {
      setError('Age is required');
      return false;
    }
    const age = parseInt(userAge);
    if (isNaN(age) || age < 19) {
      setError('You must be at least 19 years old to sign up');
      return false;
    }
    if (!userPassword.trim()) {
      setError('Password is required');
      return false;
    }
    if (userPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  // Handle phone input (faqat raqamlar)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setUserPhone(value);
  };

  // Handle age input (faqat raqamlar)
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value === '' || parseInt(value) <= 120) { // maksimal 120 yosh
      setUserAge(value);
    }
  };

  // Handle submit
  const handleSubmit = async () => {
    setError('');
    
    if (!validateForm()) {
      return;
    }

    try {
      console.log("Signup Inputs:", userId, userPhone, userAge, userPassword);
      const signupInput: UserInput = {
        userId: userId,
        userPhone: userPhone,
        userAge: parseInt(userAge),
        userPassword: userPassword,
      };

      const user = new UserService();
      const result = await user.signup(signupInput);
      console.log("Signup successful:", result);
      
      alert('Sign up successful! Welcome to our platform! 🎉');
      
      handleClose();
    } catch (err: any) {
      console.log("Signup error:", err);
      setError(err?.message || 'Sign up failed. Please try again.');
    }
  };

  // Modal yopilganda formni tozalash
  const handleClose = () => {
    setUserId('');
    setUserPhone('');
    setUserAge('');
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
            Sign Up
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Stack>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Create your account to get started
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Phone Number"
            placeholder="010 1234 5678"
            fullWidth
            value={userPhone}
            onChange={handlePhoneChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Age"
            placeholder="Enter your age"
            fullWidth
            value={userAge}
            onChange={handleAgeChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CakeIcon color="action" />
                </InputAdornment>
              ),
            }}
            helperText="You must be at least 19 years old"
          />

          <TextField
            label="Password"
            placeholder="Enter your password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
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

          <Typography variant="caption" color="text.secondary">
            Password must be at least 6 characters long
          </Typography>
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
          Sign Up
        </Button>
      </DialogActions>
    </Dialog>
  );
}