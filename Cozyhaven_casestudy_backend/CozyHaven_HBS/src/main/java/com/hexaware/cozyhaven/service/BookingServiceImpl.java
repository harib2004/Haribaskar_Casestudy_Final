package com.hexaware.cozyhaven.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.cozyhaven.dto.BookingRequest;
import com.hexaware.cozyhaven.entity.Booking;
import com.hexaware.cozyhaven.entity.Payment;
import com.hexaware.cozyhaven.entity.Room;
import com.hexaware.cozyhaven.entity.User;
import com.hexaware.cozyhaven.exception.ResourceNotFoundException;
import com.hexaware.cozyhaven.repository.BookingRepository;
import com.hexaware.cozyhaven.repository.PaymentRepository;
import com.hexaware.cozyhaven.repository.RoomRepository;
import com.hexaware.cozyhaven.repository.UserRepository;

@Service
public class BookingServiceImpl implements IBookingService{
	
		@Autowired
	    private BookingRepository bookingRepository;
		
		@Autowired
		private UserRepository userRepository;
		
		@Autowired
		private RoomRepository roomRepository;
		
		@Autowired
		private PaymentRepository paymentRepository;

		
		@Override
		public Booking createBooking(Booking booking) {
			return bookingRepository.save(booking);
		}
	    @Override
	    public List<Booking> getAllBookings() {
	        return bookingRepository.findAll();
	    }

	    @Override
	    public Booking getBookingById(Integer bookingId) {
	        return bookingRepository.findById(bookingId)
	                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
	    }

	    @Override
	    public List<Booking> getBookingsByUser(Integer userId) {
	        return bookingRepository.findByUserUserId(userId);
	    }
	    
	    @Override
	    public List<Booking> getBookingsByHotel(Integer hotelId) {
	        return bookingRepository.findByRoomHotelHotelId(hotelId);
	    }
	    
	    @Override
	    public double calculateTotalAmount(Room room,int adults,int children,int quantity,LocalDate checkIn,LocalDate checkOut){
	    	double baseFare = room.getBaseFare();
	    	int capacity = room.getMaxPersons();
	    	String bedType = room.getBedType();
	    	int totalPeople = adults + children;
	    	int extraPeople = Math.max(0, totalPeople - capacity);
	    	int extraAdult = Math.max(0, adults - capacity);
	    	int extraChild = Math.max(0,extraPeople - extraAdult);
	    	double extraCharge = (extraAdult * baseFare * 0.40) + (extraChild * baseFare * 0.20);
	    	double pricePerNight = baseFare + extraCharge;
	    	long nights = checkOut.toEpochDay() - checkIn.toEpochDay();
	    	return pricePerNight * nights * quantity;
	    }
	    
	    @Override
	    public Booking createBooking(Integer userId, Integer roomId, int adults, int children,int quantity, LocalDate checkIn, LocalDate checkOut , String paymentMethod){
	        User user = userRepository.findById(userId).orElse(null);
	        Room room = roomRepository.findById(roomId).orElse(null);
	        double totalAmount = calculateTotalAmount(room, adults, children, quantity, checkIn, checkOut);

	        
	        Booking booking = new Booking();
	        booking.setUser(user);
	        booking.setRoom(room);
	        booking.setAdults(adults);
	        booking.setChildren(children);
	        booking.setQuantity(quantity);
	        booking.setCheckInDate(checkIn);
	        booking.setCheckOutDate(checkOut);
	        booking.setTotalAmount(totalAmount);
	        booking.setStatus("CONFIRMED");
	        Booking savedBooking = bookingRepository.save(booking);

	        
	        Payment payment = new Payment();
	        payment.setBooking(savedBooking);
	        payment.setAmount(totalAmount);
	        payment.setPaymentDate(LocalDate.now());
	        payment.setPaymentMethod(paymentMethod);
	        payment.setStatus("SUCCESS");
	        paymentRepository.save(payment);

	        return savedBooking;
	    }
	    
	    @Override
	    public Booking cancelBooking(Integer bookingId) {
	        Booking booking = bookingRepository.findById(bookingId)
	            .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));   
	        booking.setStatus("CANCELLED");
	        return bookingRepository.save(booking);

	      
	    }
	    

}
