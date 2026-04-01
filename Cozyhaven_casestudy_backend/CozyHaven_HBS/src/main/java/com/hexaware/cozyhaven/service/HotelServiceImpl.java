package com.hexaware.cozyhaven.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.cozyhaven.entity.Hotel;
import com.hexaware.cozyhaven.exception.ResourceNotFoundException;
import com.hexaware.cozyhaven.repository.HotelRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class HotelServiceImpl implements IHotelService {

    @Autowired
    private HotelRepository hotelRepository;

    @Override
    public Hotel addHotel(Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    @Override
    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    @Override
    public Hotel getHotelById(Integer hotelId) {
        return hotelRepository.findById(hotelId).orElseThrow(() -> new ResourceNotFoundException("Hotel with ID: "+hotelId+" not found"));
                
    }

    @Override
    public List<Hotel> getHotelsByLocation(String location) {
        return hotelRepository.findByLocation(location);
    }
    
    @Override
    public List<Hotel> getByOwnerId(Integer userId){
    	return hotelRepository.findByOwnerUserId(userId);
    }
    
    @Override
    public Hotel updateHotel(Integer hotelId, Hotel updatedHotel) {
        Hotel existingHotel = hotelRepository.findById(hotelId).orElse(null);
        if(existingHotel!=null) {
        	 existingHotel.setName(updatedHotel.getName());
             existingHotel.setLocation(updatedHotel.getLocation());
             existingHotel.setDescription(updatedHotel.getDescription());
             existingHotel.setImageUrl(updatedHotel.getImageUrl());
             return hotelRepository.save(existingHotel);
        }
        else {
        	log.error("Hotel not found");
        	return null;
        }
        	
       
    }

    @Override
    public void deleteHotel(Integer hotelId) {
    	Hotel existingHotel = hotelRepository.findById(hotelId).orElse(null);
    	if(existingHotel!=null) {
    		hotelRepository.deleteById(hotelId);
            log.warn("Hotel deleted");
    	}
    	else {
    		log.error("Hotel not found");
    	}
        
    }
}
