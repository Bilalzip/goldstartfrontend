import api from './api';

export const generateQrCode = async (type: string) => {
  const response = await api.get(`/api/qr-code/generate?type=${type}`);
  return response.data;
};

export const getBusinessQrCode = async () => {
  const response = await api.get('/api/qr-code/business');
  return response.data;
}; 