// src/services/adminApi.ts

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/admin';

const adminApi = {
  adminLogin: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add more admin-related API functions if needed
};

export default adminApi;
