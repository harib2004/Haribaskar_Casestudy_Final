package com.hexaware.cozyhaven.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.cozyhaven.entity.Payment;
import com.hexaware.cozyhaven.exception.ResourceNotFoundException;
import com.hexaware.cozyhaven.repository.PaymentRepository;

@Service
public class PaymentServiceImpl implements IPaymentService {
	
	@Autowired
    private PaymentRepository paymentRepository;

    @Override
    public Payment makePayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    @Override
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @Override
    public Payment getPaymentById(Integer paymentId) {
        return paymentRepository.findById(paymentId).orElseThrow(() -> new ResourceNotFoundException("Payment not found"));              
    }

    @Override
    public Payment getPaymentByBooking(Integer bookingId) {
        return paymentRepository.findByBookingBookingId(bookingId);
    }
}
