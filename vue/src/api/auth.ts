import { AxiosPromise } from "axios";
import client from "@/http/client";

export const APIAuthLogin = (params: {
  [key: string]: string;
}): AxiosPromise => {
  return client.post("/api/auth/login", params);
};

export const APIAuthRegister = (params: {
  [key: string]: string;
}): AxiosPromise => {
  return client.post("/api/auth/register", params);
};

export const APIAuthLogout = (): AxiosPromise => {
  return client.post("/api/auth/logout");
};

export const APIAuthRefreshToken = (): AxiosPromise => {
  return client.post("/api/auth/refresh-token");
};

export const APIAuthForgotPassword = (params: {
  [key: string]: string;
}): AxiosPromise => {
  return client.post("/api/auth/forgot-password", params);
};

export const APIAuthResetPassword = (
  token: string,
  params: {
    [key: string]: string;
  }
): AxiosPromise => {
  return client.post(`/api/auth/reset-password/${token}`, params);
};
