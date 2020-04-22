import axios from 'axios';

import { API_URL } from './../services/apiUrls';
import { GetHeaders } from './../credentials/access_headers';

export const fetchProductData = (url) => {
  const id = url.split('/')[2];
  // return axios
  //   .get(`${API_URL}/products/${id}`, GetHeaders())
  //   .then(data => {
  //     return data;
  //   })
  //   .catch(error => {});

  // const urlObject = url || 'sick-day-box'
  const apiUrl1 = `${API_URL}/products/${id}`;
  const apiUrl2 = `${API_URL}/carts`;
  const promise1 = axios.get(apiUrl1, GetHeaders());
  const promise2 = axios.get(apiUrl2, GetHeaders());

  return Promise.all([promise1, promise2]).then((values) => {
    return values;
  });
};

export const fetchHomeData = () => {
  const urlObject = 'sick-day-box';
  const apiUrl1 = `${API_URL}/products/${urlObject}`;
  const apiUrl2 = `${API_URL}/carts`;
  const promise1 = axios.get(apiUrl1, GetHeaders());
  const promise2 = axios.get(apiUrl2, GetHeaders());
  return Promise.all([promise1, promise2]).then((values) => {
    return values;
  });
};
