import React from 'react';
import {
  Square,
  Flex,
  Avatar,
  IconButton,
  useColorMode,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useAuth } from 'contexts/AuthContext';
import { Logo } from 'assets/images';
import { Profile, Menu } from 'layouts';
import { useAppContent } from 'contexts/AppContext';

export const Header = () => {
  const { user } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const { showProfile, setShowProfile, showMenu, setShowMenu } =
    useAppContent();
  const openProfileView = () => {
    setShowProfile(true);
  };

  const openMenu = () => {
    setShowMenu(true);
  };

  if (showMenu) return <Menu />;
  if (showProfile) return <Profile />;
  return (
    <Flex paddingBottom={6}>
      <Square width="40%" justifyContent={'start'}>
        <IconButton
          variant="ghost"
          aria-label="menu"
          fontSize="40px"
          onClick={openMenu}
          icon={<HamburgerIcon />}
        />
      </Square>
      <Square width="20%">
        <Logo
          cursor={'pointer'}
          onClick={() => navigate('/')}
          alt="Jalpen Shah"
          stroke={colorMode === 'dark' ? '#fff' : '#36454F'}
          strokeWidth="10"
          width="70px"
        />
      </Square>
      <Square width="40%" justifyContent={'end'}>
        <IconButton
          variant="ghost"
          fontSize="20px"
          margin="20px"
          onClick={() => toggleColorMode()}
          icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
        />
        <Avatar
          name={`${user.firstName} ${user.lastName}`}
          src={user.picture}
          cursor={'pointer'}
          onClick={openProfileView}
        />
      </Square>
    </Flex>
  );
};
