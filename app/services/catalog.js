import { API_URL } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getHeaders() {
  const token = await AsyncStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
}

export const CatalogService = {
  getPrograms: async () => {
    const res = await fetch(`${API_URL}/catalog/programs`, {
      headers: await getHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch programs');
    return res.json();
  },

  getStages: async (programId) => {
    const query = programId ? `?programId=${programId}` : '';
    const res = await fetch(`${API_URL}/catalog/stages${query}`, {
      headers: await getHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch stages');
    return res.json();
  },

  getSubjects: async (stageId) => {
    const res = await fetch(`${API_URL}/catalog/subjects?stageId=${stageId}`, {
      headers: await getHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch subjects');
    return res.json();
  },

  getModules: async (subjectId) => {
    const res = await fetch(`${API_URL}/catalog/modules?subjectId=${subjectId}`, {
      headers: await getHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch modules');
    return res.json();
  },

  getModuleDetails: async (moduleId) => {
    const res = await fetch(`${API_URL}/catalog/modules/${moduleId}/details`, {
      headers: await getHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch module details');
    return res.json();
  }
};
