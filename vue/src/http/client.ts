import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import store from "../store";
import router from "@/router";
import { LOGOUT_USER, REFRESH_TOKEN } from "@/store/constants";

const client = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    common: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  },
  withCredentials: true,
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
    const originalRequest = error.config;
    const { url } = error.config;

    // If a 401 is returned that means the access token is expired and we need to attempt
    // a refresh. If the refresh returns a 401 response as well we want to log the user out.
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // If the refresh token has expired we want to logout the user and redirect to the
      // login. If not we want to get a new access token and retry the request.
      if (url === "/api/auth/refresh-token") {
        console.log("Refresh Token Expired");
        try {
          store.dispatch(LOGOUT_USER);
        } finally {
          router.push({ name: "login" });
        }
      } else {
        try {
          store.dispatch(REFRESH_TOKEN);
          const newAccessToken = store.state.accessToken;
          if (newAccessToken) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios(originalRequest);
          }
        } catch (error) {
          store.dispatch(LOGOUT_USER);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default client;
