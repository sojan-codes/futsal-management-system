import apiClient from './apiClient';

export const getCourts = async () => {
  // TODO: Backend team will replace this with GET /courts.
  return apiClient.get('/courts');
};

export const getCourtById = async (courtId) => {
  // TODO: Backend team will replace this with GET /courts/:id.
  return apiClient.get(`/courts/${courtId}`);
};
