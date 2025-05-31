import { Link } from 'react-router-dom';
import { useState } from 'react';

const BookCard = ({ book, addToCart }) => {
  const [imageError, setImageError] = useState(false);
  const [isAdding, setIsAdding] = useState(false); // Loading state for button
  
  // Determine the image source with fallbacks
  const getImageSource = () => {
    // 1. Check for primary image in images array
    if (book.images?.length > 0) {
      const primaryImage = book.images.find(img => img.isPrimary) || book.images[0];
      return primaryImage.url;
    }
    
    // 2. Fallback to imageUrl if exists
    if (book.imageUrl) return book.imageUrl;
    
    // 3. Default placeholder
    return '/default-book.jpg';
  };

  const imageSrc = imageError ? '/default-book.jpg' : getImageSource();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      // Pass the entire book object instead of just ID for better cart functionality
      await addToCart(book);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      <Link to={`/books/${book._id}`} className="relative block">
        <div className="aspect-w-3 aspect-h-4 w-full overflow-hidden">
          <img
            src={imageSrc}
            alt={`Cover of ${book.title}`}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
            loading="lazy"
          />
          {/* Fallback indicator */}
          {imageError && (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 text-sm">Image not available</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/books/${book._id}`}>
          <h3 className="text-lg font-semibold mb-1 hover:text-blue-600 transition-colors line-clamp-2" title={book.title}>
            {book.title}
          </h3>
        </Link>

        <div className="flex justify-between items-center mt-3">
          <span className="font-bold text-gray-800">
            ${book.price?.toFixed(2) || '0.00'}
          </span>
          
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`${isAdding ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white px-3 py-1 rounded text-sm transition-colors`}
            aria-label={`Add ${book.title} to cart`}
          >
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;