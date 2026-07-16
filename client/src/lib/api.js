import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

let tokenProvider = async () => null;

export const setTokenProvider = (provider) => {
  tokenProvider = provider;
};

export const api = axios.create({
  baseURL: `${baseURL}/api`,
  timeout: 60000,
});

api.interceptors.request.use(async (config) => {
  const token = await tokenProvider();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiErrorMessage = (error, fallback = 'Something went wrong. Please try again.') =>
  error?.response?.data?.message || error?.message || fallback;
