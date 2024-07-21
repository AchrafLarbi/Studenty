import axios from "axios";
// Adjust the path as needed

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

const setupInterceptors = (store) => {
  api.interceptors.request.use(
    (config) => {
      const token = store.getState().auth.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default setupInterceptors;
