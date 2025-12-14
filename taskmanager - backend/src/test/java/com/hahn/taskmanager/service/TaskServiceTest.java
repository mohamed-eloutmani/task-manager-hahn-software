package com.hahn.taskmanager.service;

import com.hahn.taskmanager.domain.project.Project;
import com.hahn.taskmanager.domain.task.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.Optional;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TaskServiceTest {

    private TaskRepository taskRepository;
    private TaskService taskService;

    @BeforeEach
    void setup() {
        taskRepository = mock(TaskRepository.class);
        taskService = new TaskServiceImpl(taskRepository);
    }

    // ================= CREATE =================
    @Test
    void testCreateTask() {
        Project project = new Project();
        Task saved = new Task("Task A", "Desc A", LocalDate.now(), project);

        when(taskRepository.save(any(Task.class))).thenReturn(saved);

        Task result = taskService.createTask(
                "Task A",
                "Desc A",
                LocalDate.now(),
                project
        );

        assertNotNull(result);
        assertEquals("Task A", result.getTitle());
        assertEquals(TaskStatus.TODO, result.getStatus());
    }

    // ================= READ =================
    @Test
    void testGetProjectTasks() {
        Task t1 = new Task();
        Task t2 = new Task();

        when(taskRepository.findByProjectId(5L))
                .thenReturn(List.of(t1, t2));

        List<Task> tasks = taskService.getProjectTasks(5L);

        assertEquals(2, tasks.size());
    }

    @Test
    void testGetByIdFound() {
        Task task = new Task();
        task.setId(1L);

        when(taskRepository.findById(1L))
                .thenReturn(Optional.of(task));

        Task result = taskService.getById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
    }

    @Test
    void testGetByIdNotFound() {
        when(taskRepository.findById(999L))
                .thenReturn(Optional.empty());

        Task result = taskService.getById(999L);

        assertNull(result);
    }

    // ================= UPDATE =================
    @Test
    void testUpdateTask() {
        Task task = new Task();
        task.setStatus(TaskStatus.TODO);

        when(taskRepository.save(task)).thenReturn(task);

        Task result = taskService.updateTask(
                task,
                "Updated title",
                "Updated description",
                LocalDate.now(),
                TaskStatus.IN_PROGRESS
        );

        assertEquals("Updated title", result.getTitle());
        assertEquals(TaskStatus.IN_PROGRESS, result.getStatus());
    }
}
