package com.hexaware.cozyhaven.service;

import java.util.List;

import com.hexaware.cozyhaven.entity.Review;

public interface IReviewService {

    public Review addReview(Review review);
    public List<Review> getAllReviews();
    public List<Review> getReviewsByHotel(Integer hotelId);
    public List<Review> getReviewsByUser(Integer userId);    
    public void deleteReview(Integer reviewId);
}