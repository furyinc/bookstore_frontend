import { useEffect, useState } from 'react';
import { getOrders } from '../api/orders';
import OrderCard from '../components/OrderCard';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Mock data - replace with real API call when backend is ready
        const mockOrders = [
          {
            id: '1',
            date: new Date().toISOString(),
            total: 42.99,
            items: [
              { book: { title: 'Sample Book 1', price: 12.99 }, quantity: 1 },
              { book: { title: 'Sample Book 2', price: 15.00 }, quantity: 2 }
            ],
            status: 'Delivered'
          }
        ];
        setOrders(mockOrders);
        // Real implementation:
        // const data = await getOrders();
        // setOrders(data.orders);
      } catch (err) {
        console.error('Failed to fetch orders', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading orders...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-8">
          <p>You haven't placed any orders yet.</p>
          <a 
            href="/" 
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            Continue Shopping
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;