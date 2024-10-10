import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import FolderIcon from '@mui/icons-material/Folder';
import logo from "../utils/workik_official_logo.jpeg";
import LoginButton from './LoginButton'; // Assuming LoginButton is already created
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/system';

const CustomAppBar = styled(AppBar)(({ hasshadow }) => ({
  transition: 'box-shadow 0.3s',
  boxShadow: hasshadow ? '0 6px 20px rgba(0, 0, 0, 0.1)' : 'none',
}));

const Header = ({ user }) => {
  const navigate = useNavigate();
  const [hasshadow, setHasShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <CustomAppBar
      position="fixed"
      hasshadow={hasshadow}
      className="bg-white"
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img src={logo} alt="Workik Official Logo" style={{ height: 40, marginRight: 16 }} />
          <Typography variant="h6">Workik</Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton color="inherit" aria-label="home" onClick={() => navigate("/")}>
            <HomeIcon />
            <Typography variant="body2" sx={{ ml: 0.5 }}>Home</Typography>
          </IconButton>
          {
            user && 
            <IconButton color="inherit" aria-label="repos" onClick={() => navigate("/repos")}>
              <FolderIcon />
              <Typography variant="body2" sx={{ ml: 0.5 }}>Repos</Typography>
            </IconButton>
          }

          {!user && <LoginButton />} {/* Show LoginButton if user is not logged in */}
        </Box>
      </Toolbar>
    </CustomAppBar>
  );
};

export default Header;
