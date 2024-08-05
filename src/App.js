import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Home from './components/Home';
import Settings from './components/Settings';
import HeatMap from "./components/HeatMap";
import { useAuthContext } from './context/AuthContext';

const App = () => {
  const { loggedIn } = useAuthContext();

  return (
    <Routes>
      <Route path="/" element={ loggedIn ? <Navigate to="/home" /> : <Auth /> } />
      <Route path="/home" element={ loggedIn ? <Home /> : <Navigate to="/" /> } />
      <Route path="/settings" element={ loggedIn ? <Settings /> : <Navigate to="/" /> } />
      <Route path="/heatmap" element={ loggedIn ? <HeatMap /> : <Navigate to="/" /> } />
    </Routes>
  );
};

export default App;
