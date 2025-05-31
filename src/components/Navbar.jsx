// import { Link, NavLink } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { useCart } from '../context/CartContext';
// import { ShoppingCartIcon } from '@heroicons/react/24/outline';

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const { cartCount } = useCart();

//   const navLinkClass = ({ isActive }) => 
//     `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//       isActive 
//         ? 'bg-blue-100 text-blue-700' 
//         : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
//     }`;

//   return (
//     <nav className="bg-white shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           {/* Left side - Logo */}
//           <div className="flex items-center">
//             <Link 
//               to="/" 
//               className="text-xl font-bold text-blue-600 hover:text-blue-700 flex-shrink-0"
//             >
//               BookStore
//             </Link>
//           </div>

//           {/* Center - Navigation links */}
//           <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-1">
//             <NavLink to="/" className={navLinkClass}>
//               Home
//             </NavLink>
//             <NavLink to="/books" className={navLinkClass}>
//               Books
//             </NavLink>
            
//             {user?.isAdmin && (
//               <NavLink to="/admin" className={navLinkClass}>
//                 Admin
//               </NavLink>
//             )}
//           </div>

//           {/* Right side - Auth/Cart */}
//           <div className="flex items-center space-x-2">
//             {user ? (
//               <>
//                 <NavLink to="/profile" className={navLinkClass}>
//                   Profile
//                 </NavLink>
//                 <button
//                   onClick={logout}
//                   className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <NavLink to="/login" className={navLinkClass}>
//                   Login
//                 </NavLink>
//                 <NavLink 
//                   to="/register" 
//                   className="px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
//                 >
//                   Register
//                 </NavLink>
//               </>
//             )}

//             {/* Cart Icon */}
//             <Link
//               to="/cart"
//               className="p-2 rounded-full text-gray-700 hover:text-blue-600 hover:bg-gray-100 relative transition-colors"
//               aria-label="Shopping cart"
//             >
//               <ShoppingCartIcon className="h-6 w-6" />
//               {cartCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();

  const navLinkClass = ({ isActive }) => 
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive 
        ? 'bg-blue-100 text-blue-700' 
        : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
    }`;

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-xl font-bold text-blue-600 hover:text-blue-700 flex-shrink-0"
            >
              BookStore
            </Link>
          </div>

          {/* Center - Navigation links */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-1">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/books" className={navLinkClass}>
              Books
            </NavLink>
            
            {user?.isAdmin && (
              <NavLink to="/admin" className={navLinkClass}>
                Admin
              </NavLink>
            )}
          </div>

          {/* Right side - Auth/Cart */}
          <div className="flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <NavLink 
                  to="/profile" 
                  className={navLinkClass}
                >
                  {user?.name || 'Profile'}
                </NavLink>
                <button
                  onClick={logout}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={navLinkClass}>
                  Login
                </NavLink>
                <NavLink 
                  to="/register" 
                  className="px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                >
                  Register
                </NavLink>
              </>
            )}

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="p-2 rounded-full text-gray-700 hover:text-blue-600 hover:bg-gray-100 relative transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;