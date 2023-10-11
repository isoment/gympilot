import axios, { AxiosPromise } from "axios";

const baseURL = process.env.VUE_APP_API_URL;

export const APIAuthLogin = (params: {
  [key: string]: string;
}): AxiosPromise => {
  return axios.post(`${baseURL}/api/auth/login`, params);
};

export const APIAuthRegister = (params: {
  [key: string]: string;
}): AxiosPromise => {
  return axios.post(`${baseURL}/api/auth/register`, params);
};

export const APIAuthLogout = (): AxiosPromise => {
  return axios.post(`${baseURL}/api/auth/logout`);
};

/* DEPRECATED */
// export const APIAuthLoadUser = (): AxiosPromise => {
//   return axios.get(`${baseURL}/api/auth/user`);
// };
