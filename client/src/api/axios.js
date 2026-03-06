import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://moonflex-backend.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor — attach JWT token
API.interceptors.request.use(
    (config) => {
        const tokens = JSON.parse(localStorage.getItem('tokens'));
        if (tokens?.access) {
            config.headers.Authorization = `Bearer ${tokens.access}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor — refresh token on 401
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const tokens = JSON.parse(localStorage.getItem('tokens'));
                if (tokens?.refresh) {
                    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://moonflex-backend.onrender.com/api';
                    const { data } = await axios.post(
                        `${baseUrl}/auth/token/refresh/`,
                        { refresh: tokens.refresh }
                    );

                    const newTokens = { ...tokens, access: data.access };
                    localStorage.setItem('tokens', JSON.stringify(newTokens));
                    originalRequest.headers.Authorization = `Bearer ${data.access}`;
                    return API(originalRequest);
                }
            } catch (refreshError) {
                localStorage.removeItem('tokens');
                localStorage.removeItem('user');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default API;
