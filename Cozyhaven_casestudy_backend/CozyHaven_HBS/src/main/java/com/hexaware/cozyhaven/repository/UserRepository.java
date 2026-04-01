package com.hexaware.cozyhaven.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hexaware.cozyhaven.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

    public User findByEmail(String email);
}
