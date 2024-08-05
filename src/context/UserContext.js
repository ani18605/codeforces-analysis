import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [codeforcesId, setCodeforcesId] = useState(localStorage.getItem('cfId'));
  const [codechefId, setCodechefId] = useState(localStorage.getItem('cdId'));
  const [leetcodeId, setLeetcodeId] = useState(localStorage.getItem('ltId'));
  const [Institution, setInstitution] = useState(localStorage.getItem('In'));
  const [userData, setUserData] = useState(null); // Add userData and setUserData

  const value = {
    codeforcesId,
    setCodeforcesId,
    codechefId,
    setCodechefId,
    leetcodeId,
    setLeetcodeId,
    Institution,
    setInstitution,
    userData,
    setUserData // Ensure this is included
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
