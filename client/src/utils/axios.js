import axios from 'axios';
import { removeLocalStorageData } from './local-storage';

export const getAxios = (token) => {
  axios.interceptors.request.use(
    (config) => {
      config.baseURL = process.env.REACT_APP_BASE_SERVER_URL;
      if (token) {
        config.headers['Authentication'] = `Bearer ${token}`;
      }
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      config.headers['Access-Control-Allow-Origin'] = '*';
      config.headers['Access-Control-Allow-Headers'] =
        'Origin, X-Requested-With, Content-Type, Accept';
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response) {
        if (
          error.response.status === 401 &&
          ['Token has expired', 'Invalid token'].includes(
            error.response.data.message
          )
        ) {
          removeLocalStorageData('user');
          window.location.href = '/';
        }
      }
      return error;
    }
  );

  return axios;
};
