import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthContextProvider from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthContextProvider >
      <UserProvider>
        <App />
      </UserProvider>
    </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
