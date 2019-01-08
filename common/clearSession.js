import { AsyncStorage } from 'react-native';

export const clearSession =  (self, err) => {
  const error = {
    message: err.response ? err.response.data : err.message,
    status: err.response ? err.response.status : 500,
  }
  if(err.response && err.response.status === 401) {
    AsyncStorage.removeItem('token');
    error.redirect = true;
  }

  return error;

};