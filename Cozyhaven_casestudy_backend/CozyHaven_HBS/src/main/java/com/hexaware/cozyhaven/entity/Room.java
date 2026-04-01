package com.hexaware.cozyhaven.entity;

import java.util.List;
import jakarta.persistence.*;
import jakarta.validation.constraints.*; // Added for validation
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roomId;

    @NotBlank(message = "Bed type is required")
    private String bedType;

    @Positive(message = "Base fare must be a positive value") 
    private double baseFare;

    @Min(value = 1, message = "Maximum persons allowed must be at least 1")
    private int maxPersons;

    @NotBlank(message = "Room size is required")
    private String roomSize;

    @NotBlank(message = "AC type is required")
    private String acType;

    @Min(value = 1, message = "Total rooms count must be at least 1")
    private int totalRooms;
    
    private String imageUrl;
    
    @ManyToOne
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;
    
    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
    private List<Booking> bookings;

}