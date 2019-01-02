import { AsyncStorage } from 'react-native';

export const clearSession =  (self, err) => {
  const error = err.response ? err.response.data : err.message;
  if(err.response && err.response.status === 401) {
    return AsyncStorage.removeItem('token').then(() => false);
  } else {
    return error;
  };
};