import apiClient from './apiClient';

export const getCourts = async () => {
  // TODO: Backend team will replace this with GET /courts.
  return apiClient.get('/courts');
};

export const getCourtById = async (courtId) => {
  // TODO: Backend team will replace this with GET /courts/:id.
  return apiClient.get(`/courts/${courtId}`);
};

export const getCourtAvailability = async (courtId, date, duration = 1) => apiClient.get(`/courts/${courtId}/availability`, { params: { date, duration } });

export const createCourt = async (payload) => apiClient.post('/courts', payload);
export const updateCourt = async (courtId, payload) => apiClient.patch(`/courts/${courtId}`, payload);
export const deactivateCourt = async (courtId) => apiClient.delete(`/courts/${courtId}`);
