import React, { useState } from 'react';
import api from '../../services/api';
import { Save, Building, MapPin, AlignLeft, Upload } from 'lucide-react';
import ImageUploader from '../../services/ImageUploader';

const UpdateHotel = ({ hotel, onUpdate, onCancel }) => {
    const [formData, setFormData] = useState({
        hotelId: hotel.hotelId,
        name: hotel.name,
        location: hotel.location,
        description: hotel.description,
        imageUrl: hotel.imageUrl || '',
        owner: { userId: hotel.ownerId || hotel.owner?.userId }
    });

    const handleImageUploadSuccess = (s3Url) => {
        setFormData(prev => ({ ...prev, imageUrl: s3Url }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
    
            await api.put(`/hotels/update/${formData.hotelId}`, formData);
            onUpdate(); 
            onCancel(); 
        } catch (err) {
            console.error("Update failed:", err);
            alert("Failed to update hotel details.");
        } 
    };

    return (
        <div className="animate-fade-in">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                <div className="card-header bg-primary text-white p-4 border-0 d-flex justify-content-between align-items-center">
                    <h4 className="fw-bold mb-0 d-flex align-items-center gap-2">
                        <Building size={24} /> Edit Property Details
                    </h4>
                </div>

                <form onSubmit={handleSubmit} className="p-4 bg-white text-start">
                    <div className="mb-4">
                        <label className="form-label fw-bold small text-uppercase text-muted">Hotel Name</label>
                        <div className="input-group shadow-sm rounded-3">
                            <span className="input-group-text bg-white border-end-0"><Building size={18} className="text-muted"/></span>
                            <input 
                                type="text" 
                                className="form-control border-start-0 ps-0"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                required 
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-bold small text-uppercase text-muted">Location</label>
                        <div className="input-group shadow-sm rounded-3">
                            <span className="input-group-text bg-white border-end-0"><MapPin size={18} className="text-muted"/></span>
                            <input 
                                type="text" 
                                className="form-control border-start-0 ps-0"
                                value={formData.location}
                                onChange={(e) => setFormData({...formData, location: e.target.value})}
                                required 
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-bold small text-uppercase text-muted">Description</label>
                        <div className="input-group shadow-sm rounded-3">
                            <span className="input-group-text bg-white border-end-0 align-items-start pt-2"><AlignLeft size={18} className="text-muted"/></span>
                            <textarea 
                                className="form-control border-start-0 ps-0"
                                rows="5"
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                required
                            ></textarea>
                        </div>
                    </div>

                    {/* Integrated Image Upload Section */}
                    <div className="mb-4">
                        <label className="form-label fw-bold small text-uppercase text-muted d-flex align-items-center gap-2">
                            <Upload size={18} className="text-muted"/> Update Property Photo
                        </label>
                        
                        <div className="border rounded-3 p-3 bg-light shadow-sm">
                            {formData.imageUrl && (
                                <div className="mb-3">
                                    <p className="small text-muted mb-1">Current Image:</p>
                                    <img 
                                        src={formData.imageUrl} 
                                        alt="Current Hotel" 
                                        className="rounded shadow-sm" 
                                        style={{ width: '100px', height: '70px', objectFit: 'cover' }}
                                    />
                                </div>
                            )}
                            
                            <ImageUploader onUploadSuccess={handleImageUploadSuccess} />
                            
                            <input 
                                type="hidden" 
                                value={formData.imageUrl} 
                                required 
                            />
                            <p className="text-muted small mt-2 mb-0">
                                Uploading a new photo will replace the previous one once you save
                            </p>
                        </div>
                    </div>

                    <div className="d-flex gap-3 mt-4">
                        <button type="button" className="btn btn-light btn-lg flex-grow-1 rounded-pill" onClick={onCancel}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary btn-lg flex-grow-1 rounded-pill shadow d-flex align-items-center justify-content-center gap-2">
                             <Save size={20} /> Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateHotel;