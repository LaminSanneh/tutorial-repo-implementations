import { USER_TOKEN_KEY } from "./authService";

const authHeader = {
  accessToken: '',

  initializeToken: (accessToken: string) => {
    authHeader.accessToken = accessToken;
  },

  clearToken: () => {
    authHeader.accessToken = '';
  },

  getAuthHeader: () => {
    if (!authHeader.accessToken) {
      const token = localStorage.getItem(USER_TOKEN_KEY);

      if (token) {
        authHeader.initializeToken(token);
      }
    }

    if (authHeader.accessToken) {
      return {Authorization: 'Bearer ' + authHeader.accessToken};
    } else {
      return {};
    }
  },
};

export default authHeader;
