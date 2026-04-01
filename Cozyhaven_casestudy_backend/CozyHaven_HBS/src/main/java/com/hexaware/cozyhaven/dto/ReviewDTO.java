package com.hexaware.cozyhaven.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDTO {
    private Integer reviewId;
    private int rating;
    private String comment;
    private LocalDate reviewDate;
    private Integer userId; 
    private Integer hotelId; 
}