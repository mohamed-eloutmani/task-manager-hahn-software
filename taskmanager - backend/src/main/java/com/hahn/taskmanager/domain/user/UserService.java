package com.hahn.taskmanager.domain.user;

public interface UserService {

    User findByEmail(String email);

    User save(User user);
}
