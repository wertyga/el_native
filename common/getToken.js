import { AsyncStorage } from 'react-native';

export const getToken = async () => await AsyncStorage.getItem('token');