import api from './api';

export const getDashboardStats = async () => {
  const response = await api.get('/business/dashboard-stats');
  return response.data;
};

export const getBusinessProfile = async () => {
  const response = await api.get('/business/profile');
  return response.data;
};

export const updateBusinessProfile = async (data: any) => {
  const response = await api.put('/business/profile', data);
  return response.data;
}; 