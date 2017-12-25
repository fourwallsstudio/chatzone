export const setAuthTokenOnLocalStorage = authToken => {
  window.localStorage.setItem('authToken', authToken);
}

export const getAuthTokenFromLocalStorage = () => {
  return window.localStorage.getItem('authToken');
}

export const removeAuthTokenFromLocalStorage = () => {
  window.localStorage.removeItem('authToken');
}

export const authHeader = () => `Bearer ${getAuthTokenFromLocalStorage()}`;

