package com.hexaware.cozyhaven.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HotelDTO {
    private Integer hotelId;
    private String name;
    private String location;
    private String description;
    private Integer ownerId;
    private String imageUrl;
}
