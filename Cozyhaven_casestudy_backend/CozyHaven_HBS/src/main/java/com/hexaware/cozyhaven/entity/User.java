package com.hexaware.cozyhaven.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId; 

    @NotBlank(message = "Name is required")
    private String name;
    
    @Column(unique = true, nullable = false)
    @Email(message = "Please provide a valid email address")
    @NotBlank(message = "Email is required")
    private String email;
    
    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;

    private String gender;

    @Size(min = 10, max = 10, message = "Phone number must be exactly 10 digits")
    @Digits(integer = 10, fraction = 0, message = "Phone number must contain only numeric digits")
    private String phone;

    private String address;
    
    @Enumerated(EnumType.STRING)
    @NotNull(message = "Role is required")
    private Role role;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<Hotel> hotels;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Review> reviews;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Booking> bookings;
}