import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Pencil, Trash2, MapPin, DoorOpen, CalendarCheck, ChevronLeft, PlusCircle } from 'lucide-react';
import ManageRooms from './ManageRooms';
import ManageBookings from './ManageBookings';
import UpdateHotel from './UpdateHotel';
import AddHotel from './AddHotel'; 

const OwnerHotels = ({ ownerId }) => {
    const [hotels, setHotels] = useState([]);
    const [viewMode, setViewMode] = useState('list'); 
    const [selectedHotel, setSelectedHotel] = useState(null);

    useEffect(() => { fetchHotels(); }, []);

    const fetchHotels = async () => {
        try {
            const res = await api.get(`/hotels/owner-search/${ownerId}`);
            setHotels(res.data);
        } catch (err) { console.error("Fetch Error:", err); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Permanently delete this property?")) {
            try {
                await api.delete(`/hotels/delete/${id}`);
                fetchHotels();
            } catch (err) { alert("Delete failed."); }
        }
    };

    //CONDITIONAL VIEWS

    if (viewMode === 'add') {
        return (
            <div>
                <button className="btn btn-link text-decoration-none p-0 mb-4 fw-bold text-secondary d-flex align-items-center gap-2" onClick={() => setViewMode('list')}>
                    <ChevronLeft size={20}/> Back to Dashboard
                </button>
                <AddHotel 
                    ownerId={ownerId} 
                    onAdd={fetchHotels} 
                    onCancel={() => setViewMode('list')} 
                />
            </div>
        );
    }

    if (viewMode === 'edit' && selectedHotel) {
        return (
            <div>
                <button className="btn btn-link text-decoration-none p-0 mb-4 fw-bold text-secondary d-flex align-items-center gap-2" onClick={() => setViewMode('list')}>
                    <ChevronLeft size={20}/> Back to Dashboard
                </button>
                <UpdateHotel 
                    hotel={selectedHotel} 
                    onUpdate={fetchHotels} 
                    onCancel={() => setViewMode('list')} 
                />
            </div>
        );
    }

    if (viewMode === 'rooms' && selectedHotel) {
        return (
            <div>
                <button className="btn btn-link text-decoration-none p-0 mb-4 fw-bold text-secondary d-flex align-items-center gap-2" onClick={() => setViewMode('list')}>
                    <ChevronLeft size={20} /> Back to Dashboard
                </button>
                <ManageRooms hotelId={selectedHotel.hotelId} />
            </div>
        );
    }

    if (viewMode === 'bookings' && selectedHotel) {
        return (
            <div>
                <button className="btn btn-link text-decoration-none p-0 mb-4 fw-bold text-secondary d-flex align-items-center gap-2" onClick={() => setViewMode('list')}>
                    <ChevronLeft size={20} /> Back to Dashboard
                </button>
                <ManageBookings hotelId={selectedHotel.hotelId} />
            </div>
        );
    }

    return (
        <div className="row">
            <div className="col-12 d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0">Registered Properties</h4>
                <button 
                    className="btn btn-primary rounded-pill px-4 shadow-sm d-flex align-items-center gap-2"
                    onClick={() => setViewMode('add')}
                >
                    <PlusCircle size={18} /> Add Hotel
                </button>
            </div>

            {hotels.map((hotel) => (
                <div className="col-12 mb-4" key={hotel.hotelId}>
                    <div className="card shadow-sm border-0 overflow-hidden bg-white text-start">
                        <div className="row g-0">
                            <div className="col-md-3 col-lg-2 bg-light d-flex align-items-center justify-content-center border-end p-0"
                                 style={{ aspectRatio: '1/1', overflow: 'hidden' }}>
                                <img 
                                    src={hotel.imageUrl || "https://via.placeholder.com/400x300?text=No+Image+Available"}
                                    alt={hotel.name}
                                    style={{ objectFit: 'cover', minHeight: '270px' , minWidth: '270px' }}
                                />
                            </div>
                            <div className="col-md-9 col-lg-10">
                                <div className="card-body p-4 d-flex flex-column h-100">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <h4 className="text-primary fw-bold mb-1">{hotel.name}</h4>
                                            <p className="text-muted small mb-3 d-flex align-items-center gap-1">
                                                <MapPin size={14} /> {hotel.location}
                                            </p>
                                        </div>
                                        <div className="d-flex gap-2">
                                            <button className="btn btn-outline-secondary btn-sm rounded-circle p-2" onClick={() => { setSelectedHotel(hotel); setViewMode('edit'); }}>
                                                <Pencil size={18} />
                                            </button>
                                            <button className="btn btn-outline-danger btn-sm rounded-circle p-2" onClick={() => handleDelete(hotel.hotelId)}>
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-secondary small mb-4">{hotel.description}</p>
                                    <div className="d-flex gap-2 border-top pt-3 mt-auto">
                                        <button className="btn btn-outline-primary fw-bold rounded-pill flex-grow-1 d-flex align-items-center justify-content-center gap-2" onClick={() => { setSelectedHotel(hotel); setViewMode('rooms'); }}>
                                            <DoorOpen size={18} /> Rooms
                                        </button>
                                        <button className="btn btn-outline-success fw-bold rounded-pill flex-grow-1 d-flex align-items-center justify-content-center gap-2" onClick={() => { setSelectedHotel(hotel); setViewMode('bookings'); }}>
                                            <CalendarCheck size={18} /> Bookings
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OwnerHotels;