import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, logout, api } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  });

  const [uiState, setUiState] = useState({
    isLoading: true,
    isEditing: false,
    isSubmitting: false,
    error: null,
    success: null
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user || !user.token) {
        navigate('/login');
        return;
      }

      try {
        setUiState(prev => ({ ...prev, isLoading: true, error: null }));

        const response = await api.get('/users/me');
        const { name, email, address, phone } = response.data;

        setProfileData({
          name: name || '',
          email: email || '',
          address: address || '',
          phone: phone || ''
        });

        setUiState(prev => ({
          ...prev,
          isLoading: false,
          isEditing: !address && !phone
        }));
      } catch (error) {
        console.error('Profile fetch error:', error);
        if (error.response?.status === 401) {
          logout();
          navigate('/login');
          return;
        }

        setUiState(prev => ({
          ...prev,
          isLoading: false,
          error: error.response?.data?.message || 'Failed to load profile'
        }));
      }
    };

    fetchProfile();
  }, [user, api, logout, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUiState(prev => ({ ...prev, isSubmitting: true, error: null, success: null }));

      const response = await api.put('/users/profile', profileData);

      setProfileData({
        name: response.data.name || '',
        email: response.data.email || '',
        address: response.data.address || '',
        phone: response.data.phone || ''
      });

      setUiState(prev => ({
        ...prev,
        isSubmitting: false,
        isEditing: false,
        success: 'Profile updated successfully!'
      }));

      setTimeout(() => {
        setUiState(prev => ({ ...prev, success: null }));
      }, 3000);
    } catch (error) {
      console.error('Profile update error:', error);
      if (error.response?.status === 401) {
        logout();
        navigate('/login');
        return;
      }

      setUiState(prev => ({
        ...prev,
        isSubmitting: false,
        error: error.response?.data?.message || 'Failed to update profile'
      }));
    }
  };

  const { name, email, address, phone } = profileData;
  const { isLoading, isEditing, isSubmitting, error, success } = uiState;

  if (isLoading) {
    return <div className="p-4 text-gray-600">Loading profile...</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Your Profile</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              disabled
              className="w-full border px-3 py-2 bg-gray-100 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter address"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter phone number"
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              className="text-gray-500 underline"
              onClick={() => setUiState(prev => ({ ...prev, isEditing: false }))}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="mb-4">
            <p><strong>Name:</strong> {name || 'N/A'}</p>
            <p><strong>Email:</strong> {email || 'N/A'}</p>
            <p><strong>Address:</strong> {address || 'N/A'}</p>
            <p><strong>Phone:</strong> {phone || 'N/A'}</p>
          </div>
          <button
            onClick={() => setUiState(prev => ({ ...prev, isEditing: true }))}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
