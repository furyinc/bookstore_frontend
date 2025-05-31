import api from '../utils/api';

export const createOrder = async (orderData) => {
  const { data } = await api.post('/orders', orderData);
  return data;
};

export const getOrders = async () => {
  console.log('🛰️ API Request: GET /orders'); // Add this
  const { data } = await api.get('/orders');
  return data;
};

export const getOrderById = async (id) => {
  const { data } = await api.get(`/orders/${id}`);
  return data;
};