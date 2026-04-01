import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../services/api';
import './HotelList.css';

const HotelList = () => {
    const { searchLocation } = useParams(); 
    const [searchParams] = useSearchParams(); 
    const navigate = useNavigate();
    const [hotels, setHotels] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHotels = async () => {
            setError(null);
            try {
                const response = await api.get(`/hotels/search/${searchLocation}`);
                setHotels(response.data);
            } catch (err) {
                console.error("API Error:", err);
                setError("Could not fetch hotels. Please try again later.");
            }
        };

        if (searchLocation) fetchHotels();
    }, [searchLocation]);

    return (
        <div className="container mt-5 mb-5 text-start">
            <header className="mb-4">
                <h2 className="fw-bold">Hotels in <span className="text-primary">{searchLocation}</span></h2>
                <p className="text-muted">{hotels.length} properties found</p>
            </header>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="row">
                {hotels.length > 0 ? (
                    hotels.map((hotel) => (
                        <div className="col-12 mb-4" key={hotel.hotelId}>
                            <div className="card shadow-sm border-0 overflow-hidden h-100 hotel-card-horizontal">
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img 
                                            src={hotel.imageUrl || "https://via.placeholder.com/400x300?text=No+Image+Available"}
                                            className="img-fluid h-100 w-100" 
                                            alt={hotel.name}
                                            style={{ objectFit: 'cover', minHeight: '200px' }}
                                        />
                                    </div>

                                    <div className="col-md-8">
                                        <div className="card-body d-flex flex-column h-100 justify-content-center p-4">
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <h4 className="card-title text-primary fw-bold mb-1">{hotel.name}</h4>
                                                    <h6 className="card-subtitle mb-3 text-muted">
                                                        <i className="bi bi-geo-alt-fill me-1 text-danger"></i> {hotel.location}
                                                    </h6>
                                                </div>
                                            </div>
                                            
                                            <p className="card-text text-secondary mb-4" style={{ maxWidth: '90%' }}>
                                                {hotel.description}
                                            </p>

                                            <div className="mt-auto">
                                                <button 
                                                    className="btn btn-primary px-5 rounded-pill"
                                                    onClick={() => navigate(`/hotel/${hotel.hotelId}/rooms?${searchParams.toString()}`)}
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-5 w-100">
                        <h4 className="text-muted">No hotels found in "{searchLocation}"</h4>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HotelList;