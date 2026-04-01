package com.hexaware.cozyhaven.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hexaware.cozyhaven.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Integer> {

    public List<Booking> findByUserUserId(int userId);
    List<Booking> findByRoomHotelHotelId(int hotelId);
    
    @Query("SELECT COUNT(b) FROM Booking b WHERE b.room.roomId = :roomId AND b.checkInDate < :checkOut AND b.checkOutDate > :checkIn")
    public int countBookingsForRoom(@Param("roomId") int roomId, @Param("checkIn") LocalDate checkIn, @Param("checkOut") LocalDate checkOut);

}