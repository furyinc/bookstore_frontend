const OrderCard = ({ order }) => {
    const orderDate = new Date(order.createdAt).toLocaleDateString();
    
    return (
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">Order #{order._id}</h3>
            <p className="text-sm text-gray-600">Placed on {orderDate}</p>
          </div>
          <span className={`px-2 py-1 text-xs rounded-full ${
            order.status === 'Completed' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {order.status}
          </span>
        </div>
        <div className="mt-3 pt-3 border-t">
          <p className="font-medium">Total: ${order.total?.toFixed(2) || '0.00'}</p>
        </div>
      </div>
    );
  };
  
  export default OrderCard;