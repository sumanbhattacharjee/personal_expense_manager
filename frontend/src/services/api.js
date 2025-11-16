import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

export const api = {
  // Category endpoints
  categories: {
    getAll: () => axios.get(`${API_BASE}/categories`),
    getById: (id) => axios.get(`${API_BASE}/categories/${id}`),
    create: (data) => axios.post(`${API_BASE}/categories`, data),
    update: (id, data) => axios.put(`${API_BASE}/categories/${id}`, data),
    delete: (id) => axios.delete(`${API_BASE}/categories/${id}`),
  },
  // Expense endpoints
  expenses: {
    getAll: () => axios.get(`${API_BASE}/expenses`),
    getById: (id) => axios.get(`${API_BASE}/expenses/${id}`),
    create: (data) => axios.post(`${API_BASE}/expenses`, data),
    update: (id, data) => axios.put(`${API_BASE}/expenses/${id}`, data),
    delete: (id) => axios.delete(`${API_BASE}/expenses/${id}`),
  },
};
