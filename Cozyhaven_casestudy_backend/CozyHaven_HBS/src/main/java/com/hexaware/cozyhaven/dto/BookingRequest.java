package com.hexaware.cozyhaven.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingRequest {
	private int userId;
    private int roomId;
    private int adults;
    private int children;
    private int quantity;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private String paymentMethod;
    
}
