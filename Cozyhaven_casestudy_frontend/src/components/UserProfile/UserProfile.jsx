import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext/AuthContext';
import './UserProfile.css';
import { User as UserIcon, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const UserProfile = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    const fetchUserBookings = async () => {
        if (!user?.userId) return;
        try {
            const response = await api.get(`/bookings/user/${user.userId}`);
            setBookings(response.data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    useEffect(() => {
        fetchUserBookings();
    }, [user]);

    const handleCancelBooking = async (bookingId) => {
        if (window.confirm("Are you sure you want to cancel this booking?")) {
            try {
                await api.put(`/bookings/cancel/${bookingId}`);
                fetchUserBookings();
                alert("Booking cancelled successfully.");
            } catch (error) {
                console.error("Cancellation error:", error);
                alert("Could not cancel booking. You might not have permission.");
            }
        }
    };

    return (
        <div className="container mt-5 profile-page animate-fade-in">
            <div className="row g-4">
                {/* Left Side */}
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm rounded-4 p-4 text-center">
                        <div className="mx-auto mb-3 avatar-container">
                            <UserIcon size={60} className="text-primary" />
                        </div>
                        <h4 className="fw-bold">{user?.name}</h4>
                        

                        <p className="text-muted mb-4">{user?.email}</p>
                        
                        <div className="text-start mb-4">
                            <div className="small text-uppercase text-muted fw-bold mb-1">Phone</div>
                            <div className="fw-medium">{user?.phone || 'Not provided'}</div>
                        </div>
                        <hr />
                        
                        
                        <button 
                            className="btn btn-outline-primary w-100 mt-3 rounded-pill fw-bold"
                            onClick={() => navigate('/update-profile')}
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>

                {/* Right Side */}
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm rounded-4 p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="fw-bold m-0">Your Reservations</h4>
                            <span className="badge bg-primary-subtle text-primary rounded-pill px-3">
                                {bookings.length} Total
                            </span>
                        </div>
                        
                        {bookings.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table align-middle table-hover">
                                    <thead className="table-light">
                                        <tr>
                                            <th className="border-0">Room</th>
                                            <th className="border-0">Dates</th>
                                            <th className="border-0">Amount</th>
                                            <th className="border-0">Status</th>
                                            <th className="border-0 text-end">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.map((b) => (
                                            <tr key={b.bookingId}>
                                                <td className="fw-bold">Room No.{b.roomId}</td>
                                                <td>
                                                    <div className="small">{b.checkInDate}</div>
                                                    <div className="text-muted extra-small">to {b.checkOutDate}</div>
                                                </td>
                                                <td className="fw-bold">₹{b.totalAmount}</td>
                                                <td>
                                                    <span className={`badge rounded-pill ${
                                                        b.status === 'CONFIRMED' ? 'bg-info-subtle text-info' : 'bg-secondary-subtle text-secondary'
                                                    }`}>
                                                        {b.status}
                                                    </span>
                                                </td>
                                                <td className="text-end">
                                                    {b.status === 'CONFIRMED' && (
                                                        <button 
                                                            className="btn btn-sm btn-link text-danger text-decoration-none fw-bold"
                                                            onClick={() => handleCancelBooking(b.bookingId)}
                                                        >
                                                            Cancel
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-5">
                                <div className="mb-3 text-muted opacity-50">
                                    <UserIcon size={48} className="mx-auto" />
                                </div>
                                <h5 className="text-muted">No bookings found</h5>
                                <p className="small text-muted">Ready for a getaway? Explore our rooms today.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;