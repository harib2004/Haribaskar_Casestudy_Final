import React, { useState } from 'react';
import api from '../../services/api'; 
import { Bed, IndianRupee, Users, Maximize, Wind, CheckCircle2, ArrowLeft, Upload } from 'lucide-react';
import ImageUploader from '../../services/ImageUploader'; 

const AddRoom = ({ hotelId, onClose }) => {
    const roomTypeMapping = {
        'Double Bed': 2,
        'Queen Size': 4,
        'King Size': 6
    };

    const [formData, setFormData] = useState({
        bedType: 'Double Bed',
        baseFare: '',
        maxPersons: 2,
        roomSize: '',
        acType: 'AC',
        totalRooms: '',
        imageUrl: '',
        hotel: { hotelId: hotelId }
    });


    const handleChange = (e) => {
        const { name, value, type } = e.target;
        let newValue = type === 'number' ? (parseInt(value) || '') : value;

        setFormData(prev => {
            const updated = { ...prev, [name]: newValue };
            if (name === 'bedType') updated.maxPersons = roomTypeMapping[value];
            return updated;
        });
    };

    const handleImageUploadSuccess = (s3Url) => {
        setFormData(prev => ({ ...prev, imageUrl: s3Url }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.imageUrl) {
            alert("Please upload a room photo before submitting.");
            return;
        }

        try {
            await api.post('/rooms/add', formData);
            onClose(); 
        } catch (err) {
            alert("Error adding room. Please ensure all details are correct.");
        }
    };

    return (
        <div className="card border-0 shadow-sm rounded-4 animate-fade-in bg-white">
            <div className="card-header bg-white border-0 pt-4 px-4 d-flex align-items-center justify-content-between">
                <div>
                    <h5 className="fw-bold mb-0">Add New Room Category</h5>
                </div>
            </div>

            <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label small fw-bold">Room Type</label>
                            <select name="bedType" className="form-select" value={formData.bedType} onChange={handleChange}>
                                {Object.keys(roomTypeMapping).map(type => <option key={type} value={type}>{type}</option>)}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label small fw-bold">Max Occupancy (Fixed)</label>
                            <input type="text" className="form-control bg-light" value={`${formData.maxPersons} Persons`} readOnly />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label small fw-bold">Base Fare (₹)</label>
                            <input type="number" name="baseFare" className="form-control" value={formData.baseFare} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label small fw-bold">Room Size</label>
                            <input type="text" name="roomSize" className="form-control" placeholder="e.g. 250 sqft" value={formData.roomSize} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label small fw-bold">AC Type</label>
                            <select name="acType" className="form-select" value={formData.acType} onChange={handleChange}>
                                <option value="AC">AC</option>
                                <option value="Non-AC">Non-AC</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label small fw-bold">Total Rooms</label>
                            <input type="number" name="totalRooms" className="form-control" value={formData.totalRooms} onChange={handleChange} required />
                        </div>
                        
                        {/* Image Upload Section */}
                        <div className="col-12 mt-3">
                            <label className="form-label fw-bold small text-uppercase text-muted d-flex align-items-center gap-2">
                                <Upload size={16} /> Room Photo
                            </label>
                            <div className="border rounded-3 p-3 bg-light shadow-sm">
                                <ImageUploader onUploadSuccess={handleImageUploadSuccess} />
                                <input 
                                    type="text" 
                                    name="imageUrl" 
                                    className="form-control mt-2 bg-white" 
                                    placeholder="Photo URL will appear here" 
                                    value={formData.imageUrl} 
                                    readOnly 
                                    required
                                />
                
                            </div>
                        </div>

                    </div>
                    <div className="mt-4 d-flex justify-content-end gap-2">
                        <button type="button" className="btn btn-light rounded-pill px-4" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary rounded-pill px-4">
                             Create Room
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRoom;