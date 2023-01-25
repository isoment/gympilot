import axios, { AxiosPromise } from "axios";

/**
 *  These are the api calls related to authentication. Some of them take
 *  an object of parameters and return an AxiosPromise that we can handle.
 */

const baseURL = process.env.VUE_APP_API_URL;

export const APIAuthCsrf = (): AxiosPromise => {
  return axios.get(`${baseURL}/sanctum/csrf-cookie`);
};

export const APIAuthLoadUser = (): AxiosPromise => {
  return axios.get(`${baseURL}/api/user`);
};

export const APIAuthLogin = (params: {
  [key: string]: string;
}): AxiosPromise => {
  return axios.post(`${baseURL}/api/login`, params);
};

export const APIAuthRegister = (params: {
  [key: string]: string;
}): AxiosPromise => {
  return axios.post(`${baseURL}/api/register`, params);
};

export const APIAuthLogout = (): AxiosPromise => {
  return axios.post(`${baseURL}/api/logout`);
};
