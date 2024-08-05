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
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {  useAuthContext } from '../context/AuthContext';
import { ArrowBack } from '@mui/icons-material';
import { getAuth, updatePassword, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '../context/UserContext';

const Settings = () => {
  const {  setLoggedIn ,  setEmail   , setuser } = useAuthContext();
  const { codeforcesId : cfId,
    codechefId : cdId,
    leetcodeId : ltId, 
    Institution : iid } = useUser();
  const { email , user } = useAuthContext();
  const [codechefId, setCodechefId] = useState(cdId);
  const [codeforcesId, setCodeforcesId] = useState(cfId);
  const [leetcodeId, setLeetcodeId] = useState(ltId);
  const [institution, setInstitution] = useState(iid);
  const navigate = useNavigate();


  const handleSaveIds = async () => {
    if (user) {
      const userIds = { codechefId, codeforcesId, leetcodeId, institution };
      try {
        const userRef = doc(firestore, 'users', user.uid);
        await setDoc(userRef, userIds, { merge: true });
        localStorage.setItem('userIds', JSON.stringify(userIds));
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
    localStorage.removeItem("user");
    setLoggedIn(null);
    setEmail(null);
    setuser(null);
    navigate("/");
    // if (user) {
    //   try {
    //     const providerId = user.providerData[0].providerId;
    //     if (providerId === 'password') {
    //       // Reauthenticate user before deleting
    //       const credential = EmailAuthProvider.credential(user.email, oldPassword);
    //       await reauthenticateWithCredential(user, credential);
    //     }
    //     await deleteUser(user);
    //     localStorage.removeItem('user');
    //     toast.success('Account deleted successfully');
    //     navigate('/');
    //   } catch (error) {
    //     console.error('Error deleting account:', error);
    //     toast.error('Error deleting account: ' + error.message);
    //   }
    // } else {
    //   toast.error('No user is signed in');
    // }
  };

  return (
    <Container component="main" maxWidth="sm">
      <ToastContainer />
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <IconButton onClick={() => navigate('/home')} sx={{ position: 'absolute', top: 16, left: 16 }}>
            <ArrowBack />
          </IconButton>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
          <Typography component="h1" variant="h5">
            Settings
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Update IDs
            </Typography>
            <TextField
              fullWidth
              label="CodeChef ID"
              margin="normal"
              value={codechefId}
              onChange={(e) => setCodechefId(e.target.value)}
            />
            <TextField
              fullWidth
              label="Codeforces ID"
              margin="normal"
              value={codeforcesId}
              onChange={(e) => setCodeforcesId(e.target.value)}
            />
            <TextField
              fullWidth
              label="LeetCode ID"
              margin="normal"
              value={leetcodeId}
              onChange={(e) => setLeetcodeId(e.target.value)}
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
              sx={{ mt: 2 }}
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
              sx={{ mt: 2 }}
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
