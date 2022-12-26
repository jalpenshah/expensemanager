import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@chakra-ui/react';

export const Logout = () => {
  const { doLogout } = useAuth();
  return <Button onClick={doLogout}>Logout</Button>;
};
