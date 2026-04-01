import React from 'react';
import './PropertyCard.css';

const PropertyCard = ({ hotel }) => {
  return (
    <div className="card property-card h-100 shadow-sm border-0">
      <div className="position-relative">
        <img src={hotel.image} className="card-img-top hotel-img" alt={hotel.name} />
        <span className="badge bg-primary position-absolute top-0 end-0 m-2">
          {hotel.discount}% OFF
        </span>
      </div>
      <div className="card-body">
        <h5 className="card-title text-truncate">{hotel.name}</h5>
        <p className="text-muted small mb-1">{hotel.location}</p>
        
        <div className="d-flex align-items-center mb-2">
          <span className="rating-box me-2">{hotel.rating}</span>
          <span className="text-primary fw-bold small">Excellent</span>
          <span className="text-muted small ms-auto">{hotel.reviews} reviews</span>
        </div>

        <div className="text-end">
          <p className="mb-0 text-muted text-decoration-line-through small">
            USD {hotel.originalPrice}
          </p>
          <p className="h5 fw-bold text-danger mb-0">
            USD {hotel.discountPrice}
          </p>
          <small className="text-muted">Per night</small>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;