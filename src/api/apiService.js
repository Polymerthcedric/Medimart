import axios from 'axios';

const BASE_URL = 'https://polymerthcedric.pythonanywhere.com';

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});

export const getProducts = () => api.get('/get_product_details');

export const addProduct = (productData) => {
  const data = new FormData();
  Object.keys(productData).forEach(key => {
    data.append(key, productData[key]);
  });
  return api.post('/add_product', data);
};

export const makePayment = (paymentData) => {
  const data = new FormData();
  Object.keys(paymentData).forEach(key => {
    data.append(key, paymentData[key]);
  });
  return api.post('/mpesa_payment', data);
};

export const signIn = (credentials) => {
  const data = new FormData();
  data.append('email', credentials.email);
  data.append('password', credentials.password);
  return api.post('/signin', data);
};

export const signUp = (userData) => {
  const data = new FormData();
  Object.keys(userData).forEach(key => {
    data.append(key, userData[key]);
  });
  return api.post('/signup', data);
};

export const sendChatMessage = (message) => {
  return api.post('/chat', { message });
};

export const IMAGE_BASE_URL = `${BASE_URL}/static/images/`;

export default api;
