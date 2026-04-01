package com.hexaware.cozyhaven.dto;

import java.time.LocalDate;

public class PaymentRequest {
	
	private Integer paymentId;
    private double amount;
    private LocalDate paymentDate;
    private String paymentMethod;  
    private String status;
    private Integer bookingId;
}
