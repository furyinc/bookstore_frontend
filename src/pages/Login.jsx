import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login: authLogin, user, loading: authLoading, api } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user?.token) {
      navigate(user.isVerified ? '/profile' : '/verify-email');
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Attempting login to:', api.defaults.baseURL);
      
      // 1. Make login request
      const res = await api.post('/users/login', { email, password });
      console.log('Login response:', res.data);

      if (!res.data.token || !res.data.user) {
        throw new Error('Invalid response format from server');
      }

      // 2. Process authentication
      await authLogin(res.data.token, res.data.user);
      
      // 3. Verify the token was properly set
      if (!localStorage.getItem('token')) {
        throw new Error('Authentication token not stored');
      }

      // 4. Redirect based on verification status
      if (res.data.user?.isVerified) {
        navigate('/profile', { replace: true });
      } else {
        localStorage.setItem('pendingEmail', email);
        navigate('/verify-email', { replace: true });
      }

    } catch (err) {
      console.error('Login error details:', {
        message: err.message,
        code: err.code,
        response: err.response?.data,
        config: err.config,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
      });

      let errorMessage = 'An unexpected error occurred. Please try again.';
      
      if (err.code === 'ERR_NETWORK') {
        errorMessage = `Network error: Could not connect to server at ${api.defaults.baseURL}`;
      } else if (err.response) {
        switch (err.response.status) {
          case 400:
            errorMessage = 'Invalid request format. Please check your input.';
            break;
          case 401:
            errorMessage = 'Invalid email or password.';
            break;
          case 403:
            errorMessage = err.response.data.message || 'Account not verified. Please check your email.';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later.';
            break;
          default:
            errorMessage = err.response.data?.message || errorMessage;
        }
      } else if (err.message.includes('token not stored')) {
        errorMessage = 'Authentication failed. Please try again.';
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-900 via-indigo-800 to-purple-900 flex items-center justify-center p-4">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl rounded-3xl p-8 sm:p-10 w-full max-w-md text-white animate-fadeIn">
        <h2 className="text-3xl font-bold text-center mb-6">Welcome Back 👋</h2>

        {error && (
          <div className="bg-red-500/20 border border-red-400 text-red-100 px-4 py-3 rounded-lg mb-6">
            <p className="font-medium">{error}</p>
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-2 text-xs opacity-75">
                API Endpoint: {api.defaults.baseURL}/users/login
                {error.includes('Network error') && (
                  <div className="mt-1">
                    <p>Debug info:</p>
                    <ul className="list-disc list-inside pl-3">
                      <li>Check if backend is running</li>
                      <li>Verify CORS settings</li>
                      <li>Test endpoint with Postman/curl</li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="••••••••"
              minLength={6}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-white/20 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-indigo-300 hover:text-indigo-200">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Signing in...
              </span>
            ) : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-300 hover:text-indigo-200 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;








// import { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login: authLogin, user, loading: authLoading, api } = useAuth();
//   const navigate = useNavigate();

//   // Redirect if already logged in
//   useEffect(() => {
//     if (!authLoading && user?.token) {
//       navigate(user.isVerified ? '/profile' : '/verify-email');
//     }
//   }, [user, authLoading, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       console.log('Attempting login to:', api.defaults.baseURL);
      
//       const res = await api.post('/users/login', { email, password });
//       console.log('Login response:', res.data);

//       if (!res.data.token || !res.data.user) {
//         throw new Error('Invalid response format from server');
//       }

//       const loginSuccess = await authLogin(res.data.token, res.data.user);
//       if (!loginSuccess) {
//         throw new Error('Failed to process login');
//       }

//       // Redirect is handled in authLogin
//     } catch (err) {
//       console.error('Login error details:', {
//         message: err.message,
//         code: err.code,
//         response: err.response?.data,
//         config: err.config,
//         stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
//       });

//       if (err.code === 'ERR_NETWORK') {
//         setError(`Network error: Could not connect to server at ${api.defaults.baseURL}`);
//       } else if (err.response) {
//         // Handle HTTP error responses
//         switch (err.response.status) {
//           case 400:
//             setError('Invalid request format. Please check your input.');
//             break;
//           case 401:
//             setError('Invalid email or password.');
//             break;
//           case 403:
//             setError(err.response.data.message || 'Account not verified. Please check your email.');
//             break;
//           default:
//             setError(err.response.data.message || 'Login failed. Please try again.');
//         }
//       } else {
//         setError('An unexpected error occurred. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-blue-900 via-indigo-800 to-purple-900 flex items-center justify-center p-4">
//       <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl rounded-3xl p-8 sm:p-10 w-full max-w-md text-white animate-fadeIn">
//         <h2 className="text-3xl font-bold text-center mb-6">Welcome Back 👋</h2>

//         {error && (
//           <div className="bg-red-500/20 border border-red-400 text-red-100 px-4 py-3 rounded-lg mb-6">
//             <p className="font-medium">{error}</p>
//             {process.env.NODE_ENV === 'development' && (
//               <div className="mt-2 text-xs opacity-75">
//                 API Endpoint: {api.defaults.baseURL}/users/login
//               </div>
//             )}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Email Input */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
//             <input
//               id="email"
//               type="email"
//               autoComplete="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//               placeholder="you@example.com"
//             />
//           </div>

//           {/* Password Input */}
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
//             <input
//               id="password"
//               type="password"
//               autoComplete="current-password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//               placeholder="••••••••"
//               minLength={6}
//             />
//           </div>

//           {/* Remember Me & Forgot Password */}
//           <div className="flex items-center justify-between text-sm">
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 className="h-4 w-4 rounded border-white/20 text-indigo-600 focus:ring-indigo-500"
//               />
//               <span className="ml-2">Remember me</span>
//             </label>
//             <Link to="/forgot-password" className="text-indigo-300 hover:text-indigo-200">
//               Forgot password?
//             </Link>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-3 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition ${
//               loading ? 'opacity-75 cursor-not-allowed' : ''
//             }`}
//           >
//             {loading ? (
//               <span className="flex items-center justify-center">
//                 <svg
//                   className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
//                 </svg>
//                 Signing in...
//               </span>
//             ) : (
//               'Sign in'
//             )}
//           </button>
//         </form>

//         {/* Sign Up Link */}
//         <div className="mt-6 text-center text-sm">
//           <p>
//             Don't have an account?{' '}
//             <Link to="/register" className="text-indigo-300 hover:text-indigo-200 font-medium">
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;