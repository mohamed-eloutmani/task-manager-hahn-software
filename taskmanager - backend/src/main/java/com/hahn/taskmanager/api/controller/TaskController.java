package com.hahn.taskmanager.api.controller;

import com.hahn.taskmanager.api.dto.TaskDto;
import com.hahn.taskmanager.api.mapper.TaskMapper;
import com.hahn.taskmanager.domain.project.Project;
import com.hahn.taskmanager.domain.project.ProjectService;
import com.hahn.taskmanager.domain.task.Task;
import com.hahn.taskmanager.domain.task.TaskService;
import com.hahn.taskmanager.domain.user.User;
import com.hahn.taskmanager.security.AuthUtil;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;
    private final ProjectService projectService;
    private final AuthUtil authUtil;
    private final TaskMapper taskMapper;

    public TaskController(
            TaskService taskService,
            ProjectService projectService,
            AuthUtil authUtil,
            TaskMapper taskMapper
    ) {
        this.taskService = taskService;
        this.projectService = projectService;
        this.authUtil = authUtil;
        this.taskMapper = taskMapper;
    }

    // ======================================================
    // CREATE TASK (for a project)
    // POST /api/tasks/project/{projectId}
    // ======================================================
    @PostMapping("/project/{projectId}")
    public ResponseEntity<?> createTask(
            @PathVariable Long projectId,
            @RequestBody @Valid TaskDto dto
    ) {
        User user = authUtil.getAuthenticatedUser();
        Project project = projectService.getById(projectId);

        if (project == null)
            return ResponseEntity.status(404).body("Project not found");

        if (!project.getOwner().getId().equals(user.getId()))
            return ResponseEntity.status(403).body("Access denied");

        Task task = taskService.createTask(
                dto.getTitle(),
                dto.getDescription(),
                dto.getDueDate(),
                project
        );

        return ResponseEntity.ok(taskMapper.toDto(task));
    }

    // ======================================================
    // GET TASKS BY PROJECT
    // GET /api/tasks/project/{projectId}
    // ======================================================
    @GetMapping("/project/{projectId}")
    public ResponseEntity<?> getTasksByProject(@PathVariable Long projectId) {
        User user = authUtil.getAuthenticatedUser();
        Project project = projectService.getById(projectId);

        if (project == null)
            return ResponseEntity.status(404).body("Project not found");

        if (!project.getOwner().getId().equals(user.getId()))
            return ResponseEntity.status(403).body("Access denied");

        return ResponseEntity.ok(
                taskMapper.toDtoList(
                        taskService.getProjectTasks(projectId)
                )
        );
    }

    // ======================================================
    // GET ALL TASKS OF AUTHENTICATED USER
    // GET /api/tasks
    // ======================================================
    @GetMapping
    public ResponseEntity<?> getAllUserTasks() {
        User user = authUtil.getAuthenticatedUser();

        return ResponseEntity.ok(
                taskMapper.toDtoList(
                        taskService.getAllTasksByUser(user.getId())
                )
        );
    }

    // ======================================================
    // UPDATE TASK
    // PUT /api/tasks/{id}
    // ======================================================
    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(
            @PathVariable Long id,
            @RequestBody @Valid TaskDto dto
    ) {
        User user = authUtil.getAuthenticatedUser();
        Task task = taskService.getById(id);

        if (task == null)
            return ResponseEntity.status(404).body("Task not found");

        if (!task.getProject().getOwner().getId().equals(user.getId()))
            return ResponseEntity.status(403).body("Access denied");

        Task updated = taskService.updateTask(
                task,
                dto.getTitle(),
                dto.getDescription(),
                dto.getDueDate(),
                dto.getStatus()
        );

        return ResponseEntity.ok(taskMapper.toDto(updated));
    }

    // ======================================================
    // DELETE TASK
    // DELETE /api/tasks/{id}
    // ======================================================
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        User user = authUtil.getAuthenticatedUser();
        Task task = taskService.getById(id);

        if (task == null)
            return ResponseEntity.status(404).body("Task not found");

        if (!task.getProject().getOwner().getId().equals(user.getId()))
            return ResponseEntity.status(403).body("Access denied");

        taskService.deleteTask(task);
        return ResponseEntity.noContent().build();
    }
    // ======================================================
    // GET TASK BY ID
    // GET /api/tasks/{id}
    // ======================================================
    @GetMapping("/{id}")
    public ResponseEntity<?> getTaskById(@PathVariable Long id) {
        User user = authUtil.getAuthenticatedUser();
        Task task = taskService.getById(id);

        if (task == null)
            return ResponseEntity.status(404).body("Task not found");

        if (!task.getProject().getOwner().getId().equals(user.getId()))
            return ResponseEntity.status(403).body("Access denied");

        return ResponseEntity.ok(taskMapper.toDto(task));
    }

}
