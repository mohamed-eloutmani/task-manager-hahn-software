package com.hahn.taskmanager.api.controller;

import com.hahn.taskmanager.api.dto.ProjectDto;
import com.hahn.taskmanager.api.dto.ProjectProgressDto;
import com.hahn.taskmanager.api.mapper.ProjectMapper;
import com.hahn.taskmanager.domain.project.Project;
import com.hahn.taskmanager.domain.project.ProjectService;
import com.hahn.taskmanager.domain.user.User;
import com.hahn.taskmanager.security.AuthUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;
    private final AuthUtil authUtil;
    private final ProjectMapper projectMapper;

    public ProjectController(ProjectService projectService, AuthUtil authUtil, ProjectMapper projectMapper) {
        this.projectService = projectService;
        this.authUtil = authUtil;
        this.projectMapper = projectMapper;
    }

    @PostMapping
    public ResponseEntity<ProjectDto> createProject(@RequestBody @Valid ProjectDto dto) {
        User user = authUtil.getAuthenticatedUser();
        Project project = projectService.createProject(dto.getTitle(), dto.getDescription(), user);
        return ResponseEntity.ok(projectMapper.toDto(project));
    }

    @GetMapping
    public ResponseEntity<List<ProjectDto>> getUserProjects() {
        User user = authUtil.getAuthenticatedUser();
        return ResponseEntity.ok(
                projectMapper.toDtoList(projectService.getUserProjects(user.getId()))
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProjectDetails(@PathVariable Long id) {
        User user = authUtil.getAuthenticatedUser();
        Project project = projectService.getById(id);

        if (project == null)
            return ResponseEntity.status(404).body("Project not found");

        if (!project.getOwner().getId().equals(user.getId()))
            return ResponseEntity.status(403).body("Access denied");

        return ResponseEntity.ok(projectMapper.toDto(project));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {
        User user = authUtil.getAuthenticatedUser();
        Project project = projectService.getById(id);

        if (project == null)
            return ResponseEntity.status(404).body("Project not found");

        if (!project.getOwner().getId().equals(user.getId()))
            return ResponseEntity.status(403).body("Access denied");

        projectService.deleteProject(project);
        return ResponseEntity.noContent().build();
    }

    // ✅ REQUIRED BY THE TEST
    // ================= PROGRESS =================
    @GetMapping("/{id}/progress")
    public ResponseEntity<?> getProgress(@PathVariable Long id) {
        User user = authUtil.getAuthenticatedUser();
        Project project = projectService.getById(id);

        if (project == null)
            return ResponseEntity.status(404).body("Project not found");

        if (!project.getOwner().getId().equals(user.getId()))
            return ResponseEntity.status(403).body("Access denied");

        long total = projectService.countTasks(id);
        long done = projectService.countDoneTasks(id);
        double percent = total == 0 ? 0.0 : (done * 100.0 / total);

        return ResponseEntity.ok(
                new ProjectProgressDto(total, done, percent)
        );
    }

}
