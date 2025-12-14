package com.hahn.taskmanager.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hahn.taskmanager.api.controller.AuthController;
import com.hahn.taskmanager.api.dto.LoginRequest;
import com.hahn.taskmanager.domain.user.User;
import com.hahn.taskmanager.domain.user.UserService;
import com.hahn.taskmanager.security.JwtService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(
        controllers = AuthController.class,
        excludeAutoConfiguration = SecurityAutoConfiguration.class
)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @MockBean
    private UserService userService;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private PasswordEncoder passwordEncoder;

    @Test
    void testLoginFailsWithWrongPassword() throws Exception {

        User user = new User();
        user.setEmail("admin@hahn.com");
        user.setPassword("$2a$10$encoded");

        when(userService.findByEmail("admin@hahn.com")).thenReturn(user);
        when(passwordEncoder.matches("wrong", "$2a$10$encoded")).thenReturn(false);

        LoginRequest req = new LoginRequest();
        req.setEmail("admin@hahn.com");
        req.setPassword("wrong");

        mockMvc.perform(
                post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(req))
        )
        .andExpect(status().isUnauthorized());
    }
}
