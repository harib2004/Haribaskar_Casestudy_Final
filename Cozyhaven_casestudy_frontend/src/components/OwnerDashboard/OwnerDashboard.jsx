import React from 'react';
import OwnerHotels from './OwnerHotels';
import { useAuth } from '../AuthContext/AuthContext';

const OwnerDashboard = () => {
    const { user } = useAuth();
    const ownerId = user.userId; 

    return (
        <div className="container py-5">
            <header className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-5">
                <div>
                    <h2 className="fw-bold text-dark mb-0">Owner Dashboard</h2>
                </div>
                <span className="badge bg-primary px-3 py-2 rounded-pill">Owner ID: {ownerId}</span>
            </header>

            <OwnerHotels ownerId={ownerId} />
        </div>
    );
};

export default OwnerDashboard;