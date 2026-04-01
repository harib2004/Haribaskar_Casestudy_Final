package com.hexaware.cozyhaven.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomDTO {
    private Integer roomId;
    private String bedType;
    private double baseFare;
    private int maxPersons;
    private String roomSize;
    private String acType;
    private int totalRooms;
    private Integer hotelId; 
    private String imageUrl;
}
