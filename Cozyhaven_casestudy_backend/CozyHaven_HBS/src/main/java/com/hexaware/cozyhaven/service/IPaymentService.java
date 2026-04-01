package com.hexaware.cozyhaven.service;

import java.util.List;

import com.hexaware.cozyhaven.entity.Payment;

public interface IPaymentService {
	
	public Payment makePayment(Payment payment);
    public List<Payment> getAllPayments();
    public Payment getPaymentById(Integer paymentId);
    public Payment getPaymentByBooking(Integer bookingId);
}
