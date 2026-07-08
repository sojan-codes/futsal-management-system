import apiClient from './apiClient';

export const getUsers = async () => {
  // TODO: Backend team will replace this with GET /users.
  return apiClient.get('/users');
};

export const updateUser = async (userId, payload) => {
  // TODO: Backend team will replace this with PATCH /users/:id.
  return apiClient.patch(`/users/${userId}`, payload);
};
