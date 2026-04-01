package com.hexaware.cozyhaven.service;

import java.util.List;

import com.hexaware.cozyhaven.dto.UserDTO;
import com.hexaware.cozyhaven.entity.User;

public interface IUserService {

    public User registerUser(User user);
    public List<User> getAllUsers();
    public User getUserById(Integer userId);
    public void deleteUser(Integer userId);
    public User updateUser(Integer userId, UserDTO updatedUser);
    public User getUserByEmail(String email);
}
