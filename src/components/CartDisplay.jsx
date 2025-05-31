import { useState } from 'react';
import { useCart } from '../context/CartContext';

const CartDisplay = () => {
  const { cart, cartCount, cartTotal, clearCart } = useCart();
  const [isClearing, setIsClearing] = useState(false);

  // Filter and validate cart items
  const validCartItems = cart.filter(item => (
    item?.book?._id &&
    typeof item.quantity === 'number' &&
    item.quantity > 0
  ));

  const handleClearCart = async () => {
    setIsClearing(true);
    await clearCart();
    setIsClearing(false);
  };

  // Log cart items for debugging
  console.log('Cart items in CartDisplay:', validCartItems);

  if (cartCount === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        <div className="bg-gray-50 p-8 text-center rounded-lg">
          <p className="text-gray-600">Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Your Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
        </h2>
        <button
          onClick={handleClearCart}
          disabled={isClearing}
          className={`text-red-500 hover:text-red-700 text-sm ${
            isClearing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isClearing ? 'Clearing...' : 'Clear Cart'}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow divide-y">
        {validCartItems.map((item) => {
          // Log book data for each item
          console.log(`Book data for ${item.book.title}:`, item.book);

          return (
            <div
              key={`${item.book._id}-${item.quantity}`}
              className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-20 flex-shrink-0">
                  <img
                    src={
                      item.book.images && item.book.images.length > 0
                        ? item.book.images[0].url
                        : '/placeholder-book.jpg'
                    }
                    alt={item.book.title || 'Book cover'}
                    className="w-full h-auto rounded-lg shadow-md"
                    onError={(e) => {
                      console.error(`Failed to load image for ${item.book.title}`);
                      e.target.src = '/placeholder-book.jpg';
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-medium line-clamp-1">{item.book.title}</h3>
                  <p className="text-gray-600 text-sm">
                    ${item.book.price?.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total:</span>
          <span className="text-xl font-bold">${cartTotal.toFixed(2)}</span>
        </div>
        <button
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartDisplay;