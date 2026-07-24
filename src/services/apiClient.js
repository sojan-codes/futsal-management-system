import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api',
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('futsalpro_access');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let refreshPromise;
apiClient.interceptors.response.use((response) => response, async (error) => {
  const request = error.config;
  if (error.response?.status !== 401 || request?._retry || request?.url?.includes('/auth/refresh')) return Promise.reject(error);
  request._retry = true;
  const refresh = localStorage.getItem('futsalpro_refresh');
  if (!refresh) return Promise.reject(error);
  try {
    refreshPromise ||= axios.post(`${apiClient.defaults.baseURL}/auth/refresh`, { refresh });
    const { data } = await refreshPromise;
    localStorage.setItem('futsalpro_access', data.access);
    request.headers.Authorization = `Bearer ${data.access}`;
    return apiClient(request);
  } catch (refreshError) {
    localStorage.removeItem('futsalpro_access'); localStorage.removeItem('futsalpro_refresh'); localStorage.removeItem('futsalpro_user');
    return Promise.reject(refreshError);
  } finally { refreshPromise = null; }
});

export default apiClient;
