import { useState, useEffect } from 'react';
import { getWishlist, removeFromWishlist } from '../api/users';
import BookCard from '../components/BookCard';
import { useCart } from '../context/CartContext';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        // Mock data - replace with real API call when backend is ready
        const mockWishlist = [
          {
            _id: '1',
            title: 'Sample Wishlist Book 1',
            author: 'Author One',
            price: 12.99,
            image: '/placeholder-book.jpg'
          },
          {
            _id: '2',
            title: 'Sample Wishlist Book 2',
            author: 'Author Two',
            price: 15.99,
            image: '/placeholder-book.jpg'
          }
        ];
        setWishlist(mockWishlist);
        // Real implementation:
        // const data = await getWishlist();
        // setWishlist(data.books);
      } catch (err) {
        console.error('Failed to fetch wishlist', err);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  const handleRemove = async (bookId) => {
    try {
      // await removeFromWishlist(bookId);
      setWishlist(wishlist.filter(book => book._id !== bookId));
    } catch (err) {
      console.error('Failed to remove from wishlist', err);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading wishlist...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
      
      {wishlist.length === 0 ? (
        <div className="text-center py-8">
          <p>Your wishlist is empty.</p>
          <a 
            href="/" 
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            Browse Books
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map(book => (
            <div key={book._id} className="relative">
              <BookCard book={book} />
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => addToCart(book._id)}
                  className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleRemove(book._id)}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;