package com.hexaware.cozyhaven.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.cozyhaven.dto.AuthResponse;
import com.hexaware.cozyhaven.dto.LoginRequest;
import com.hexaware.cozyhaven.dto.UserDTO;
import com.hexaware.cozyhaven.entity.User;
import com.hexaware.cozyhaven.service.IUserService;
import com.hexaware.cozyhaven.service.JwtService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private IUserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @PostMapping("/register")
    public String registerUser(@Valid @RequestBody User user) { 
        userService.registerUser(user);
        return "User Registered";
    }
    
    @PostMapping("/login")
    public UserDTO login(@RequestBody LoginRequest loginRequest) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        User user = userService.getUserByEmail(loginRequest.getEmail());
        
        String token = jwtService.generateToken(user.getEmail());
        UserDTO dto = setDTO(user);
        dto.setToken(token); 

        return dto;
    }
    
//    @PostMapping("/login")
//    public UserDTO login(@RequestBody LoginRequest loginRequest) {
//        User user = userService.getUserByEmail(loginRequest.getEmail());
//
//        if (user == null) {
//            throw new RuntimeException("User not found"); // Better than returning null
//        }
//
//        boolean isMatch = passwordEncoder.matches(loginRequest.getPassword(), user.getPassword());
//
//        if (isMatch) {
//        	UserDTO dto = setDTO(user);
//            
//            
//            return dto;
//        } else {
//            throw new RuntimeException("Invalid credentials");
//        }
//    }
    
   
    @GetMapping("/{userId}")
    public UserDTO getUserById(@PathVariable Integer userId) { 
        User user = userService.getUserById(userId);
        return setDTO(user);
    }

    @GetMapping("/all")
    public List<UserDTO> getAllUsers() {
        List<User> users = userService.getAllUsers();
        List<UserDTO> usersDto = new ArrayList<>();
        for (User user : users) {
            usersDto.add(setDTO(user));
        }
        return usersDto;
    }
    
    @DeleteMapping("/delete/{userId}")
    public String deleteUser(@PathVariable Integer userId) {
        userService.deleteUser(userId);
        return "User with ID " + userId + " deleted";
    }
    
    @PutMapping("/update/{userId}")
    public UserDTO updateUser(@PathVariable Integer userId, @Valid @RequestBody UserDTO userDetails) {
        User updatedUser = userService.updateUser(userId, userDetails);
        return setDTO(updatedUser);
    }
    
    private UserDTO setDTO(User user) {
        if (user == null) return null;
        UserDTO dto = new UserDTO();
        dto.setUserId(user.getUserId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setGender(user.getGender());
        dto.setPhone(user.getPhone());
        dto.setAddress(user.getAddress());
        dto.setRole(user.getRole());
        return dto;
    }
}