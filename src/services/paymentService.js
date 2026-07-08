import apiClient from './apiClient';

export const createPayment = async (payload) => {
  // TODO: Backend team will replace this with POST /payments.
  return apiClient.post('/payments', payload);
};

export const getPayments = async () => {
  // TODO: Backend team will replace this with GET /payments.
  return apiClient.get('/payments');
};
