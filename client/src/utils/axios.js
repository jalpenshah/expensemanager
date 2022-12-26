import axios from 'axios';

export const getAxios = (token) => {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_SERVER_URL;
  if (token) {
    axios.defaults.headers.common['Authentication'] = `Bearer ${token}`;
  }
  axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded';
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  axios.defaults.headers.common['Access-Control-Allow-Headers'] =
    'Origin, X-Requested-With, Content-Type, Accept';
  return axios;
};
