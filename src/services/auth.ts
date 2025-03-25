import api from './api';

export const signUp = async (data: {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  googleReviewLink: string;
  referralCode: string;
  paymentMethod: string;
}) => {
  const response = await api.post('/auth/signup', data);
  return response.data;
}; 