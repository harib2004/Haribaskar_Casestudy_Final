import React, { useState } from 'react';
import { uploadPhotoToS3 } from '../services/uploadService';

const ImageUploader = ({ onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    
    try {
      setUploading(true);
      const finalImageUrl = await uploadPhotoToS3(file);
      await onUploadSuccess(finalImageUrl); 
      alert("Hotel photo uploaded and saved successfully!");
      
    } catch (err) {
      console.error("Upload process failed:", err);
      alert("Upload failed. Please check your connection or log in again.");
      setPreview(null);
    } finally {
      setUploading(false);
      e.target.value = null;
    }
  };


  return (
    <div className="photo-upload-container" style={{ border: '1px dashed #ccc', padding: '15px', borderRadius: '10px' }}>
      
      
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        disabled={uploading}
        className="file-input"
      />
      
      {uploading && (
        <div style={{ marginTop: '10px', color: '#007bff' }}>
          <strong>Uploading to CozyHaven storage...</strong>
        </div>
      )}
      
      {preview && !uploading && (
        <div style={{ marginTop: '15px', position: 'relative' }}>
          <img 
            src={preview} 
            alt="Preview" 
            style={{ width: '100%', maxWidth: '300px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} 
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;