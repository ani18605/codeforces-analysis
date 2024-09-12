import React, { useState } from 'react';
import {
  AppBar,
  Avatar,
  Button,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useAuthContext } from '../context/AuthContext';
import { fetchUserData } from '../utils/api';
import UserProfile from '../components/profile/UserProfile';

const Home = () => {
  const { codeforcesId, codechefId, leetcodeId, Institution, setUserData } = useUser();
  const { setLoggedIn } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleFetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchUserData(codeforcesId, codechefId);
      setUserData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('user');
    localStorage.removeItem('loggedIn');
    navigate('/');
  };

  const handleSettings = () => {
    navigate('/settings');
    handleClose();
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            AlgoHub
          </Typography>
          <IconButton onClick={handleMenu} color="inherit">
            <Avatar />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleSettings}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box sx={styles.container}>
        <header style={styles.header}>
          <Typography variant="h4">Welcome to the Home Page</Typography>
        </header>
        <main style={styles.main}>
          <Typography variant="h6">User Information</Typography>
          <Typography variant="body1">Codeforces ID: {codeforcesId}</Typography>
          <Typography variant="body1">Institution: {Institution}</Typography>
          <Button variant="contained" color="primary" onClick={handleFetchData} disabled={loading}>
            {loading ? 'Loading...' : 'Show Data'}
          </Button>
          <UserProfile />
        </main>
      </Box>
    </Container>
  );
};

const styles = {
  body:{
    backgroundColor:'blur'
  },
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  header: {
    backgroundColor: '#282c34',
    padding: '20px',
    color: 'white',
  },
  main: {
    marginTop: '20px',
  },
};

export default Home;
