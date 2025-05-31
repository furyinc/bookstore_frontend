import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from './AuthContext'; // ✅ Import AuthContext
// const [loading, setLoading] = useState(true);

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const { isAuthenticated } = useAuth(); // ✅ Use AuthContext

  const fetchCart = async () => {
    try {
      const { data } = await api.get('/cart');
      console.log('Fetched Cart:', data); // 👀 See what's coming
      setCart(data.items);
      setCartCount(data.items.reduce((sum, item) => sum + item.quantity, 0));
    } catch (err) {
      if (err.response?.status === 404) {
        setCart([]);
        setCartCount(0);
      } else {
        console.error('Failed to fetch cart', err);
      }
    }
  };


   const addToCart = async (bookId, quantity = 1) => {
    try {
      await api.post('/cart', { bookId, quantity });
      await fetchCart();
    } catch (err) {
      console.error('Failed to add to cart', err);
    }
  };

  const removeFromCart = async (bookId) => {
    try {
      await api.delete(`/cart/${bookId}`);
      await fetchCart();
    } catch (err) {
      console.error('Failed to remove from cart', err);
    }
  };

  const updateQuantity = async (bookId, quantity) => {
    try {
      await api.put(`/cart/${bookId}`, { quantity });
      await fetchCart();
    } catch (err) {
      console.error('Failed to update quantity', err);
    }
  };

  const clearCart = async () => {
    try {
      await api.delete('/cart');
      await fetchCart();
    } catch (err) {
      console.error('Failed to clear cart', err);
    }
  };

  
  // ✅ Only fetch cart when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);










// // src/context/CartContext.js ----- 🔴No Auth
// import { createContext, useContext, useState, useEffect } from 'react';

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cart, setCart] = useState([]);

//   // Load from localStorage
//   useEffect(() => {
//     const saved = localStorage.getItem('cart');
//     if (saved) setCart(JSON.parse(saved));
//   }, []);

//   // Save to localStorage
//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart]);

//   const addToCart = (book) => {
//     setCart(prev => {
//       const existing = prev.find(item => item.book._id === book._id);
//       if (existing) {
//         return prev.map(item => 
//           item.book._id === book._id 
//             ? { ...item, quantity: item.quantity + 1 } 
//             : item
//         );
//       }
//       return [...prev, { book, quantity: 1 }];
//     });
//   };

//   const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
//   const cartTotal = cart.reduce((sum, item) => sum + (item.book.price * item.quantity), 0);

//   return (
//     <CartContext.Provider value={{ 
//       cart, 
//       cartCount,
//       cartTotal,
//       addToCart,
//       removeFromCart: (id) => setCart(prev => prev.filter(item => item.book._id !== id)),
//       clearCart: () => setCart([])
//     }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => useContext(CartContext);