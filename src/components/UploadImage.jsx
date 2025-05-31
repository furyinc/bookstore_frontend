import { useState } from 'react';
import axios from 'axios';

const ImageUpload = ({ bookId }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      await axios.post(`/api/books/${bookId}/images`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      // Refresh book data
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="image-upload">
      <input 
        type="file" 
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button 
        onClick={handleUpload}
        disabled={isUploading}
      >
        {isUploading ? 'Uploading...' : 'Upload Cover'}
      </button>
    </div>
  );
};