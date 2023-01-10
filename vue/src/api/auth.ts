import axios, { AxiosPromise } from "axios";

/**
 *  These are the api calls related to authentication. Some of them take
 *  an object of parameters and return an AxiosPromise that we can handle.
 */

export const sanctumCsrf = (): AxiosPromise => {
  return axios.get(`http://localhost/sanctum/csrf-cookie`);
};

export const login = (params: { [key: string]: string }): AxiosPromise => {
  return axios.post(`http://localhost/api/login`, params);
};

export const register = (params: { [key: string]: string }): AxiosPromise => {
  return axios.post(`http://localhost/api/register`, params);
};
