package com.hahn.taskmanager.domain.project;

import com.hahn.taskmanager.domain.user.User;

import java.util.List;

public interface ProjectService {

    // CREATE
    Project createProject(String title, String description, User owner);

    // READ
    List<Project> getUserProjects(Long userId);

    Project getById(Long id);

    // DELETE
    void deleteProject(Project project);

    // PROGRESS
    long countTasks(Long projectId);

    long countDoneTasks(Long projectId);
}
