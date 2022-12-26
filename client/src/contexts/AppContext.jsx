import React, { createContext, useContext } from 'react';
import { useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [friends, setFriends] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <AppContext.Provider
      value={{
        categories,
        setCategories,
        friends,
        setFriends,
        showProfile,
        setShowProfile,
        showMenu,
        setShowMenu,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContent = () => {
  const context = useContext(AppContext);
  if (typeof context === 'undefined') {
    throw new Error('The `useAppContent` is accesible only under AppProvider');
  }
  return context;
};
