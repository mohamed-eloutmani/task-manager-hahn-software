package com.hahn.taskmanager.config;

import com.hahn.taskmanager.domain.user.User;
import com.hahn.taskmanager.domain.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class InitConfig {

    @Bean
    public CommandLineRunner createDefaultUser(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {

            // If user already exists, do nothing
            if (userRepository.findByEmail("admin@hahn.com").isPresent()) {
                System.out.println("Default user already exists.");
                return;
            }

            // Create default admin user
            User user = new User();
            user.setEmail("admin@hahn.com");
            user.setPassword(passwordEncoder.encode("123456"));

            userRepository.save(user);
            System.out.println("Default admin user created: admin@hahn.com / 123456");
        };
    }
}
