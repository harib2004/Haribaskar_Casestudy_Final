package com.hexaware.cozyhaven.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.hexaware.cozyhaven.entity.Hotel;
import com.hexaware.cozyhaven.entity.Room;
import com.hexaware.cozyhaven.entity.User;
import com.hexaware.cozyhaven.repository.HotelRepository;
import com.hexaware.cozyhaven.repository.UserRepository;

@SpringBootTest
@Transactional
@DisplayName("ROOM_SERVICE")
class RoomServiceImplTest {

	@Autowired
    private IRoomService roomService;

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private UserRepository userRepository;

    private Hotel hotel;
    private Room room;

    @BeforeEach
    void setUp() {
        User owner = new User();
        owner.setName("hari");
        owner.setEmail("hari@gmail.com");
        owner = userRepository.save(owner);
        hotel = new Hotel();
        hotel.setName("Cozy Palace");
        hotel.setLocation("Salem");
        hotel.setOwner(owner);
        hotel = hotelRepository.save(hotel);

        
        room = new Room();
        room.setBedType("Deluxe King");
        room.setBaseFare(2000.0);
        room.setTotalRooms(10);
        room.setHotel(hotel);
        room = roomService.addRoom(room);
    }

    @Test
    @DisplayName("ADD_ROOM")
    void testAddRoom() {
        assertNotNull(room.getRoomId());
    }

    @Test
    @DisplayName("ADD_MULTIPLE_ROOMS")
    void testAddMultipleRooms() {
        List<Room> rooms = new ArrayList<>();
        Room r1 = new Room();
        r1.setBedType("Standard");
        r1.setHotel(hotel);
        rooms.add(r1);
        List<Room> saved = roomService.addMultipleRooms(rooms);
        assertFalse(saved.isEmpty());
    }

    @Test
    @DisplayName("GET_ALL_ROOMS")
    void testGetAllRooms() {
        List<Room> allRooms = roomService.getAllRooms();
        assertTrue(allRooms.size() >= 1);       
    }

    @Test
    void testGetRoomById() {
        Room fetched = roomService.getRoomById(room.getRoomId());
        assertEquals("Deluxe King", fetched.getBedType());       
    }

    @Test
    void testGetRoomsByHotel() {
        List<Room> hotelRooms = roomService.getRoomsByHotel(hotel.getHotelId());
        assertFalse(hotelRooms.isEmpty());
        assertEquals(hotel.getHotelId(), hotelRooms.get(0).getHotel().getHotelId());
    }

    @Test
    @DisplayName("UPDATE_ROOM")
    void testUpdateRoom() {
        Room updateDetails = new Room();
        updateDetails.setBedType("King");
        updateDetails.setBaseFare(3000.0);
        updateDetails.setTotalRooms(5);

        Room updated = roomService.updateRoom(room.getRoomId(), updateDetails);
        assertEquals("King", updated.getBedType());
        assertEquals(3000.0, updated.getBaseFare());
    }

    @Test
    @DisplayName("DELETE_ROOM")
    void testDeleteRoom() {
        int id = room.getRoomId();
        roomService.deleteRoom(id);        
        Room room = roomService.getRoomById(id);
        assertNull(room);
        
    }

    @Test
    void testGetAvailableRooms() {
        LocalDate checkIn = LocalDate.of(2026, 3, 10);
        LocalDate checkOut = LocalDate.of(2026, 3, 15);      
        int available = roomService.getAvailableRooms(room.getRoomId(), checkIn, checkOut);
        assertEquals(room.getTotalRooms(), available);
    }

    @Test
    void testGetAvailableRoomsByHotel() {
        LocalDate checkIn = LocalDate.of(2026, 3, 10);
        LocalDate checkOut = LocalDate.of(2026, 3, 15);       
        List<Room> available = roomService.getAvailableRoomsByHotel(hotel.getHotelId(), checkIn, checkOut);
        assertFalse(available.isEmpty());
    }

}
