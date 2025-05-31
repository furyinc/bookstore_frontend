// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { getBooks, deleteBook } from '../api/books';
// import { getUsers, deleteUser } from '../api/users';
// import { getOrders } from '../api/orders';
// import BookCard from '../components/BookCard';
// import UserCard from '../components/UserCard';
// import OrderCard from '../components/OrderCard';

// const AdminPanel = () => {
//   const [activeTab, setActiveTab] = useState('books');
//   const [books, setBooks] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         if (activeTab === 'books') {
//           const data = await getBooks();
//           setBooks(data.books || []);
//         } else if (activeTab === 'users') {
//           const data = await getUsers();
//           setUsers(data.users || []);
//         } else if (activeTab === 'orders') {
//           const data = await getOrders();
//           setOrders(data.orders || []);
//         }
//       } catch (err) {
//         console.error(`Failed to fetch ${activeTab}`, err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [activeTab]);

//   const handleDelete = async (id, type) => {
//     if (!window.confirm(`Delete this ${type}?`)) return;

//     try {
//       if (type === 'book') {
//         await deleteBook(id);
//         setBooks(books.filter(b => b._id !== id));
//       } else if (type === 'user') {
//         await deleteUser(id);
//         setUsers(users.filter(u => u._id !== id));
//       }
//     } catch (err) {
//       console.error(`Failed to delete ${type}`, err);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

//       {/* Tabs */}
//       <div className="flex border-b mb-6">
//         {['books', 'users', 'orders'].map((tab) => (
//           <button
//             key={tab}
//             className={`px-4 py-2 font-medium capitalize ${
//               activeTab === tab
//                 ? 'border-b-2 border-blue-500 text-blue-600'
//                 : 'text-gray-500'
//             }`}
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Content */}
//       {loading ? (
//         <div className="text-center py-8">Loading...</div>
//       ) : (
//         <>
//           {activeTab === 'books' && (
//             <div>
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-semibold">Manage Books</h2>
//                 <Link to="/admin/add-book">
//                   <button className="bg-blue-600 text-white px-4 py-2 rounded">
//                     Add New Book
//                   </button>
//                 </Link>
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {books.map(book => (
//                   <div key={book._id} className="relative">
//                     <BookCard book={book} />
//                     <div className="flex justify-between mt-2">
//                       <button className="text-sm bg-yellow-500 text-white px-2 py-1 rounded">
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(book._id, 'book')}
//                         className="text-sm bg-red-500 text-white px-2 py-1 rounded"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {activeTab === 'users' && (
//             <div>
//               <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
//               <div className="space-y-4">
//                 {users.map(user => (
//                   <UserCard
//                     key={user._id}
//                     user={user}
//                     onDelete={() => handleDelete(user._id, 'user')}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}

//           {activeTab === 'orders' && (
//             <div>
//               <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
//               <div className="space-y-4">
//                 {orders.map(order => (
//                   <OrderCard key={order._id} order={order} />
//                 ))}
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default AdminPanel;




import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBooks, deleteBook } from '../api/books';
import { getUsers, deleteUser } from '../api/users';
import { getOrders } from '../api/orders';
import BookCard from '../components/BookCard';
import UserCard from '../components/UserCard';
import OrderCard from '../components/OrderCard';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('books');
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('🧠 Tab changed to:', activeTab); // LOGGER

    const fetchData = async () => {
      setLoading(true);
      try {
        if (activeTab === 'books') {
          const data = await getBooks();
          console.log('📚 Books response:', data); // LOGGER
          setBooks(data.books || []);
        } else if (activeTab === 'users') {
          const data = await getUsers();
          console.log('👤 Users response:', data); // LOGGER
          setUsers(data.users || []);
        } else if (activeTab === 'orders') {
          console.log('📦 Fetching orders...'); // LOGGER
          const data = await getOrders();
          console.log('📦 Orders response:', data); // LOGGER
          setOrders(data.orders || []);
        }
      } catch (err) {
        console.error(`❌ Failed to fetch ${activeTab}`, err); // LOGGER
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const handleDelete = async (id, type) => {
    if (!window.confirm(`Delete this ${type}?`)) return;

    try {
      if (type === 'book') {
        await deleteBook(id);
        setBooks(books.filter(b => b._id !== id));
        console.log(`🗑️ Book ${id} deleted`); // LOGGER
      } else if (type === 'user') {
        await deleteUser(id);
        setUsers(users.filter(u => u._id !== id));
        console.log(`🗑️ User ${id} deleted`); // LOGGER
      }
    } catch (err) {
      console.error(`❌ Failed to delete ${type}`, err); // LOGGER
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        {['books', 'users', 'orders'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 font-medium capitalize ${
              activeTab === tab
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500'
            }`}
            onClick={() => {
              console.log(`🔁 Switching to ${tab}`); // LOGGER
              setActiveTab(tab);
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <>
          {activeTab === 'books' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Manage Books</h2>
                <Link to="/admin/add-book">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    Add New Book
                  </button>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {books.map(book => (
                  <div key={book._id} className="relative">
                    <BookCard book={book} />
                    <div className="flex justify-between mt-2">
                      <button className="text-sm bg-yellow-500 text-white px-2 py-1 rounded">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(book._id, 'book')}
                        className="text-sm bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
              <div className="space-y-4">
                {users.map(user => (
                  <UserCard
                    key={user._id}
                    user={user}
                    onDelete={() => handleDelete(user._id, 'user')}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
              <div className="space-y-4">
                {orders.map(order => (
                  <OrderCard key={order._id} order={order} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminPanel;
