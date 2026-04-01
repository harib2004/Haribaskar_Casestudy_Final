package com.hexaware.cozyhaven.dto;

import com.hexaware.cozyhaven.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Integer userId;
    private String name;
    private String email;
    private String gender;
    private String phone;
    private String address;
    private Role role;
    private String token; //JWT Token
}