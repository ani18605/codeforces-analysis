import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [codeforcesId, setCodeforcesId] = useState(localStorage.getItem('cfId'));
  const [codechefId, setCodechefId] = useState(localStorage.getItem('cdId'));
  const [leetcodeId  , setLeetcodeId ] = useState(localStorage.getItem('ltId'));
  const [Institution , setInstitution] = useState(localStorage.getItem('In'));

  const value = {
    codeforcesId,
    setCodeforcesId,
    codechefId,
    setCodechefId,
    leetcodeId,
    setLeetcodeId,
    Institution, 
    setInstitution
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
