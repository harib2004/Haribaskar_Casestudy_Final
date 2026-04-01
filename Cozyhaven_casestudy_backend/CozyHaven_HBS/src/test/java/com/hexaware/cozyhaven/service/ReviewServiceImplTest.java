package com.hexaware.cozyhaven.service;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.hexaware.cozyhaven.entity.*;
import com.hexaware.cozyhaven.repository.*;

@SpringBootTest
@Transactional
@DisplayName("REVIEW_SERVICE")
class ReviewServiceImplTest {

    @Autowired
    private IReviewService reviewService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HotelRepository hotelRepository;

    private Review review;
    private User user;
    private Hotel hotel;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setName("hari");
        user.setEmail("hari@gmail.com");
        user = userRepository.save(user);

        hotel = new Hotel();
        hotel.setName("Cozy Haven Salem");
        hotel.setLocation("Salem");
        hotel.setOwner(user);
        hotel = hotelRepository.save(hotel);

        review = new Review();
        review.setRating(5);
        review.setComment("Excellent stay!");
        review.setUser(user);
        review.setHotel(hotel);
        review = reviewService.addReview(review);
    }

    @Test
    @DisplayName("ADD_REVIEW")
    void testAddReview() {
        assertNotNull(review.getReviewId());
        assertEquals(5, review.getRating());
    }

    @Test
    @DisplayName("GET_ALL_REVIEWS")
    void testGetAllReviews() {
        List<Review> reviews = reviewService.getAllReviews();
        assertFalse(reviews.isEmpty());
    }

    @Test
    void testGetReviewsByHotel() {
        List<Review> reviews = reviewService.getReviewsByHotel(hotel.getHotelId());
        assertFalse(reviews.isEmpty());
    }

    @Test
    void testGetReviewsByUser() {
        List<Review> reviews = reviewService.getReviewsByUser(user.getUserId());
        assertFalse(reviews.isEmpty());
    }

    @Test
    @DisplayName("DELETE_REVIEW")
    void testDeleteReview() {
        int id = review.getReviewId();
        reviewService.deleteReview(id);
        List<Review> reviews = reviewService.getReviewsByUser(user.getUserId());
        assertTrue(reviews.isEmpty());
    }
}