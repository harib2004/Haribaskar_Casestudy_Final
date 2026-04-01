package com.hexaware.cozyhaven.service;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.hexaware.cozyhaven.entity.User;

@SpringBootTest
@Transactional
@DisplayName("USER_SERVICE")
class UserServiceImplTest {

    @Autowired
    private IUserService userService;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setName("hari");
        testUser.setEmail("hari@gmail.com");
        testUser.setGender("Male");
        testUser.setPhone("9876543210");
        testUser.setAddress("Salem");
        testUser = userService.registerUser(testUser);
    }

    @Test
    void testRegisterAndGetById() {
        User user = userService.getUserById(testUser.getUserId());
        assertNotNull(user);
        assertEquals("hari", user.getName());
    }

    @Test
    void testGetAllUsers() {
        List<User> users = userService.getAllUsers();
        assertFalse(users.isEmpty());
    }

//    @Test
//    void testUpdateUser() {
//        User updatedData = new User();
//        updatedData.setName("hari s");
//        updatedData.setEmail("harinew@gmail.com");
//        User result = userService.updateUser(testUser.getUserId(), updatedData);
//        assertEquals("hari s", result.getName());
//    }

    @Test
    void testDeleteUser() {
        int id = testUser.getUserId();
        userService.deleteUser(id);
        User deleted = userService.getUserById(id);
        assertNull(deleted);
    }
}