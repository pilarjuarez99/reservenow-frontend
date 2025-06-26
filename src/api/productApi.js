import axios from 'axios';

const API_URL = 'http://localhost:8080/api/products';

export const getProducts = (page = 0, size = 10) =>
  axios.get(`${API_URL}?page=${page}&size=${size}`);

export const getProductById = (id) =>
  axios.get(`${API_URL}/${id}`);

export const createProduct = (productData) =>
  axios.post(API_URL, productData);

export const deleteProduct = (id) =>
  axios.delete(`${API_URL}/${id}`);
