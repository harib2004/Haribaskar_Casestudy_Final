package com.hexaware.cozyhaven.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.cozyhaven.dto.HotelDTO;
import com.hexaware.cozyhaven.entity.Hotel;
import com.hexaware.cozyhaven.service.IHotelService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/hotels")
public class HotelController {

    @Autowired
    private IHotelService hotelService;

    @PostMapping("/add")
    public String addHotel(@Valid @RequestBody Hotel hotel) {
        hotelService.addHotel(hotel);
        return "Hotel added Successfully";
    }

    @GetMapping("/{hotelId}")
    public HotelDTO getHotelById(@PathVariable int hotelId) {
        Hotel hotel = hotelService.getHotelById(hotelId);
        return setDTO(hotel);
    }

    @GetMapping("/all")
    public List<HotelDTO> getAllHotels() {
        List<Hotel> hotels = hotelService.getAllHotels();
        List<HotelDTO> hotelsDto = new ArrayList<>();
        for (Hotel hotel : hotels) {
            hotelsDto.add(setDTO(hotel));
        }
        return hotelsDto;
    }
    
    @GetMapping("/search/{location}")
    public List<HotelDTO> getHotelsByLocation(@PathVariable String location) {
        List<Hotel> hotels = hotelService.getHotelsByLocation(location);
        List<HotelDTO> hotelsDto = new ArrayList<>();
        for (Hotel hotel : hotels) {
            hotelsDto.add(setDTO(hotel));
        }
        return hotelsDto;
    }
    
    @GetMapping("/owner-search/{userId}")
    public List<HotelDTO> getHotelsByOwner(@PathVariable Integer userId) {
        List<Hotel> hotels = hotelService.getByOwnerId(userId);
        List<HotelDTO> hotelsDto = new ArrayList<>();
        for (Hotel hotel : hotels) {
            hotelsDto.add(setDTO(hotel));
        }
        return hotelsDto;
    }
    
    @DeleteMapping("/delete/{hotelId}")
    public String deleteHotel(@PathVariable int hotelId) {
        Hotel hotel = hotelService.getHotelById(hotelId);
        if (hotel == null) {
            return "Hotel not found";
        } else {
            hotelService.deleteHotel(hotelId);
            return "Hotel with ID " + hotelId + " deleted successfully";
        }
    }

    @PutMapping("/update/{hotelId}")
    public HotelDTO updateHotel(@PathVariable Integer hotelId, @Valid @RequestBody Hotel hotelDetails) {
        Hotel updatedHotel = hotelService.updateHotel(hotelId, hotelDetails);
        return setDTO(updatedHotel);
    }

    
    private HotelDTO setDTO(Hotel hotel) {
        HotelDTO dto = new HotelDTO();
        dto.setHotelId(hotel.getHotelId());
        dto.setName(hotel.getName());
        dto.setLocation(hotel.getLocation());
        dto.setDescription(hotel.getDescription());
        dto.setImageUrl(hotel.getImageUrl());
        dto.setOwnerId(hotel.getOwner().getUserId());
        
        return dto;
    }
}