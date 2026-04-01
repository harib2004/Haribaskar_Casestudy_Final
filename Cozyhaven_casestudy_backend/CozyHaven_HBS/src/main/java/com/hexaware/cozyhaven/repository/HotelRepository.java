package com.hexaware.cozyhaven.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexaware.cozyhaven.entity.Hotel;

public interface HotelRepository extends JpaRepository<Hotel, Integer> {

    List<Hotel> findByLocation(String location);
    List<Hotel> findByOwnerUserId(Integer userId);
}
