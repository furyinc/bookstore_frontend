import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const VerifyEmail = () => {
  const [code, setCode] = useState('');
  const [email, setEmail] = useState(localStorage.getItem('pendingEmail') || '');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    console.log("Sending verification request to:", `${API_URL}/users/verify-email`);
    console.log("Payload:", { email, code });

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };

      // Only add withCredentials if your backend is properly configured for CORS with credentials
      if (import.meta.env.VITE_REQUIRE_CREDENTIALS === 'true') {
        config.withCredentials = true;
      }

      const res = await axios.post(
        `${API_URL}/users/verify-email`,
        { email, code },
        config
      );

      console.log("Verification response:", res.data);
      
      if (res.data.success) {
        setMessage(res.data.message || 'Email verified successfully');
        if (res.data.token && res.data.user) {
          login(res.data.token, res.data.user);
        }
        localStorage.removeItem('pendingEmail');
        setTimeout(() => navigate('/'), 1500);
      } else {
        setError(res.data.message || 'Verification failed');
      }
    } catch (err) {
      console.error("Verification error:", err);
      
      // Handle CORS-specific errors
      if (err.message.includes('CORS') || err.code === 'ERR_NETWORK') {
        setError('Connection error. Please check your network or try again later.');
      } else {
        const serverError = err.response?.data;
        setError(
          serverError?.message || 
          serverError?.error || 
          'Verification failed. Please try again.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-900 via-indigo-800 to-purple-900 flex items-center justify-center">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl rounded-3xl p-10 w-full max-w-md text-white animate-fadeIn">
        <h2 className="text-3xl font-bold text-center mb-6">Verify Your Email</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="code" className="block text-sm font-medium mb-1">Verification Code</label>
            <input
              id="code"
              type="text"
              inputMode="numeric"
              pattern="[0-9]{4}"
              placeholder="1234"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
              maxLength={4}
              required
              className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/20 rounded text-red-300 border border-red-500/30">
              {error}
              {error.includes('CORS') && (
                <p className="text-xs mt-1">If this persists, contact support about CORS configuration</p>
              )}
            </div>
          )}
          
          {message && (
            <div className="p-3 bg-green-500/20 rounded text-green-300 border border-green-500/30">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {loading && (
              <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;