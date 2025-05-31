import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getBooks } from '../api/books';
import BookList from '../components/BookList';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks({ limit: 8, sort: '-createdAt' });
        setBooks(data.books);
      } catch (err) {
        console.error('Failed to fetch books', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome to BookStore</h1>

      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-yellow-100 to-pink-100 p-6 rounded-lg shadow mb-8 text-center">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Your Next Favorite Book Awaits</h2>
        <p className="text-gray-600 mb-4">
          Dive into a curated selection of timeless classics, thrilling adventures, and inspiring stories.
        </p>
        <p className="text-gray-700 italic">Browse our collection and start your next reading journey.</p>
      </div>

      {/* Featured Books section */}
      <h2 className="text-2xl font-bold mb-6">Featured Books</h2>
      {loading ? (
        <div className="text-center py-8">Loading books...</div>
      ) : (
        <BookList books={books} />
      )}
    </div>
  );
};

export default Home;
