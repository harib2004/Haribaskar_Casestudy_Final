package com.hexaware.cozyhaven.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.cozyhaven.entity.Review;
import com.hexaware.cozyhaven.repository.ReviewRepository;

@Service
public class ReviewServiceImpl implements IReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public Review addReview(Review review) {
        return reviewRepository.save(review);
    }

    @Override
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    @Override
    public List<Review> getReviewsByHotel(Integer hotelId) {
        return reviewRepository.findByHotelHotelId(hotelId);
    }

    @Override
    public List<Review> getReviewsByUser(Integer userId) {
        return reviewRepository.findByUserUserId(userId);
    }
    
    @Override
    public void deleteReview(Integer reviewId) {
        reviewRepository.deleteById(reviewId);
    }
}