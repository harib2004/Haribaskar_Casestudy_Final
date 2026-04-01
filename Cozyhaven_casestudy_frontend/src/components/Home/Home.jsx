import React, { useState } from 'react';
import { Container, Row, Col, Card, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Plus, Minus, Search } from 'lucide-react';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import './Home.css';

const Home = () => {

  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const navigate = useNavigate();


  const popularLocations = [
    { name: "Bangalore", img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&auto=format&fit=crop&q=60" },
    { name: "Mumbai", img: "https://pix6.agoda.net/geo/city/16850/1_16850_02.jpg?ca=6&ce=1&s=375x&ar=1x1" },
    { name: "Goa", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80" },
    { name: "Udaipur", img: "https://images.unsplash.com/photo-1706961121527-4017856774c7?w=600&auto=format&fit=crop&q=60" },
  ];

  const popularDeals = [
    { name: "20% OFF Summer Sale", img: "https://cdn6.agoda.net/images/WebCampaign/wcPD20230127/home_banner_web4/en-us.png" },
    { name: "5% OFF Flight Bundles", img: "https://cdn6.agoda.net/images/blt2/wcFlightsEvergreen2025/Web/5pct/en-us.png" },
  ];

  const adultCount = (operation) => {
    if (operation === 'add') {
      setAdults(adults + 1);
    } else {
      if (adults > 1) {
        setAdults(adults - 1);
      }
    }
  };

  const childrenCount = (operation) => {
    if (operation === 'add') {
      setChildren(children + 1);
    } else {
      if (children > 0) {
        setChildren(children - 1);
      }
    }
  };

  const handleSearch = () => {
    if (location.trim()) {
      const params = new URLSearchParams({
        checkIn: checkIn.toISOString().split('T')[0],
        checkOut: checkOut.toISOString().split('T')[0],
        adults,
        children
      });
      navigate(`/hotels/${location}?${params.toString()}`);
    } else {
        alert("Please enter a destination to start searching!");
    }
  };

  return (
    <div className="home-page">

      <header className="hero-section d-flex align-items-center justify-content-center text-center text-white">
        <div className="container px-4">
          <h1 className="display-4 fw-bold mb-3">Find your next stay</h1>
          <p className="lead mb-5 opacity-90">Get best deals on hotels</p>
          
          {/* SEARCH BAR */}
          <div className="search-box-wrapper mx-auto shadow-lg bg-white p-2 rounded-pill border" style={{ maxWidth: '1000px' }}>
            <div className="row g-0 align-items-center text-dark">
              
              {/* DESTINATION */}
              <div className="col-md-3 border-end">
                <div className="px-3 text-start">
                  <label className="small text-muted d-flex align-items-center gap-1 fw-bold mb-1">
                    <MapPin size={14} className="text-primary"/> DESTINATION
                  </label>
                  <input 
                    type="text" 
                    className="form-control border-0 p-0 shadow-none fw-semibold" 
                    placeholder="Where to?" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              {/* DATES */}
              <div className="col-md-2 border-end">
                <div className="px-3 text-start">
                  <label className="small text-muted d-flex align-items-center gap-1 fw-bold mb-1">
                    <Calendar size={14} className="text-primary"/> CHECK-IN
                  </label>
                  <DatePicker
                    selected={checkIn}
                    onChange={(date) => setCheckIn(date)}
                    minDate={new Date()}
                    dateFormat="dd MMM"
                    className="form-control border-0 p-0 shadow-none bg-transparent fw-semibold cursor-pointer"
                  />
                </div>
              </div>

              <div className="col-md-2 border-end">
                <div className="px-3 text-start">
                  <label className="small text-muted d-flex align-items-center gap-1 fw-bold mb-1">
                    <Calendar size={14} className="text-primary"/> CHECK-OUT
                  </label>
                  <DatePicker
                    selected={checkOut}
                    onChange={(date) => setCheckOut(date)}
                    minDate={checkIn}
                    dateFormat="dd MMM"
                    className="form-control border-0 p-0 shadow-none bg-transparent fw-semibold cursor-pointer"
                  />
                </div>
              </div>

              {/* GUESTS SELECTION */}
              <div className="col-md-3 border-end">
                <Dropdown className="w-100">
                  <Dropdown.Toggle as="div" className="px-3 text-start border-0 bg-transparent cursor-pointer h-100">
                    <label className="small text-muted d-flex align-items-center gap-1 fw-bold mb-1">
                      <Users size={14} className="text-primary"/> GUESTS
                    </label>
                    <div className="fw-semibold small text-truncate">
                      {adults} Adults · {children} Children
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="p-3 shadow border-0 rounded-4 mt-3" style={{ minWidth: '280px' }}>
                    {/* Adults */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <div className="fw-bold small">Adults</div>
                        <div className="text-muted extra-small">Ages 13 or above</div>
                      </div>
                      <div className="d-flex align-items-center gap-3">
                        <button className="btn btn-sm btn-outline-primary rounded-circle p-1" onClick={() => adultCount('sub')}><Minus size={14}/></button>
                        <span className="fw-bold">{adults}</span>
                        <button className="btn btn-sm btn-outline-primary rounded-circle p-1" onClick={() => adultCount('add')}><Plus size={14}/></button>
                      </div>
                    </div>
                    {/* Children */}
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fw-bold small">Children</div>
                        <div className="text-muted extra-small">Ages 0 - 12</div>
                      </div>
                      <div className="d-flex align-items-center gap-3">
                        <button className="btn btn-sm btn-outline-primary rounded-circle p-1" onClick={() => childrenCount('sub')}><Minus size={14}/></button>
                        <span className="fw-bold">{children}</span>
                        <button className="btn btn-sm btn-outline-primary rounded-circle p-1" onClick={() => childrenCount('add')}><Plus size={14}/></button>
                      </div>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              {/* SEARCH BUTTON */}
              <div className="col-md-2 ps-2 pe-1">
                <button 
                  className="btn btn-primary w-100 rounded-pill py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                  onClick={handleSearch}
                >
                  <Search size={18} /> SEARCH
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Container className="py-5">
        <h2 className="fw-bold mb-4 text-start">Popular Destinations</h2>
        <Row className="g-4">
          {popularLocations.map((loc, index) => (
            <Col md={3} sm={6} key={index}>
              <Card 
                className="location-card border-0 shadow-sm text-white overflow-hidden h-100"
                style={{ cursor: 'pointer', borderRadius: '20px' }}
              >
                <div className="card-img-wrapper position-relative" style={{ height: '220px' }}>
                  <Card.Img src={loc.img} alt={loc.name} className="h-100 w-100 object-fit-cover transition-scale" />
                  <Card.ImgOverlay className="d-flex align-items-end p-3 bg-gradient-dark">
                    <Card.Title className="fw-bold mb-0 text-white">{loc.name}</Card.Title>
                  </Card.ImgOverlay>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Container className="py-5 mb-5">
        <h2 className="fw-bold mb-4 text-start">Popular Deals</h2>
        <Row className="g-4">
          {popularDeals.map((deal, index) => (
            <Col md={6} key={index}>
              <Card 
                className="border-0 shadow-sm text-white overflow-hidden shadow-hover"
                style={{ cursor: 'pointer', borderRadius: '20px', aspectRatio: '21 / 9' }}
              >
                <Card.Img src={deal.img} alt={deal.name} className="h-100 w-100 object-fit-cover" />
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;