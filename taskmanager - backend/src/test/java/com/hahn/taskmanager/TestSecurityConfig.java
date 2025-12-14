package com.hahn.taskmanager;

import com.hahn.taskmanager.security.JwtAuthenticationFilter;
import com.hahn.taskmanager.security.JwtService;
import com.hahn.taskmanager.domain.user.UserService;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;

import static org.mockito.Mockito.mock;

@TestConfiguration
public class TestSecurityConfig {

    @Bean
    @Primary
    public JwtService jwtService() {
        return mock(JwtService.class);
    }

    @Bean
    @Primary
    public UserService userService() {
        return mock(UserService.class);
    }

    @Bean
    @Primary
    public JwtAuthenticationFilter jwtAuthenticationFilter(
            JwtService jwtService,
            UserService userService
    ) {
        return new JwtAuthenticationFilter(jwtService, userService);
    }
}
