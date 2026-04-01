import React, { useState, useEffect } from 'react';
import api from '../../services/api'; 
import { PlusCircle, Bed, IndianRupee, Users, Trash2, Pencil } from 'lucide-react';
import AddRoom from './AddRoom'; 

const ManageRooms = ({ hotelId }) => {
    const [rooms, setRooms] = useState([]);
    const [view, setView] = useState('list'); 
    
    useEffect(() => {
        if (hotelId) fetchRooms();
    }, [hotelId]);

    const fetchRooms = async () => {
        try {
            const res = await api.get(`/rooms/hotel/${hotelId}`);
            setRooms(res.data);
        } catch (err) {
            console.error("Error fetching rooms:", err);
        }
    };

    const handleDelete = async (roomId) => {
        if (window.confirm("Delete this room category?")) {
            try {
                await api.delete(`/rooms/delete/${roomId}`);
                fetchRooms();
            } catch (err) {
                alert("Could not delete room.");
            }
        }
    };

    if (view === 'add') {
        return (
            <AddRoom 
                hotelId={hotelId} 
                onClose={() => {
                    setView('list');
                    fetchRooms();
                }} 
            />
        );
    }

    return (
        <div className="animate-fade-in text-start">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold text-dark mb-0">Room Inventory</h4>
                <button 
                    className="btn btn-primary rounded-pill px-4 d-flex align-items-center gap-2 shadow-sm" 
                    onClick={() => setView('add')}
                >
                    <PlusCircle size={18} /> Add Room Type
                </button>
            </div>

            <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr className="text-secondary small text-uppercase">
                                <th className="ps-4 py-3">Room Configuration</th>
                                <th>Capacity</th>
                                <th>Price</th>
                                <th>Size</th>
                                <th>Room ID</th>
                                <th className="text-end pe-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.length > 0 ? rooms.map((room) => (
                                <tr key={room.roomId}>
                                    <td className="ps-4">
                                        <div className="fw-bold text-primary d-flex align-items-center gap-2">
                                            <Bed size={16}/> {room.bedType} ({room.acType})
                                        </div>
                                    </td>
                                    <td><Users size={14}/> {room.maxPersons}</td>
                                    <td><IndianRupee size={14}/> {room.baseFare}</td>
                                    <td>{room.roomSize} sq.ft.</td>
                                    <td>{room.roomId}</td>
                                    <td className="text-end pe-4">
                                        <button className="btn btn-light btn-sm text-danger" onClick={() => handleDelete(room.roomId)}>
                                            <Trash2 size={14} />
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan="6" className="text-center py-5">No rooms found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageRooms;