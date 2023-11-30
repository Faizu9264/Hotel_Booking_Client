// tokenHandler.ts
const REFRESH_TOKEN_KEY = 'refreshToken';

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const setRefreshToken = (value: string): void => {
    
  localStorage.setItem(REFRESH_TOKEN_KEY, value);
};

export const removeRefreshToken = (): void => {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const clearTokens = (): void => {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};
