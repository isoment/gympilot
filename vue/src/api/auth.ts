import { AxiosPromise } from "axios";
import client from "@/http/client";

export const APIAuthLogin = (params: {
  [key: string]: string;
}): AxiosPromise => {
  return client.post(`/api/auth/login`, params);
};

export const APIAuthRegister = (params: {
  [key: string]: string;
}): AxiosPromise => {
  return client.post(`/api/auth/register`, params);
};

export const APIAuthLogout = (): AxiosPromise => {
  return client.post(`/api/auth/logout`);
};

/* DEPRECATED */
// export const APIAuthLoadUser = (): AxiosPromise => {
//   return axios.get(`${baseURL}/api/auth/user`);
// };
