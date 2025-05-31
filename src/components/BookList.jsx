import { useEffect, useState } from 'react';
import BookCard from './BookCard';
import { useCart } from '../context/CartContext';
import { getBooks } from '../api/books';

const BookList = () => {
  const { addToCart } = useCart();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks({
          limit: 8,
          sort: '-createdAt'
        });
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Clear success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleAddToCart = (book) => {
    addToCart(book);
    setSuccessMessage(`"${book.title}" added to cart!`);
  };

  if (loading) return <div>Loading books...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!books.length) return <div>No books available.</div>;

  return (
    <div>
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {successMessage}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard 
            key={book._id} 
            book={book} 
            addToCart={() => handleAddToCart(book)} 
          />
        ))}
      </div>
    </div>
  );
};

export default BookList;