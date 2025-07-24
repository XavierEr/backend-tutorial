import 'dotenv/config';

import axios from 'axios';

export const httpClient = axios.create({
  baseURL: `${process.env.GRAPH_API_ENDPOINT}/v1.0`,
  // withCredentials: true,
  // xsrfCookieName: 'csrftoken',
  // xsrfHeaderName: 'X-CSRFToken'
});

httpClient.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});