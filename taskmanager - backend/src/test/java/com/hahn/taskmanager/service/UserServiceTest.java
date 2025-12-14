package com.hahn.taskmanager.service;

import com.hahn.taskmanager.domain.user.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    private UserRepository userRepository;
    private UserService userService;

    @BeforeEach
    void setup() {
        userRepository = mock(UserRepository.class);
        userService = new UserServiceImpl(userRepository);
    }

    @Test
    void testFindByEmail() {
        User user = new User("mail@mail.com", "123");

        when(userRepository.findByEmail("mail@mail.com"))
                .thenReturn(Optional.of(user));

        User found = userService.findByEmail("mail@mail.com");

        assertNotNull(found);
        assertEquals("mail@mail.com", found.getEmail());
    }

    @Test
    void testFindByEmailNotFound() {
        when(userRepository.findByEmail("xx@xx.com"))
                .thenReturn(Optional.empty());

        User found = userService.findByEmail("xx@xx.com");

        assertNull(found);
    }

    @Test
    void testSave() {
        User user = new User("mail@mail.com", "123");

        when(userRepository.save(user)).thenReturn(user);

        User saved = userService.save(user);

        assertNotNull(saved);
    }
}
