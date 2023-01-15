import axios, { AxiosPromise } from "axios";

/**
 *  These are the api calls related to authentication. Some of them take
 *  an object of parameters and return an AxiosPromise that we can handle.
 */

export const APIAuthCsrf = (): AxiosPromise => {
  return axios.get(`http://localhost/sanctum/csrf-cookie`);
};

export const APIAuthLoadUser = (): AxiosPromise => {
  return axios.get(`http://localhost/api/user`);
};

export const APIAuthLogin = (params: {
  [key: string]: string;
}): AxiosPromise => {
  return axios.post(`http://localhost/api/login`, params);
};

export const APIAuthRegister = (params: {
  [key: string]: string;
}): AxiosPromise => {
  return axios.post(`http://localhost/api/register`, params);
};

export const APIAuthLogout = (): AxiosPromise => {
  return axios.post(`http://localhost/api/logout`);
};
