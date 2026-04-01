package com.hexaware.cozyhaven.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hexaware.cozyhaven.dto.UserDTO;
import com.hexaware.cozyhaven.entity.User;
import com.hexaware.cozyhaven.exception.ResourceNotFoundException;
import com.hexaware.cozyhaven.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserServiceImpl implements IUserService {

	 	@Autowired
	    private UserRepository userRepository;
	 	
	 	@Autowired
	 	private PasswordEncoder passwordEncoder;

	    @Override
	    public User registerUser(User user) {
	    	String encodedPassword = passwordEncoder.encode(user.getPassword());
	        user.setPassword(encodedPassword);
	        return userRepository.save(user);
	    }

	    @Override
	    public List<User> getAllUsers() {
	        return userRepository.findAll();
	    }

	    @Override
	    public User getUserById(Integer userId) {
	        return userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User with ID: "+userId+" not found"));
	    }
	    
	    @Override
	    public User getUserByEmail(String email) {
	        return userRepository.findByEmail(email);
	    }
	    
	    @Override
	    public void deleteUser(Integer userId) {
	            userRepository.deleteById(userId);
	            log.warn("User deleted");
	    }
	    
	    @Override
	    public User updateUser(Integer userId, UserDTO updatedUser) {
	        User user = userRepository.findById(userId).orElse(null);
	        if(user!=null) {
	        	user.setName(updatedUser.getName());
		        user.setEmail(updatedUser.getEmail());
		        user.setGender(updatedUser.getGender());
		        user.setPhone(updatedUser.getPhone());
		        user.setAddress(updatedUser.getAddress());
		        return userRepository.save(user);
	        }
	        else {
	        	log.error("User not found");
	        	return null;
	        }
	        
	    }
}
