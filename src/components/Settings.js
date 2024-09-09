import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
  IconButton
} from '@mui/material';
import { firestore } from '../firebase-config';
import { deleteField, doc, setDoc } from 'firebase/firestore';
import { useAuthContext } from '../context/AuthContext';
import { ArrowBack } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../context/UserContext';
import './settings.css'; // Import the CSS file

const Settings = () => {
  const { setLoggedIn, setEmail, setUser, email, user, loggedIn } = useAuthContext();
  const { codeforcesId: cfId, codechefId: cdId, leetcodeId: ltId, Institution: iid , 
    setCodeforcesId : setcfId,
    setCodechefId : setCdId,
    setLeetcodeId : setLeetId,
    setInstitution : setIid,  } = useUser();
  const [codechefId, setCodechefId] = useState(cdId || '');
  const [codeforcesId, setCodeforcesId] = useState(cfId || '');
  const [leetcodeId, setLeetcodeId] = useState(ltId || '');
  const [institution, setInstitution] = useState(iid || '');
  const navigate = useNavigate();

  useEffect(() => {
    // Load user data from local storage on mount
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData) {
      setCodechefId(storedUserData.codechefId || '');
      setCodeforcesId(storedUserData.codeforcesId || '');
      setLeetcodeId(storedUserData.leetcodeId || '');
      setInstitution(storedUserData.institution || '');
    }
  }, []);

  const handleSaveIds = async () => {
    if (user && user.uid) {
      const userIds = { codechefId, codeforcesId, leetcodeId, institution };
      try {
        setcfId(codeforcesId);
        setCdId(codechefId);
        setLeetId(leetcodeId);
        setInstitution(institution);
        const userRef = doc(firestore, 'users', user.uid);

        await setDoc(userRef, userIds, { merge: true });

        // Save to local storage
        localStorage.setItem('userData', JSON.stringify(userIds));

        // Update context state if necessary
        setUser((prevUser) => ({ ...prevUser, ...userIds }));

        toast.success('IDs saved successfully');
      } catch (error) {
        console.error('Error saving IDs:', error);
        toast.error('Error saving IDs');
      }
    } else {
      toast.error('No user is signed in');
    }
  };

  const handleDeleteAccount = async () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userData");
    setLoggedIn(false);
    setEmail(null);
    setUser(null);
    navigate("/");
  };

  return (
    <Container component="main" maxWidth="sm" className="container">
      <ToastContainer />
      <Paper elevation={3} className="paper">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <IconButton onClick={() => navigate('/home')} sx={{ position: 'absolute', top: 16, left: 16 }}>
            <ArrowBack />
          </IconButton>
          <Avatar className="avatar" />
          <Typography component="h1" variant="h5">
            Settings
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Update IDs
            </Typography>
            <TextField
              fullWidth
              label="Codeforces ID"
              margin="normal"
              value={codeforcesId}
              onChange={(e) => setCodeforcesId(e.target.value)}
            />
      
            <TextField
              fullWidth
              label="Institution"
              margin="normal"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className="button"
              onClick={handleSaveIds}
            >
              Save IDs
            </Button>
            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
              Delete Account
            </Typography>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              className="button"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Settings;
