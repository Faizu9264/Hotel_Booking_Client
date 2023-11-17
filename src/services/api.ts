// src/services/api.ts

const API_BASE_URL = 'http://localhost:5000/user';

let userData: any = {}; 

const api = {
  sendOTP: async (email: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      return response.json();
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  verifyOTP: async (otp: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userData.email, otp }), 
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      return response.json();
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  completeSignup: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/complete-signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), 
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      return response.json();
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  // Setter function to update user data during signup
  setUserData: (data: any) => {
    userData = { ...userData, ...data };
  },

  login: async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      return response.json();
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};


export default api;
