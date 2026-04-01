import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ManageBookings = ({ hotelId }) => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (hotelId) fetchBookings();
    }, [hotelId]);

    const fetchBookings = async () => {
        try {
            const res = await api.get(`/bookings/hotel/${hotelId}`);
            setBookings(res.data);
        } catch (err) {
            console.error("Error fetching bookings:", err);
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            'Confirmed': 'bg-success-subtle text-success border-success',
            'Pending': 'bg-warning-subtle text-warning border-warning',
            'Cancelled': 'bg-danger-subtle text-danger border-danger'
        };
        return `badge border ${styles[status] || 'bg-light text-dark'}`;
    };


    return (
        <div className="animate-fade-in">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-bold text-dark">Room Bookings</h5>
                </div>
                
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light text-secondary small text-uppercase fw-bold">
                            <tr>
                                <th className="ps-4 py-3">Booking ID</th>
                                <th>Check-In</th>
                                <th>Check-Out</th>
                                <th>Guest Details</th>
                                <th>Total Fare</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.length > 0 ? (
                                bookings.map((b) => (
                                    <tr key={b.bookingId}>
                                        <td className="ps-4">
                                            <div className="fw-bold text-dark">Booking ID-{b.bookingId}</div>
                                            <small className="text-muted">Room ID: {b.roomId}</small>
                                        </td>
                                        <td>
                                            <div className="small fw-bold">{b.checkInDate}</div>
                                        </td>
                                        <td>
                                            <div className="small fw-bold"> {b.checkOutDate}</div>
                                        </td>
                                        <td>
                                            <div className="small">{b.adults} Adults, {b.children} Children</div>
                                        </td>
                                        <td>
                                            <span className="fw-bold text-primary">₹{b.totalAmount}</span>
                                        </td>
                                        <td>
                                            <span className={getStatusBadge(b.status)}>{b.status}</span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-5">
                                        <div className="text-muted">
                                            <i className="bi bi-calendar-x" style={{ fontSize: '2rem' }}></i>
                                            <p className="mt-2 mb-0">No bookings found for this property.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageBookings;