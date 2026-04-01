package com.hexaware.cozyhaven.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexaware.cozyhaven.entity.Room;

public interface RoomRepository extends JpaRepository<Room, Integer> {

	List<Room> findByHotelHotelId(Integer hotelId);
}
