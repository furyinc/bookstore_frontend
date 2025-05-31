import api from '../utils/api';


export const getBooks = async (params = {}) => {
  const { data } = await api.get('/books', { params });
  return data;
};

export const getBookById = async (id) => {
  const { data } = await api.get(`/books/${id}`);
  return data;
};

export const searchBooks = async (query) => {
  const { data } = await api.get('/books/search', { params: { query } });
  return data;
};

export const createBook = async (bookData) => {
  const { data } = await api.post('/books', bookData);
  return data;
};

export const updateBook = async (id, bookData) => {
  const { data } = await api.put(`/books/${id}`, bookData);
  return data;
};

export const deleteBook = async (id) => {
  const { data } = await api.delete(`/books/${id}`);
  return data;
};


