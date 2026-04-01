package com.hexaware.cozyhaven.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hexaware.cozyhaven.dto.ReviewDTO;
import com.hexaware.cozyhaven.entity.Review;
import com.hexaware.cozyhaven.service.IReviewService;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private IReviewService reviewService;

    @PostMapping("/add")
    public ReviewDTO addReview(@RequestBody Review review) {
        Review savedReview = reviewService.addReview(review);
        return setDTO(savedReview);
    }

    @GetMapping("/getall")
    public List<ReviewDTO> getAllReviews() {
        List<ReviewDTO> reviewDTO = new ArrayList<>();
        List<Review> reviews = reviewService.getAllReviews();
        for (Review r : reviews) {
            reviewDTO.add(setDTO(r));
        }
        return reviewDTO;
    }

    @GetMapping("/hotel/{hotelId}")
    public List<ReviewDTO> getReviewsByHotel(@PathVariable int hotelId) {
        List<ReviewDTO> reviewDTO = new ArrayList<>();
        List<Review> reviews = reviewService.getReviewsByHotel(hotelId);
        for (Review r : reviews) {
            reviewDTO.add(setDTO(r));
        }
        return reviewDTO;
    }

    @GetMapping("/user/{userId}")
    public List<ReviewDTO> getReviewsByUser(@PathVariable int userId) {
        List<ReviewDTO> reviewDTO = new ArrayList<>();
        List<Review> reviews = reviewService.getReviewsByUser(userId);
        for (Review r : reviews) {
            reviewDTO.add(setDTO(r));
        }
        return reviewDTO;
    }
    
    @DeleteMapping("/delete/{reviewId}")
    public String deleteReview(@PathVariable int reviewId) {
        reviewService.deleteReview(reviewId);
        return "Review with ID " + reviewId + " deleted";
    }

    
    public ReviewDTO setDTO(Review review) {      
        ReviewDTO dto = new ReviewDTO();
        dto.setReviewId(review.getReviewId());
        dto.setRating(review.getRating());
        dto.setComment(review.getComment());
        dto.setReviewDate(review.getReviewDate());              
        dto.setUserId(review.getUser().getUserId());        
        dto.setHotelId(review.getHotel().getHotelId());
        
        return dto;
    }
}