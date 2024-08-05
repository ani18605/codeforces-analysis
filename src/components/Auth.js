import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  firestore } from '../firebase-config';
import auth from '../firebase-config';
import { useAuthContext } from '../context/AuthContext';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Avatar
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import { useUser } from '../context/UserContext';

const Auth = () => {
  const { 
    setCodeforcesId,
    setCodechefId,
     setLeetcodeId,
     setInstitution} 
 =useUser();
   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setLoggedIn , setEmail : setEmaill , setuser } = useAuthContext();

  const updateTheLoginStatus = async (email) => {
    await updatEdata(email);
    setLoggedIn(true);
    setEmaill(email);
  }

  const updatEdata = async (email) => {
    const userDoc = doc(firestore, 'users', email);
    const docSnap = await getDoc(userDoc);

    localStorage.setItem("loggedIn" , true);

    console.log(docSnap.data);

    if (!docSnap.exists()) {
      await setDoc(userDoc, { email, createdAt: new Date() });
    }
  }  

  const handleSignUp = async () => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
      setuser(response.user);
      toast.success("User registered successfully");
      await updateTheLoginStatus(response.user.email);
      await fetchUserData(response.user);
      navigate('/home');
    } catch (error) {
      console.error(error);
      toast.error("Error registering user");
    }
  };

  const handleSignIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      localStorage.setItem('user', JSON.stringify(response.user));
      setuser(response.user);
      toast.success("User signed in successfully");
      await updateTheLoginStatus(response.user.email);
      await fetchUserData(response.user);
      navigate('/home');
    } catch (error) {
      console.error(error);
      toast.error("Error signing in user");
    }
  };

  const fetchUserData = async (user) => {
    if (user) {
      try {
        const userRef = doc(firestore, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log('thhis is the user data' , userData)
          localStorage.setItem('cfId' , userData.codeforcesId);
          localStorage.setItem('cdId' , userData.codechefId);
          localStorage.setItem('ltId' , userData.leetcodeId);
          localStorage.setItem('In' , userData.institution);
          setCodechefId(userData.codechefId || '');
          setCodeforcesId(userData.codeforcesId || '');
          setLeetcodeId(userData.leetcodeId || '');
          setInstitution(userData.institution || '');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const response = await signInWithPopup(auth, provider);
      console.log(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
      setuser(response.user);
      toast.success("User signed in with Google successfully");
      await updateTheLoginStatus(response.user.email);
      await fetchUserData(response.user);
      navigate('/home');
    } catch (error) {
      console.error(error);
      toast.error("Error signing in with Google");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome to AlgoHub!!
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSignIn}
            >
              Sign In
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignIn}
            >
              Sign In with Google
            </Button>
          </Box>
        </Box>
      </Paper>
      <ToastContainer />
    </Container>
  );
};

export default Auth;
