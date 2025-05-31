import { useState } from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, clearCart, updateQuantity, removeFromCart } = useCart();
  const [isClearing, setIsClearing] = useState(false);

  // Filter and validate cart items
  const validCartItems = cart.filter(item => (
    item?.book?._id && 
    typeof item.quantity === 'number' &&
    item.quantity > 0
  ));

  // Calculate totals
  const itemCount = validCartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = validCartItems.reduce(
    (sum, item) => sum + (item.book.price * item.quantity), 
    0
  );

  const handleClearCart = async () => {
    setIsClearing(true);
    await clearCart();
    setIsClearing(false);
  };

  if (itemCount === 0) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
          <div className="bg-gray-50 p-8 text-center rounded-lg">
            <p className="text-gray-600">Your cart is empty</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Your Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
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
          {validCartItems.map((item) => (
            <div 
              key={`${item.book._id}-${item.quantity}`} 
              className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-20 flex-shrink-0">
                  <img
                    src={item.book.images && item.book.images.length > 0 ? item.book.images[0].url : '/placeholder-book.jpg'}
                    alt={item.book.title || 'Book cover'}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                </div>
                <div>
                  <h3 className="font-medium line-clamp-1">{item.book.title}</h3>
                  <p className="text-gray-600 text-sm">
                    ${item.book.price?.toFixed(2)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <select
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.book._id, parseInt(e.target.value))}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {[...Array(10).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => removeFromCart(item.book._id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Subtotal:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Shipping:</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between items-center border-t pt-4">
            <span className="font-semibold text-lg">Total:</span>
            <span className="text-xl font-bold">${cartTotal.toFixed(2)}</span>
          </div>
          <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;