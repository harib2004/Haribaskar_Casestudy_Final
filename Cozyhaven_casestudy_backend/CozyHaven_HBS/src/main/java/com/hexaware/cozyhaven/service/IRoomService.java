package com.hexaware.cozyhaven.service;

import java.time.LocalDate;
import java.util.List;

import com.hexaware.cozyhaven.entity.Room;

public interface IRoomService {
	
	public Room addRoom(Room room);
	public List<Room> addMultipleRooms(List<Room> rooms);
    public List<Room> getAllRooms();
    public Room getRoomById(Integer roomId);
    public List<Room> getRoomsByHotel(Integer hotelId);
    public Room updateRoom(int roomId, Room roomDetails);
    public void deleteRoom(int roomId);
    public int getAvailableRooms(Integer roomId, LocalDate checkIn, LocalDate checkOut);
    public List<Room> getAvailableRoomsByHotel(Integer hotelId, LocalDate checkIn, LocalDate checkOut);

}
