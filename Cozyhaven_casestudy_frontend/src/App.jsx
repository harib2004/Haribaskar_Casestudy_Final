import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import RegisterOwner from './components/Register/RegisterOwner';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HotelList from './components/HotelList/HotelList';
import RoomList from './components/RoomList/RoomList';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import OwnerDashboard from './components/OwnerDashboard/OwnerDashboard';
import BookingForm from './components/BookingForm/BookingForm';
import RegisterAdmin from './components/Register/RegisterAdmin';
import UserProfile from './components/UserProfile/UserProfile';
import UpdateUser from './components/UserProfile/UpdateUser';
import ImageUploader from './services/ImageUploader';


function App() {
  return (
   
    <Router>
      <Navbar/>
      <ToastContainer 
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/owner" element={<OwnerDashboard/>} />
        <Route path="/profile" element={<UserProfile/>} />
        <Route path="/update-profile" element={<UpdateUser/>} />
        <Route path="/image-upload" element={<ImageUploader/>} />
        <Route path="/booking/:roomId" element={<BookingForm/>} />
        <Route path="/register-owner" element={<RegisterOwner/>} />
        <Route path="/register-admin" element={<RegisterAdmin/>} />
        <Route path="/hotels/:searchLocation" element={<HotelList/>} />
        <Route path="/hotel/:hotelId/rooms" element={<RoomList/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;