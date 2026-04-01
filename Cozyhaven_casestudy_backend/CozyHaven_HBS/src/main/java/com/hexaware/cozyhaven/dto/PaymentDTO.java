package com.hexaware.cozyhaven.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDTO {
    private Integer paymentId;
    private double amount;
    private LocalDate paymentDate;
    private String paymentMethod;
    private String status;
    private Integer bookingId;
}