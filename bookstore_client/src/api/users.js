import api from '../utils/api';

export const login = async (email, password) => {
  const { data } = await api.post('/users/login', { email, password });
  return data;
};

export const register = async (userData) => {
  const { data } = await api.post('/users/register', userData);
  return data;
};

export const getWishlist = async () => {
  const { data } = await api.get('/users/wishlist');
  return data;
};

export const addToWishlist = async (bookId) => {
  const { data } = await api.post('/users/wishlist', { bookId });
  return data;
};

export const removeFromWishlist = async (bookId) => {
  const { data } = await api.delete(`/users/wishlist/${bookId}`);
  return data;
};



export const getUserProfile = async () => {
  const { data } = await api.get('/users/me');
  return data;
};

export const updateUserProfile = async (profileData) => {
  const { data } = await api.put('/users/me', profileData);
  return data;
};



export const getUsers = async () => {
  const { data } = await api.get('/users');
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await api.delete(`/users/${id}`);
  return data;
};