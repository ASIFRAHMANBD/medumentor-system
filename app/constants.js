export const COLORS = {
  primary: '#F63049',
  secondary: '#D02752',
  deep: '#8A244B',
  base: '#111F35',
  white: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textDark: '#111F35',
  bgLight: '#F8FAFC',
};

import { Platform } from 'react-native';

const API_HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
export const API_URL = `http://${API_HOST}:4000/api`;
