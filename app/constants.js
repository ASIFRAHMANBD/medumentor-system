export const COLORS = {
  primary: '#F63049',
  primaryDark: '#D02752',
  secondary: '#D02752',
  deep: '#8A244B',
  base: '#111F35',
  white: '#FFFFFF',
  background: '#F8FAFC',
  text: '#0F172A',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textDark: '#111F35',
  gray: '#64748B',
  border: '#E2E8F0',
  success: '#16A34A',
  warning: '#F59E0B',
  error: '#DC2626',
  lightPrimary: '#FFE4E6',
};

import { Platform } from 'react-native';

const ENV_API_URL = process.env.EXPO_PUBLIC_API_URL;

let defaultHost = 'localhost';
if (Platform.OS === 'android') {
  // Always use LAN IP on Android so physical devices can reach the backend
  defaultHost = '192.168.0.103';
}

export const API_URL = ENV_API_URL || `http://${defaultHost}:4000/api`;
