import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const useGoogleLogin = () => {
  const url = `${process.env.REACT_APP_BASE_SERVER_URL}/api/v1/auth/continueWithGoogle`;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { updateUser } = useAuth();
  const fetchGoogleLoginResponse = async (response) => {
    setIsLoading(true);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authentication: `Bearer ${response.credential}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data?.user) {
          updateUser(data?.user);
        } else {
          throw new Error(data?.message || data);
        }
      })
      .catch((error) => {
        setError(error?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return { fetchGoogleLoginResponse, isLoading, error };
};

export default useGoogleLogin;
