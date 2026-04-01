package com.hexaware.cozyhaven.service;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.hexaware.cozyhaven.entity.*;
import com.hexaware.cozyhaven.repository.*;

@SpringBootTest
@Transactional
@DisplayName("BOOKING_SERVICE")
class BookingServiceImplIntegrationTest {

	@Autowired
    private IBookingService bookingService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    private User owner;
    private Room room;

    @BeforeEach
    void setUp() {
        owner = new User();
        owner.setName("hari");
        owner.setEmail("hari@gmail.com");
        owner = userRepository.save(owner);
        room = new Room();
        room.setBaseFare(1000.0);
        room.setMaxPersons(2);
        room = roomRepository.save(room);
        
    }

    @Test
    @DisplayName("CALCULATE_TOTAL_AMOUNT")
    void testCalculateTotalAmount() {
        LocalDate checkIn = LocalDate.of(2026, 3, 10);
        LocalDate checkOut = LocalDate.of(2026, 3, 15);      
        double amount = bookingService.calculateTotalAmount(room, 2, 0, 1, checkIn, checkOut);    
        assertEquals(2000.0, amount);        
    }

//    @Test
//    @DisplayName("CREATE_BOOKING")
//    void testCreateBooking() {
//        Booking booking = bookingService.createBooking(owner.getUserId(), room.getRoomId(), 2, 0, 1, LocalDate.of(2026, 3, 10), LocalDate.of(2026, 3, 15));
//        assertNotNull(booking.getBookingId());
//        assertEquals("CONFIRMED", booking.getStatus());       
//    }

//    @Test
//    void testGetBookingsByUser() {
//        bookingService.createBooking(owner.getUserId(), room.getRoomId(), 2, 0, 1,LocalDate.of(2026, 3, 10),LocalDate.of(2026, 3, 15));        
//        List<Booking> list = bookingService.getBookingsByUser(owner.getUserId());
//        assertFalse(list.isEmpty());
//    }

    @Test
    @DisplayName("GET_ALL_BOOKINGS")
    void testGetAllBookings() {
        List<Booking> all = bookingService.getAllBookings();
        assertNotNull(all);
    }

//    @Test
//    void testGetBookingById() {
//        Booking booking1 = bookingService.createBooking(owner.getUserId(), room.getRoomId(), 2, 0, 1, LocalDate.now(), LocalDate.now().plusDays(1));       
//        Booking booking2 = bookingService.getBookingById(booking1.getBookingId());
//        assertEquals(booking1.getBookingId(), booking2.getBookingId());
//    }
}