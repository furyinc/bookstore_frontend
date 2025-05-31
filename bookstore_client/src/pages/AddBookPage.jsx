// import { useState } from 'react';
// import axios from 'axios';

// const AddBookPage = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('');
//   const [stock, setStock] = useState('');
//   const [images, setImages] = useState([]);
//   const [previewUrls, setPreviewUrls] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setImages(files);

//     const previews = files.map(file => URL.createObjectURL(file));
//     setPreviewUrls(previews);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('price', price);
//     formData.append('stock', stock);

//     images.forEach((file) => {
//       formData.append('images', file); // backend multer will handle this
//     });

//     setLoading(true);
//     const token = localStorage.getItem('token');

//     try {
//       await axios.post('http://localhost:5000/api/books', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       alert('Book added successfully!');
//       // Reset
//       setTitle('');
//       setDescription('');
//       setPrice('');
//       setStock('');
//       setImages([]);
//       setPreviewUrls([]);
//     } catch (err) {
//       setError('Error adding book');
//       console.error(err.response?.data || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Add New Book</h1>
//       {error && <div className="text-red-500 mb-4">{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-sm font-semibold mb-2" htmlFor="title">
//             Title
//           </label>
//           <input
//             type="text"
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-semibold mb-2" htmlFor="description">
//             Description
//           </label>
//           <textarea
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-semibold mb-2" htmlFor="price">
//             Price
//           </label>
//           <input
//             type="number"
//             id="price"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//             step="0.01"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-semibold mb-2" htmlFor="stock">
//             Stock
//           </label>
//           <input
//             type="number"
//             id="stock"
//             value={stock}
//             onChange={(e) => setStock(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-semibold mb-2" htmlFor="images">
//             Upload Images
//           </label>
//           <input
//             type="file"
//             id="images"
//             accept="image/*"
//             onChange={handleImageChange}
//             multiple
//             required
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//           <div className="flex gap-4 mt-4 flex-wrap">
//             {previewUrls.map((url, index) => (
//               <img key={index} src={url} alt={`preview-${index}`} className="w-24 h-24 object-cover rounded" />
//             ))}
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//           disabled={loading}
//         >
//           {loading ? 'Adding...' : 'Add Book'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddBookPage;





import { useState } from 'react';
import axios from 'axios';

const AddBookPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    stock: ''
  });
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    images.forEach((file) => {
      data.append('images', file);
    });

    setLoading(true);
    setError('');
    setSuccess(false);
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:5000/api/books', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess(true);
      // Reset form
      setFormData({
        title: '',
        description: '',
        price: '',
        stock: ''
      });
      setImages([]);
      setPreviewUrls([]);
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Book</h1>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-lg">
            Book added successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700" htmlFor="price">
                Price ($)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                step="0.01"
                min="0"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700" htmlFor="stock">
                Stock Quantity
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="images">
              Book Images
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="pt-1 text-sm text-gray-500">
                    {images.length > 0 
                      ? `${images.length} file(s) selected` 
                      : 'Click to upload images (multiple allowed)'}
                  </p>
                </div>
                <input 
                  type="file" 
                  id="images" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  multiple 
                  required 
                  className="opacity-0" 
                />
              </label>
            </div>

            {previewUrls.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Image Previews:</p>
                <div className="flex flex-wrap gap-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={url} 
                        alt={`preview-${index}`} 
                        className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : 'Add Book'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBookPage;