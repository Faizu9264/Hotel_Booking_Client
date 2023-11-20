import axios from 'axios';

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
        credentials: 'include',
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
        credentials: 'include',
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
        credentials: 'include',
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
        credentials: 'include',
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

  googleLogin: async (email: string, username: string, token: string, isGoogle: boolean) => {
    try {
      const response = await fetch(`${API_BASE_URL}/google-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, username, token, isGoogle }),
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

  resendOTP: async (email: string): Promise<any> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/resend-otp`, { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default api;
