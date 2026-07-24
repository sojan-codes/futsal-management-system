import { createContext, createElement, useContext, useEffect, useMemo, useState } from 'react';
import apiClient from '../services/apiClient';

const AuthContext = createContext(null);
const STORAGE_KEY = 'futsalpro_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) { const parsed = JSON.parse(saved); setUser({ ...parsed, role: parsed.role?.toLowerCase(), is_admin_console: parsed.is_admin_console ?? ['admin', 'futsal_admin'].includes(parsed.role?.toLowerCase()) }); }
  }, []);

  const applySession = (data) => {
    const nextUser = { ...data.user, role: data.user.role.toLowerCase(), is_admin_console: Boolean(data.user.is_admin_console) };
    localStorage.setItem('futsalpro_access', data.access); localStorage.setItem('futsalpro_refresh', data.refresh);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
    return nextUser;
  };
  const login = async (credentials) => applySession((await apiClient.post('/auth/login', credentials)).data);
  const adminLogin = async (credentials) => applySession((await apiClient.post('/auth/admin/login', credentials)).data);
  const signup = async ({ fullName, email, phone, password, confirm }) => applySession((await apiClient.post('/auth/signup', { full_name: fullName, email, phone, password, confirm_password: confirm })).data);

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY); localStorage.removeItem('futsalpro_access'); localStorage.removeItem('futsalpro_refresh');
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, adminLogin, logout, signup }), [user]);
  return createElement(AuthContext.Provider, { value }, children);
}

export function useAuth() {
  return useContext(AuthContext);
}
