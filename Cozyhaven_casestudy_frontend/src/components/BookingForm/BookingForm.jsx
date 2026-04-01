import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../AuthContext/AuthContext';
import { toast } from 'react-toastify';
import { CheckCircle, CreditCard, Users, Calendar, ArrowLeft } from 'lucide-react';
import './BookingForm.css';

const BookingForm = () => {
    const { roomId } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const adults = parseInt(searchParams.get('adults') || 1);
    const children = parseInt(searchParams.get('children') || 0);

    const [quantity, setQuantity] = useState(1);
    const [totalAmount, setTotalAmount] = useState(0); 
    const [success, setSuccess] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");

    useEffect(() => {
        if (!user) {
            toast.warn("Please login to continue with your booking.");
            navigate('/login');
        }
    }, [user, navigate]);

    // Calculate Total Amount
    useEffect(() => {
        const getPricePreview = async () => {
            if (!user?.userId || !paymentMethod) return;

            const previewData = {
                userId: user.userId,
                roomId: parseInt(roomId),
                adults,
                children,
                quantity,
                checkIn,
                checkOut,
                paymentMethod
            };

            try {
                const res = await api.post(`/bookings/calculate-total`, previewData);
                setTotalAmount(res.data);
            } catch (err) {
                console.error("Price calculation failed", err);
            }
        };

        getPricePreview();
    }, [quantity, roomId, checkIn, checkOut, adults, children, user, paymentMethod]);

    const handleConfirmBooking = async () => {
        if (!paymentMethod) {
            toast.error("Please select a payment method.");
            return;
        }


        const bookingRequest = {
            userId: user.userId,
            roomId: parseInt(roomId),
            adults,
            children,
            quantity,
            checkIn,
            checkOut,
            paymentMethod
        };

        try {
            await api.post(`/bookings/create`, bookingRequest);
            setSuccess(true);
            toast.success("Booking successful!");
        } catch (err) {
            console.error("Reservation error:", err);
            toast.error(err.response?.data?.message || "Reservation failed. Please try again.");
        }
    };

    if (success) {
        return (
            <div className="container mt-5 py-5 text-center animate-fade-in">
                <div className="card shadow-lg border-0 p-5 rounded-4 mx-auto" style={{ maxWidth: '500px' }}>
                    <CheckCircle size={80} className="text-success mx-auto mb-3" />
                    <h2 className="fw-bold">Booking Confirmed!</h2>
                    <p className="text-muted mb-4">Your stay has been successfully reserved.</p>
                    <div className="bg-light p-3 rounded-3 mb-4">
                        <span className="text-muted d-block small">Amount Paid</span>
                        <span className="fs-3 fw-bold text-primary">₹{totalAmount}</span>
                    </div>
                    <button className="btn btn-primary rounded-pill px-5 fw-bold w-100 py-3 shadow-sm" onClick={() => navigate('/profile')}>
                        View My Bookings
                    </button>
                    <button className="btn btn-link text-decoration-none mt-2 text-muted" onClick={() => navigate('/')}>
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5 mb-5 text-start animate-fade-in">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
                        <div className="card-header bg-white border-0 pt-4 px-4 d-flex align-items-center gap-2">
                            <button className="btn btn-link p-0 text-dark" onClick={() => navigate(-1)}>
                                <ArrowLeft size={20} />
                            </button>
                            <h3 className="fw-bold mb-0">Confirm Your Stay</h3>
                        </div>
                        
                        <div className="card-body px-4 pb-4">
                            <div className="bg-light rounded-4 p-4 mb-4 border-0 shadow-none">
                                <div className="row g-3">
                                    <div className="col-6">
                                        <label className="text-muted small fw-bold text-uppercase d-flex align-items-center gap-1">
                                            <Calendar size={12} /> Check-In
                                        </label>
                                        <p className="mb-0 fw-bold">{checkIn}</p>
                                    </div>
                                    <div className="col-6">
                                        <label className="text-muted small fw-bold text-uppercase d-flex align-items-center gap-1">
                                            <Calendar size={12} /> Check-Out
                                        </label>
                                        <p className="mb-0 fw-bold">{checkOut}</p>
                                    </div>
                                    <div className="col-12 border-top pt-2">
                                        <label className="text-muted small fw-bold text-uppercase d-flex align-items-center gap-1">
                                            <Users size={12} /> Guests
                                        </label>
                                        <p className="mb-0 fw-bold">{adults} Adults, {children} Children</p>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={(e) => e.preventDefault()}>
                                {/* Room Selection */}
                                <div className="mb-4">
                                    <label className="form-label fw-bold small text-muted text-uppercase">Number of Rooms</label>
                                    <select 
                                        className="form-select rounded-pill px-3 shadow-none fw-semibold"
                                        value={quantity}
                                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                                    >
                                        {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Room{n > 1 ? 's' : ''}</option>)}
                                    </select>
                                </div>

                                {/* Payment Method */}
                                <div className="mb-4">
                                    <label className="form-label fw-bold small text-muted text-uppercase d-flex align-items-center gap-1">
                                        <CreditCard size={14} /> Payment Method
                                    </label>
                                    <select 
                                        className="form-select rounded-pill px-3 shadow-none fw-semibold"
                                        value={paymentMethod} 
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Payment Method</option>
                                        <option value="UPI">UPI (PhonePe, GPay)</option>
                                        <option value="DEBIT CARD">Debit Card</option>
                                        <option value="CREDIT CARD">Credit Card</option>
                                    </select>
                                </div>

                                {/* Price Calculation Box */}
                                <div className="d-flex justify-content-between align-items-center p-4 bg-primary-subtle rounded-4 mb-4 border border-primary-subtle">
                                    <div>
                                        <span className="fw-bold text-primary d-block">Grand Total</span>
                                        <span className="text-muted extra-small">Inclusive of all taxes</span>
                                    </div>
                                    <span className="fs-2 fw-bold text-primary">₹{totalAmount}</span>
                                </div>

                                <div className="d-grid gap-2">
                                    <button 
                                        type="button"
                                        className="btn btn-primary btn-lg rounded-pill fw-bold py-3 shadow-sm border-0"
                                        disabled={!paymentMethod}
                                        onClick={handleConfirmBooking}
                                    >
                                        "Confirm & Pay"
                                    </button>
                                    <p className="text-center text-muted extra-small mt-2 px-4">
                                        By clicking "Confirm & Pay", you agree to Cozy Haven's Terms of Service and Cancellation Policy.
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingForm;