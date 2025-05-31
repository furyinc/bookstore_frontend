import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById } from '../api/books';
import { useCart } from '../context/CartContext';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching book with ID:', id); // Debug log
        
        const data = await getBookById(id);
        console.log('Received data:', data); // Debug log
        
        if (!data) {
          throw new Error('Book data not found');
        }
        
        setBook(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message || 'Failed to load book');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBook();
    } else {
      setError('No book ID provided');
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Loading book details...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  if (!book) {
    return <div className="text-center py-8">Book not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <img
            src={book.images && book.images.length > 0 ? book.images[0].url : '/placeholder-book.jpg'}
            alt={book.title}
            className="w-full rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-gray-600 text-lg mb-4">{book.author}</p>
          <div className="mb-6">
            <span className="text-2xl font-bold text-gray-800">
              ${book.price.toFixed(2)}
            </span>
            {book.stock > 0 ? (
              <span className="ml-2 text-green-600">In Stock</span>
            ) : (
              <span className="ml-2 text-red-600">Out of Stock</span>
            )}
          </div>
          <p className="text-gray-700 mb-6">{book.description}</p>
          <div className="flex items-center gap-4 mb-6">
            <input
              type="number"
              min="1"
              max="10"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Math.min(10, parseInt(e.target.value))))}
              className="border rounded px-3 py-2 w-16 text-center"
            />
            <button
              onClick={() => addToCart(book._id, quantity)}
              disabled={book.stock <= 0}
              className={`px-6 py-2 rounded font-medium ${
                book.stock > 0
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Add to Cart
            </button>
          </div>
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Details</h3>
            <ul className="text-sm text-gray-600">
              <li>ISBN: {book.isbn}</li>
              <li>Publisher: {book.publisher}</li>
              <li>Pages: {book.pages}</li>
              <li>Published: {new Date(book.publishedDate).toLocaleDateString()}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;