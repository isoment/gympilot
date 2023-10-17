import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import store from "../store";

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.withCredentials = true;
// axios.defaults.headers.common["Content-Type"] = "application/json";
// axios.defaults.headers.common["Accept"] = "application/json";

const client = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

client.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Include the access token in the Authorization header
    const accessToken = store.state.accessToken;
    if (accessToken) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response: AxiosResponse<any, any>): AxiosResponse<any, any> => {
    return response;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default client;
