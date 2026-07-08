import apiClient from './apiClient';

export const loginUser = async (credentials) => {
  // TODO: Replace mock auth with POST /auth/login when backend is ready.
  return apiClient.post('/auth/login', credentials);
};

export const signupUser = async (payload) => {
  // TODO: Replace mock signup with POST /auth/signup when backend is ready.
  return apiClient.post('/auth/signup', payload);
};

export const requestPasswordReset = async (email) => {
  // TODO: Wire to backend password-reset endpoint.
  return apiClient.post('/auth/forgot-password', { email });
};
