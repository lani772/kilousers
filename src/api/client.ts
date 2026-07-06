import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.luma-smarthome.io/v1", // Placeholder for Rust backend
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // Logic to add token from store if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors (e.g., 401 logout)
    return Promise.reject(error);
  }
);

export default apiClient;
