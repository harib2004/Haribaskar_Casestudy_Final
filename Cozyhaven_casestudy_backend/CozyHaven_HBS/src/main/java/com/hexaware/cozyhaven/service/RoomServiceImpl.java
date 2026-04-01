package com.hexaware.cozyhaven.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.cozyhaven.entity.Room;
import com.hexaware.cozyhaven.exception.ResourceNotFoundException;
import com.hexaware.cozyhaven.repository.BookingRepository;
import com.hexaware.cozyhaven.repository.RoomRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class RoomServiceImpl implements IRoomService {

    @Autowired
    private RoomRepository roomRepository;
   
    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public Room addRoom(Room room) {
        return roomRepository.save(room);
    }
    
    @Override
    public List<Room> addMultipleRooms(List<Room> rooms) {
        return roomRepository.saveAll(rooms);
    }
    
    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public Room getRoomById(Integer roomId) {
        return roomRepository.findById(roomId).orElseThrow(() -> new ResourceNotFoundException("Room with ID: "+roomId+" not found"));
                
    }

    @Override
    public List<Room> getRoomsByHotel(Integer hotelId) {
        return roomRepository.findByHotelHotelId(hotelId);
    }
    
    @Override
    public Room updateRoom(int roomId, Room room) {
        Room existingRoom = roomRepository.findById(roomId).orElse(null);
        if(existingRoom!=null) {
        	existingRoom.setBedType(room.getBedType());
            existingRoom.setBaseFare(room.getBaseFare());
            existingRoom.setMaxPersons(room.getMaxPersons());
            existingRoom.setRoomSize(room.getRoomSize());
            existingRoom.setAcType(room.getAcType());
            existingRoom.setTotalRooms(room.getTotalRooms());
            return roomRepository.save(existingRoom);
        }
        else {
        	log.error("Room not found");
        	return null;
        }
        
       
    }

    @Override
    public void deleteRoom(int roomId) {
        roomRepository.deleteById(roomId);
        log.warn("Room deleted");
    }
    
    @Override
    public int getAvailableRooms(Integer roomId, LocalDate checkIn, LocalDate checkOut) {

        Room room = roomRepository.findById(roomId).get();
        int totalRooms = room.getTotalRooms();
        int bookedRooms = bookingRepository.countBookingsForRoom(roomId, checkIn, checkOut);
        return totalRooms - bookedRooms;
    }
    
    @Override
    public List<Room> getAvailableRoomsByHotel(Integer hotelId, LocalDate checkIn, LocalDate checkOut){

        List<Room> rooms = roomRepository.findByHotelHotelId(hotelId);
        List<Room> availableRooms = new ArrayList<>();
        for(Room r : rooms){
            int available = getAvailableRooms(r.getRoomId(), checkIn, checkOut);
            if(available > 0){
                availableRooms.add(r);
            }
        }

        return availableRooms;
    }
    
}
