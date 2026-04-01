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
@DisplayName("PAYMENT_SERVICE")
class PaymentServiceImplTest2 {

    @Autowired
    private IPaymentService paymentService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private BookingRepository bookingRepository;

    private Payment payment;
    private Booking booking;

    @BeforeEach
    void setUp() {
        User user = new User();
        user.setName("hari");
        user.setEmail("hari@gmail.com");
        user = userRepository.save(user);

        Room room = new Room();
        room.setBaseFare(1500.0);
        room = roomRepository.save(room);

        booking = new Booking();
        booking.setUser(user);
        booking.setRoom(room);
        booking.setTotalAmount(3000.0);
        booking.setStatus("CONFIRMED");
        booking = bookingRepository.save(booking);

        payment = new Payment();
        payment.setAmount(3000.0);
        payment.setPaymentDate(LocalDate.now());
        payment.setStatus("SUCCESS");
        payment.setBooking(booking);
        payment = paymentService.makePayment(payment);
    }

    @Test
    @DisplayName("MAKE_PAYMENT")
    void testMakePayment() {
        assertNotNull(payment.getPaymentId());
        assertEquals("SUCCESS", payment.getStatus());
    }

    @Test
    @DisplayName("GET_ALL_PAYMENTS")
    void testGetAllPayments() {
        List<Payment> payments = paymentService.getAllPayments();
        assertFalse(payments.isEmpty());
    }

    @Test
    void testGetPaymentById() {
        Payment payment1 = paymentService.getPaymentById(payment.getPaymentId());
        assertNotNull(payment1);
        assertEquals(3000.0, payment1.getAmount());
    }

    @Test
    void testGetPaymentByBooking() {
        Payment payment1 = paymentService.getPaymentByBooking(booking.getBookingId());
        assertNotNull(payment1);
        assertEquals(payment.getPaymentId(), payment1.getPaymentId());
    }
}