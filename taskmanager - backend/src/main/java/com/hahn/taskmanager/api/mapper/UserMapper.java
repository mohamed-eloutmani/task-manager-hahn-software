package com.hahn.taskmanager.api.mapper;

import com.hahn.taskmanager.api.dto.UserDto;
import com.hahn.taskmanager.domain.user.User;

public class UserMapper {

    public static UserDto toDto(User user) {
        if (user == null) return null;
        return new UserDto(
                user.getId(),
                user.getEmail()
        );
    }
}
