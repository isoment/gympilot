import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import store from "../store";
import { LOGOUT_USER, REFRESH_TOKEN } from "@/store/constants";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.withCredentials = true;

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
  async (error) => {
    const originalRequest = error.config;
    const { url } = error.config;

    // If a 401 is returned that means the access token is expired and we need to attempt
    // a refresh. If the refresh returns a 401 response as well we want to log the user out.
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // We want to logout the user and display a modal since the refresh token has expired.
      if (url === "/api/auth/refresh-token") {
        console.log("Refresh Token Expired");
        store.dispatch(LOGOUT_USER);
      } else {
        try {
          store.dispatch(REFRESH_TOKEN);
          // Retry the original request after refreshing the token
          const newAccessToken = store.state.accessToken;
          if (newAccessToken) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios(originalRequest);
          }
        } catch (error) {
          console.log("Error getting new access token");
          store.dispatch(LOGOUT_USER);
        }
      }
    }

    Promise.reject(error);
  }
);

export default client;
