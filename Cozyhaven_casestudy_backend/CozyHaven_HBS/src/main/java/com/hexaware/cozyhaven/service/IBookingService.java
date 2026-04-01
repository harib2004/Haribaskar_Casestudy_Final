package com.hexaware.cozyhaven.service;

import java.time.LocalDate;
import java.util.List;

import com.hexaware.cozyhaven.dto.BookingRequest;
import com.hexaware.cozyhaven.entity.Booking;
import com.hexaware.cozyhaven.entity.Room;

public interface IBookingService {
	
	public Booking createBooking(Booking booking);
    public List<Booking> getAllBookings();
    public Booking getBookingById(Integer bookingId);
    public List<Booking>  getBookingsByHotel(Integer hotelId);
    public List<Booking> getBookingsByUser(Integer userId);   
    public double calculateTotalAmount(Room room,int adults,int children,int quantity,LocalDate checkIn,LocalDate checkOut);   
    public Booking createBooking(Integer userId, Integer roomId, int adults, int children,int quantity, LocalDate checkIn, LocalDate checkOut, String paymentMethod);
    public Booking cancelBooking(Integer bookingId);

}
