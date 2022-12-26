import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from 'contexts';

const useAxios = ({
  url,
  method,
  autoFetch = true,
  body = null,
  headers = null,
}) => {
  const { user } = useAuth();

  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(true);
  axios.defaults.baseURL = process.env.REACT_APP_BASE_SERVER_URL;

  const callback = useCallback(
    async (url, method, body, header) => {
      if (user?.token) {
        axios.defaults.headers.common[
          'Authentication'
        ] = `Bearer ${user?.token}`;
      }
      if (method) {
        axios[method](url, body, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers':
              'Origin, X-Requested-With, Content-Type, Accept',
          },
        })
          .then((res) => {
            setResponse(res.data);
          })
          .catch((err) => {
            setError(err);
          })
          .finally(() => {
            setloading(false);
          });
      }
    },
    [user]
  );

  useEffect(() => {
    if (autoFetch) callback(url, method, body, headers);
  }, [url, method, autoFetch, body, headers, callback]);
  return {
    callService: () => callback(url, method, body, headers),
    response,
    error,
    loading,
  };
};

export default useAxios;
