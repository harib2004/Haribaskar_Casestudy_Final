package com.hexaware.cozyhaven.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexaware.cozyhaven.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    Payment findByBookingBookingId(Integer bookingId);
}
