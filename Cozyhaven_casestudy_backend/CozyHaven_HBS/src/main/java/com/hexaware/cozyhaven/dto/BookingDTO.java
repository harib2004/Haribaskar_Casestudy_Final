package com.hexaware.cozyhaven.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDTO {
    private Integer bookingId;
    private int adults;
    private int children;
    private int quantity;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private double totalAmount;
    private String status;
    private Integer userId;
    private Integer roomId; 
}