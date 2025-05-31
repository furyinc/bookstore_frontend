import { useCart } from '../context/CartContext';
import OrderSummary from '../components/OrderSummary';

const Checkout = () => {
  const { cart } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Shipping/Billing Form */}
        <div className="lg:w-2/3">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            {/* Form fields would go here */}
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full p-2 border rounded"
              />
              <input 
                type="text" 
                placeholder="Address" 
                className="w-full p-2 border rounded"
              />
              {/* More form fields... */}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            {/* Payment options would go here */}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <OrderSummary />
          <button 
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded mt-4"
            onClick={() => alert('Order placed! (Backend not connected)')}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;