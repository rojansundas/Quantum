/**
 * lib/api.ts
 * Axios instance with JWT auto-refresh and error handling
 */
import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// ─── Request interceptor — attach access token ───────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Response interceptor — auto-refresh on 401 ──────────────────────────
let isRefreshing = false;
let queue: Array<(token: string) => void> = [];

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          queue.push((token) => {
            original.headers.Authorization = `Bearer ${token}`;
            resolve(api(original));
          });
        });
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const refresh = Cookies.get('refresh_token');
        if (!refresh) throw new Error('No refresh token');

        const { data } = await axios.post(`${API_URL}/auth/token/refresh/`, { refresh });
        const newAccess = data.access;

        Cookies.set('access_token', newAccess, { secure: true, sameSite: 'strict' });
        api.defaults.headers.common.Authorization = `Bearer ${newAccess}`;
        queue.forEach((cb) => cb(newAccess));
        queue = [];
        return api(original);
      } catch {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        window.location.href = '/login';
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

// ─── Auth helpers ────────────────────────────────────────────────────────
export const authApi = {
  register: (data: object) => api.post('/auth/register/', data),
  login:    (email: string, password: string) => api.post('/auth/login/', { email, password }),
  googleLogin: (id_token: string) => api.post('/auth/google/', { id_token }),
  logout:   (refresh: string) => api.post('/auth/logout/', { refresh }),
  profile:  () => api.get('/auth/profile/'),
  updateProfile: (data: object) => api.patch('/auth/profile/', data),
};

export const contactApi = {
  send:        (data: object) => api.post('/contact/', data),
  subscribe:   (email: string) => api.post('/contact/newsletter/', { email }),
};

export const portfolioApi = {
  list:   (params?: object) => api.get('/portfolio/', { params }),
  detail: (slug: string) => api.get(`/portfolio/${slug}/`),
};

export const blogApi = {
  list:    (params?: object) => api.get('/blog/', { params }),
  detail:  (slug: string) => api.get(`/blog/${slug}/`),
  comment: (slug: string, body: string) => api.post(`/blog/${slug}/comments/`, { body }),
};

export const careersApi = {
  list:  () => api.get('/careers/'),
  apply: (slug: string, data: FormData) =>
    api.post(`/careers/${slug}/apply/`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
};
