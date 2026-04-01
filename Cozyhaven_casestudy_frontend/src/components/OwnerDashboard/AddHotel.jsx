import React, { useState } from 'react';
import api from '../../services/api'; 
import { Save, Building, MapPin, AlignLeft, Upload } from 'lucide-react';
import ImageUploader from '../../services/ImageUploader';

const AddHotel = ({ ownerId, onAdd, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        description: 'Facilities:',
        imageUrl: '', 
        owner: { userId: ownerId }
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUploadSuccess = (s3Url) => {
        setFormData(prev => ({ ...prev, imageUrl: s3Url }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        if (!formData.imageUrl) {
            alert("Please upload a property photo before registering.");
            return;
        }

        try {
            await api.post(`/hotels/add`, formData);
            onAdd();   
            onCancel();
        } catch (err) {
            console.error("Registration failed:", err);
            alert("Failed to register property. Please check details and try again.");
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                <div className="card-header bg-primary text-white p-4 border-0 d-flex justify-content-between align-items-center">
                    <h4 className="fw-bold mb-0 d-flex align-items-center gap-2">
                         Register New Property
                    </h4>
                </div>

                <form onSubmit={handleSubmit} className="p-4 bg-white text-start">
                    <div className="mb-4">
                        <label className="form-label fw-bold small text-uppercase text-muted">Hotel Name</label>
                        <div className="input-group shadow-sm rounded-3">
                            <span className="input-group-text bg-white border-end-0"><Building size={18} className="text-muted"/></span>
                            <input 
                                type="text" 
                                name="name"
                                className="form-control border-start-0 ps-0"
                                placeholder="e.g. CozyHaven Grand"
                                value={formData.name}
                                onChange={handleChange}
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
                                name="location"
                                className="form-control border-start-0 ps-0"
                                placeholder="e.g. Mumbai"
                                value={formData.location}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-bold small text-uppercase text-muted">Description</label>
                        <div className="input-group shadow-sm rounded-3">
                            <span className="input-group-text bg-white border-end-0 align-items-start pt-2"><AlignLeft size={18} className="text-muted"/></span>
                            <textarea 
                                name="description"
                                className="form-control border-start-0 ps-0"
                                rows="5"
                                placeholder="Describe your property's unique features..."
                                value={formData.description}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                    </div>
                    
                    {/* Integrated Image Upload Section */}
                    <div className="mb-4 ">
                        <label className="form-label fw-bold small text-uppercase text-muted d-flex align-items-center gap-2">
                           <Upload size={18} className="text-muted"/> Property Photo
                        </label>
                        <div className="input-group shadow-sm rounded-3 border bg-light p-3 d-flex justify-content-center">
                             <ImageUploader onUploadSuccess={handleImageUploadSuccess} />
                             
                        </div>
                    </div>

                    <div className="d-flex gap-3 mt-4">
                        <button type="button" className="btn btn-light btn-lg flex-grow-1 rounded-pill" onClick={onCancel}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary btn-lg flex-grow-1 rounded-pill shadow d-flex align-items-center justify-content-center gap-2">
                           <Save size={20} /> Register Hotel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddHotel;