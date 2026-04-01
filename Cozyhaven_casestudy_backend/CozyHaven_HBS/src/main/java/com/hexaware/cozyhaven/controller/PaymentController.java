package com.hexaware.cozyhaven.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hexaware.cozyhaven.dto.PaymentDTO;
import com.hexaware.cozyhaven.entity.Payment;
import com.hexaware.cozyhaven.service.IPaymentService;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private IPaymentService paymentService;

    @PostMapping("/make")
    public PaymentDTO makePayment(@RequestBody Payment payment) {
        Payment savedPayment = paymentService.makePayment(payment);
        return setDTO(savedPayment);
    }

    @GetMapping("/getall")
    public List<PaymentDTO> getAllPayments() {
        List<PaymentDTO> paymentDTO = new ArrayList<>();
        List<Payment> payments = paymentService.getAllPayments();
        for (Payment p : payments) {
            paymentDTO.add(setDTO(p));
        }
        return paymentDTO;
    }

    @GetMapping("/{paymentId}")
    public PaymentDTO getPaymentById(@PathVariable int paymentId) {
        Payment payment = paymentService.getPaymentById(paymentId);
        return setDTO(payment);
    }

    @GetMapping("/booking/{bookingId}")
    public PaymentDTO getPaymentByBooking(@PathVariable int bookingId) {
        Payment payment = paymentService.getPaymentByBooking(bookingId);
        return setDTO(payment);
    }

  
    public PaymentDTO setDTO(Payment payment) {      
        PaymentDTO dto = new PaymentDTO();
        dto.setPaymentId(payment.getPaymentId());
        dto.setAmount(payment.getAmount());
        dto.setPaymentDate(payment.getPaymentDate());
        dto.setPaymentMethod(payment.getPaymentMethod());
        dto.setStatus(payment.getStatus());
        dto.setBookingId(payment.getBooking().getBookingId());
               
        return dto;
    }
}