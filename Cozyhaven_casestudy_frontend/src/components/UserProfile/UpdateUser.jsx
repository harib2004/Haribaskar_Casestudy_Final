import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';
import './UpdateUser.css';

const UpdateUser = () => {
    const { user, login } = useAuth(); 
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        gender: '',
        phone: '',
        address: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                gender: user.gender || '',
                phone: user.phone || '',
                address: user.address || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.put(`/users/update/${user.userId}`, formData);
            
            alert("Profile updated successfully!");
            if (login) {
                login({ ...response.data, token: user.token });
            }
            navigate('/profile'); 
        } catch (error) {
            console.error("Update failed:", error);
            const errorMsg = error.response?.data?.message || "Failed to update profile.";
            alert(errorMsg);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card border-0 shadow-sm rounded-4 p-4 animate-fade-in">
                        <h4 className="fw-bold mb-4">Edit Profile</h4>
                        <form onSubmit={handleSubmit}>
                            
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted text-uppercase">Email Address</label>
                                <input 
                                    type="email" 
                                    className="form-control rounded-pill px-3 bg-light text-muted border-dashed" 
                                    value={formData.email} 
                                    readOnly 
                                    disabled
                                    title="Email cannot be changed"
                                />
                                <div className="form-text extra-small mt-1">Email address cannot be modified for security reasons.</div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted text-uppercase">Full Name</label>
                                <input 
                                    type="text" 
                                    className="form-control rounded-pill px-3 shadow-none" 
                                    name="name"
                                    placeholder="Enter your full name"
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted text-uppercase">Gender</label>
                                <select 
                                    className="form-select rounded-pill px-3 shadow-none" 
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted text-uppercase">Phone Number</label>
                                <input 
                                    type="tel" 
                                    className="form-control rounded-pill px-3 shadow-none" 
                                    name="phone"
                                    placeholder="e.g. +91 9876543210"
                                    value={formData.phone} 
                                    onChange={handleChange} 
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label small fw-bold text-muted text-uppercase">Residential Address</label>
                                <textarea 
                                    className="form-control rounded-4 px-3 shadow-none" 
                                    name="address"
                                    rows="3"
                                    placeholder="Enter your permanent address"
                                    value={formData.address} 
                                    onChange={handleChange} 
                                />
                            </div>

                            <div className="d-flex gap-2">
                                <button type="submit" className="btn btn-primary rounded-pill px-4 fw-bold">
                                    Save Changes
                                </button>
                                <button type="button" className="btn btn-outline-secondary rounded-pill px-4 fw-bold" onClick={() => navigate('/profile')}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;