package com.hexaware.cozyhaven.service;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.hexaware.cozyhaven.entity.Hotel;
import com.hexaware.cozyhaven.entity.User;
import com.hexaware.cozyhaven.repository.UserRepository;

@SpringBootTest
@Transactional
@DisplayName("HOTEL_SERVICE")
class HotelServiceImplTest {

    @Autowired
    private IHotelService hotelService;

    @Autowired
    private UserRepository userRepository;

    private Hotel hotel;
    private User owner;

    @BeforeEach
    void setUp() {
        owner = new User();
        owner.setName("hari");
        owner.setEmail("hari@gmail.com");
        owner = userRepository.save(owner);

        hotel = new Hotel();
        hotel.setName("Cozy Haven Salem");
        hotel.setLocation("Salem");
        hotel.setDescription("Luxury stay in the heart of the city");
        hotel.setOwner(owner);
        hotel = hotelService.addHotel(hotel);
    }

    @Test
    @DisplayName("ADD_HOTEL")
    void testAddHotel() {
        assertNotNull(hotel.getHotelId());
    }

    @Test
    @DisplayName("GET_ALL_HOTELS")
    void testGetAllHotels() {
        List<Hotel> hotels = hotelService.getAllHotels();
        assertFalse(hotels.isEmpty());
    }

    @Test
    void testGetHotelById() {
        Hotel fetched = hotelService.getHotelById(hotel.getHotelId());
        assertEquals("Cozy Haven Salem", fetched.getName());
    }

    @Test
    void testGetHotelsByLocation() {
        List<Hotel> hotels = hotelService.getHotelsByLocation("Salem");
        assertFalse(hotels.isEmpty());
        assertEquals("Salem", hotels.get(0).getLocation());
    }

    @Test
    @DisplayName("UPDATE_HOTEL")
    void testUpdateHotel() {
        Hotel updatedInfo = new Hotel();
        updatedInfo.setName("Cozy Haven Premium");
        updatedInfo.setLocation("Salem City");
        updatedInfo.setDescription("Newly renovated");
        Hotel result = hotelService.updateHotel(hotel.getHotelId(), updatedInfo);        
        assertEquals("Cozy Haven Premium", result.getName());
        assertEquals("Salem City", result.getLocation());
    }

    @Test
    @DisplayName("DELETE_HOTEL")
    void testDeleteHotel() {
        Integer id = hotel.getHotelId();
        hotelService.deleteHotel(id);       
        Hotel deletedHotel = hotelService.getHotelById(id);
        assertNull(deletedHotel);

    }
}