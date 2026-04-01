package com.hexaware.cozyhaven.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hexaware.cozyhaven.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Integer> {

    List<Review> findByHotelHotelId(Integer hotelId);

    List<Review> findByUserUserId(Integer userId);
}