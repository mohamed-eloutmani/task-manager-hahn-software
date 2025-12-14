package com.hahn.taskmanager.domain.task;

import com.hahn.taskmanager.domain.project.Project;

import java.time.LocalDate;
import java.util.List;

public interface TaskService {

    // CREATE
    Task createTask(
            String title,
            String description,
            LocalDate dueDate,
            Project project
    );

    // READ
    List<Task> getProjectTasks(Long projectId);

    Task getById(Long id);

    List<Task> getAllTasksByUser(Long userId);

    // UPDATE
    Task updateTask(
            Task task,
            String title,
            String description,
            LocalDate dueDate,
            TaskStatus status
    );

    // DELETE
    void deleteTask(Task task);
}
