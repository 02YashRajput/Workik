import React from 'react';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
const LoginButton = () => {
  const handleLogin = () => {
    // Redirecting to the server URL for GitHub authentication
    window.location.href = 'http://localhost:5001/auth/github';
  };

  return (
    <div >
      <Button 
      sx={{display: 'flex', gap:'4px'}}
        variant="contained" 
        color="success" 
        onClick={handleLogin} // Correctly placing the onClick handler
        aria-label="Login or Sign Up with GitHub"
      >
        <GitHubIcon/> Login/SignUp
      </Button>
    </div>
  );
};

export default LoginButton;
