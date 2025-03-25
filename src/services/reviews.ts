import api from './api';

export const getReviews = async (filter?: string) => {
  const response = await api.get(`/reviews?filter=${filter || ''}`);
  return response.data;
};

export const replyToReview = async (reviewId: string, reply: string) => {
  const response = await api.post(`/reviews/${reviewId}/reply`, { reply });
  return response.data;
};

export const submitReview = async (data: {
  businessId: number;
  rating: number;
  comment: string;
}) => {
  const response = await api.post('/reviews/submit', data);
  return response.data;
};

export const submitSurvey = async (data: {
  businessId: number;
  reviewId: number;
  improvementAreas: string[];
  feedback: string;
}) => {
  const response = await api.post('/reviews/survey', data);
  return response.data;
}; 