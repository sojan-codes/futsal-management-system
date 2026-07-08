import apiClient from './apiClient';

export const getBookings = async () => {
  // TODO: Backend team will replace this with GET /bookings.
  return apiClient.get('/bookings');
};

export const createBooking = async (payload) => {
  // TODO: Backend team will replace this with POST /bookings.
  return apiClient.post('/bookings', payload);
};

export const cancelBooking = async (bookingId) => {
  // TODO: Backend team will replace this with PATCH /bookings/:id/cancel.
  return apiClient.patch(`/bookings/${bookingId}/cancel`);
};
