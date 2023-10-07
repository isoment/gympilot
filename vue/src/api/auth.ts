import axios, { AxiosPromise } from "axios";

/**
 *  These are the api calls related to authentication. Some of them take
 *  an object of parameters and return an AxiosPromise that we can handle.
 */

const baseURL = process.env.VUE_APP_API_URL;

/* DEPRECATED */
// export const APIAuthLoadUser = (): AxiosPromise => {
//   return axios.get(`${baseURL}/api/auth/user`);
// };

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
