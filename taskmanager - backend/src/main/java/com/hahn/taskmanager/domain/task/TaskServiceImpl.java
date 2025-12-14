package com.hahn.taskmanager.domain.task;

import com.hahn.taskmanager.domain.project.Project;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public Task createTask(
            String title,
            String description,
            LocalDate dueDate,
            Project project
    ) {
        Task task = new Task(title, description, dueDate, project);
        task.setStatus(TaskStatus.TODO);
        return taskRepository.save(task);
    }

    @Override
    public List<Task> getProjectTasks(Long projectId) {
        return taskRepository.findByProjectId(projectId);
    }

    @Override
    public Task getById(Long id) {
        return taskRepository.findById(id).orElse(null);
    }

    @Override
    public Task updateTask(
            Task task,
            String title,
            String description,
            LocalDate dueDate,
            TaskStatus status
    ) {
        task.setTitle(title);
        task.setDescription(description);
        task.setDueDate(dueDate);
        task.setStatus(status);

        return taskRepository.save(task);
    }

    @Override
    public void deleteTask(Task task) {
        taskRepository.delete(task);
    }

    @Override
    public List<Task> getAllTasksByUser(Long userId) {
        return taskRepository.findByProjectOwnerId(userId);
    }
}
