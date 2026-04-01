import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../services/api';
import './RoomList.css';

const RoomList = () => {
    const { hotelId } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(null);

    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');

    useEffect(() => {
        const fetchRooms = async () => {
            
            setError(null);
            try {
                
                const response = await api.get(`/rooms/hotel/${hotelId}/available`, {
                    params: { checkIn, checkOut }
                });
                setRooms(response.data);
            } catch (err) {
                console.error("Fetch Rooms Error:", err);
                setError("Unable to find available rooms for these dates. Please try again.");
            }
        };

        if (hotelId && checkIn && checkOut) {
            fetchRooms();
        } else {
            setError("Missing search criteria. Please select Check-in and Check-out dates.");
        }
    }, [hotelId, checkIn, checkOut]);


    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-warning border-0 shadow-sm rounded-4 p-4 text-center">
                    <h5 className="fw-bold">Notice</h5>
                    <p className="mb-0">{error}</p>
                    <button className="btn btn-primary mt-3 rounded-pill px-4" onClick={() => navigate(-1)}>
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5 mb-5 text-start animate-fade-in">
            <header className="mb-4 d-flex justify-content-between align-items-end">
                <div>
                    <h2 className="fw-bold m-0">Available Rooms</h2>
                    <p className="text-muted small mt-1">
                        Availability for: <span className="fw-bold text-primary">{checkIn}</span> to <span className="fw-bold text-primary">{checkOut}</span>
                    </p>
                </div>
                <div className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">
                    {rooms.length} {rooms.length === 1 ? 'Room' : 'Rooms'} Found
                </div>
            </header>

            <div className="row">
                {rooms.length > 0 ? (
                    rooms.map((room) => (
                        <div className="col-12 mb-4" key={room.roomId}>
                            <div className="card shadow-sm border-0 overflow-hidden hotel-card-horizontal bg-white rounded-4">
                                <div className="row g-0">
                                    {/* Left Side */}
                                    <div className="col-md-4">
                                        <div className="position-relative h-100">
                                            <img 
                                                src={room.imageUrl || "https://via.placeholder.com/400x300?text=No+Image+Available"} 
                                                className="img-fluid h-100 w-100" 
                                                alt={`${room.bedType} room`}
                                                style={{ objectFit: 'cover', minHeight: '220px' }}
                                            />
                                            <div className="position-absolute top-0 start-0 m-3">
                                                <span className="badge bg-white text-dark shadow-sm rounded-pill px-3 py-2 fw-bold">
                                                    {room.acType}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side */}
                                    <div className="col-md-8">
                                        <div className="card-body d-flex flex-column h-100 justify-content-center p-4">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <h4 className="card-title text-dark fw-bold mb-0">{room.bedType} Room</h4>
                                                <div className="text-end">
                                                    <span className="fs-3 fw-bold text-primary">₹{room.baseFare}</span>
                                                    <div className="text-muted small">per night</div>
                                                </div>
                                            </div>
                                            
                                            <div className="row text-muted small mb-4">
                                                <div className="col-sm-6 mb-2">
                                                    <i className="bi bi-people-fill me-2 text-primary"></i>
                                                    Max Guests: <strong>{room.maxPersons} Persons</strong>
                                                </div>
                                                <div className="col-sm-6 mb-2">
                                                    <i className="bi bi-fullscreen me-2 text-primary"></i>
                                                    Room Size: <strong>{room.roomSize} sq. ft.</strong>
                                                </div>
                        
                                            </div>

                                            <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
    
                                                <button 
                                                    className="btn btn-primary px-5 rounded-pill fw-bold py-2 shadow-sm"
                                                    onClick={() => navigate(`/booking/${room.roomId}?${searchParams.toString()}`)}
                                                >
                                                    Select Room
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-5 w-100 bg-white shadow-sm rounded-4 border">
                        <i className="bi bi-calendar-x text-muted opacity-25" style={{ fontSize: '4rem' }}></i>
                        <h4 className="text-dark fw-bold mt-3">No availability found</h4>
                        <p className="text-secondary mx-auto mb-4" style={{maxWidth: '400px'}}>
                            Sorry, this hotel is fully booked for the dates you've chosen.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RoomList;