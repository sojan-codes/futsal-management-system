import apiClient from './apiClient';

export const createPayment = async (payload) => {
  return apiClient.post('/payments', payload);
};

export const verifyPayment = async (paymentReference, payload = {}) => {
  return apiClient.post(`/payments/${paymentReference}/verify`, payload);
};

export const uploadPaymentScreenshot = async (paymentReference, screenshot, onUploadProgress) => {
  const formData = new FormData();
  formData.append('screenshot', screenshot);
  return apiClient.post(`/payments/${paymentReference}/screenshot`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (event) => onUploadProgress?.(event.total ? Math.round((event.loaded * 100) / event.total) : 0),
  });
};

export const getPaymentStatus = async (paymentReference) => {
  return apiClient.get(`/payments/${paymentReference}`);
};

export const getPayments = async () => {
  return apiClient.get('/payments');
};
