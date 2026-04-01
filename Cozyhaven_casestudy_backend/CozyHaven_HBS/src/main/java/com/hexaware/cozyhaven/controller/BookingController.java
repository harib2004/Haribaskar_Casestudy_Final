package com.hexaware.cozyhaven.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.cozyhaven.dto.BookingDTO;
import com.hexaware.cozyhaven.dto.BookingRequest;
import com.hexaware.cozyhaven.entity.Booking;
import com.hexaware.cozyhaven.entity.Room;
import com.hexaware.cozyhaven.service.IBookingService;
import com.hexaware.cozyhaven.service.IRoomService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private IBookingService bookingService;
    
    @Autowired
    private IRoomService roomService;

    @PostMapping("/create")
    public BookingDTO createBooking(@RequestBody BookingRequest request) {
        Booking booking = bookingService.createBooking(
            request.getUserId(), 
            request.getRoomId(), 
            request.getAdults(), 
            request.getChildren(), 
            request.getQuantity(), 
            request.getCheckIn(), 
            request.getCheckOut(),
            request.getPaymentMethod()       
          );
        
        return setDTO(booking);
    }
    
    @PostMapping("/calculate-total")
    public double calculateTotal(@RequestBody BookingRequest request) {
        Room room = roomService.getRoomById(request.getRoomId());
        return bookingService.calculateTotalAmount(
            room, 
            request.getAdults(), 
            request.getChildren(), 
            request.getQuantity(), 
            request.getCheckIn(), 
            request.getCheckOut()
        );
    }

    @GetMapping("/all")
    public List<BookingDTO> getAllBookings() {
    	List<BookingDTO> bookings = new ArrayList<>();
    	List<Booking> booking = bookingService.getAllBookings();
    	for(Booking b : booking) {
    		bookings.add(setDTO(b));
    	}
        return bookings;
    }

    @GetMapping("/{bookingId}")
    public BookingDTO getBookingById(@PathVariable int bookingId) {
    	Booking booking = bookingService.getBookingById(bookingId);
    	BookingDTO bookingDTO = setDTO(booking);
        return bookingDTO;
    }

    @GetMapping("/user/{userId}")
    public List<BookingDTO> getBookingsByUser(@PathVariable int userId) {
    	List<BookingDTO> bookings = new ArrayList<>();
    	List<Booking> booking = bookingService.getBookingsByUser(userId);
    	for(Booking b : booking) {
    		bookings.add(setDTO(b));
    	}
        return bookings;

    }
    
    @GetMapping("/hotel/{hotelId}")
    public List<BookingDTO> getBookingsByHotel(@PathVariable int hotelId) {
    	List<BookingDTO> bookings = new ArrayList<>();
    	List<Booking> booking = bookingService.getBookingsByHotel(hotelId);
    	for(Booking b : booking) {
    		bookings.add(setDTO(b));
    	}
        return bookings;

    }
    
    @PutMapping("/cancel/{bookingId}")
    public String cancelBooking(@PathVariable Integer bookingId) {
    	bookingService.cancelBooking(bookingId);
    	return "Booking cancelled.";
    }
    
    
    public BookingDTO setDTO(Booking booking) {
        BookingDTO dto = new BookingDTO();
        dto.setBookingId(booking.getBookingId());
        dto.setAdults(booking.getAdults());
        dto.setChildren(booking.getChildren());
        dto.setQuantity(booking.getQuantity());
        dto.setCheckInDate(booking.getCheckInDate());
        dto.setCheckOutDate(booking.getCheckOutDate());
        dto.setTotalAmount(booking.getTotalAmount());
        dto.setStatus(booking.getStatus());       
        dto.setUserId(booking.getUser().getUserId());
        dto.setRoomId(booking.getRoom().getRoomId());
        
        return dto;
    }
    
}