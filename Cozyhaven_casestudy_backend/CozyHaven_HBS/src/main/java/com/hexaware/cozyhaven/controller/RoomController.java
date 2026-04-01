package com.hexaware.cozyhaven.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.cozyhaven.dto.RoomDTO;
import com.hexaware.cozyhaven.entity.Room;
import com.hexaware.cozyhaven.service.IRoomService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private IRoomService roomService;

    @PostMapping("/add")
    public String addRoom(@Valid @RequestBody Room room) {
        roomService.addRoom(room);
        return "Room added Successfully";
    }

    @PostMapping("/addmultiple")
    public String addMultipleRooms(@Valid @RequestBody List<Room> rooms) { 
        roomService.addMultipleRooms(rooms);
        return "Multiple rooms added";
    }

    @GetMapping("/all")
    public List<RoomDTO> getAllRooms() {
        List<Room> rooms = roomService.getAllRooms();
        List<RoomDTO> roomsDto = new ArrayList<>();
        for (Room r : rooms) {
            roomsDto.add(setDTO(r));
        }
        return roomsDto;
    }

    @GetMapping("/{roomId}")
    public RoomDTO getRoomById(@PathVariable int roomId) {
        Room room = roomService.getRoomById(roomId);
        return setDTO(room);
    }

    @GetMapping("/hotel/{hotelId}")
    public List<RoomDTO> getRoomsByHotel(@PathVariable int hotelId) {
        List<Room> rooms = roomService.getRoomsByHotel(hotelId);
        List<RoomDTO> roomsDto = new ArrayList<>();
        for (Room r : rooms) {
            roomsDto.add(setDTO(r));
        }
        return roomsDto;
    }

    @PutMapping("/update/{roomId}")
    public RoomDTO updateRoom(@PathVariable int roomId, @Valid @RequestBody Room roomDetails) { // Added @Valid
        Room updatedRoom = roomService.updateRoom(roomId, roomDetails);
        return setDTO(updatedRoom);
    }

    @DeleteMapping("/delete/{roomId}")
    public String deleteRoom(@PathVariable int roomId) {
        roomService.deleteRoom(roomId);
        return "Room with ID " + roomId + " has been deleted";
    }

    @GetMapping("/availability/{roomId}")
    public int getAvailableRooms(@PathVariable int roomId,@RequestParam LocalDate checkIn,@RequestParam LocalDate checkOut){
        return roomService.getAvailableRooms(roomId, checkIn, checkOut);
    }

    @GetMapping("/hotel/{hotelId}/available")
    public List<RoomDTO> getAvailableRoomsByHotel(@PathVariable int hotelId,@RequestParam LocalDate checkIn,@RequestParam LocalDate checkOut){
        List<Room> rooms = roomService.getAvailableRoomsByHotel(hotelId, checkIn, checkOut);
        List<RoomDTO> roomsDto = new ArrayList<>();
        for (Room r : rooms) {
            roomsDto.add(setDTO(r));
        }
        return roomsDto;
    }

    
    private RoomDTO setDTO(Room room) {
        RoomDTO dto = new RoomDTO();
        dto.setRoomId(room.getRoomId());
        dto.setBedType(room.getBedType());
        dto.setBaseFare(room.getBaseFare());
        dto.setMaxPersons(room.getMaxPersons());
        dto.setRoomSize(room.getRoomSize());
        dto.setAcType(room.getAcType());
        dto.setTotalRooms(room.getTotalRooms());
        dto.setHotelId(room.getHotel().getHotelId());
        dto.setImageUrl(room.getImageUrl());
        
        return dto;
    }
}