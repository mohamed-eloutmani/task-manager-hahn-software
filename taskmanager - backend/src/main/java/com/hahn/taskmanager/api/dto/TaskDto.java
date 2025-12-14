package com.hahn.taskmanager.api.dto;

import java.time.LocalDate;

import com.hahn.taskmanager.domain.task.TaskStatus;
import jakarta.validation.constraints.NotBlank;

public class TaskDto {

    private Long id;

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    private LocalDate dueDate;

    //  REAL task progress
    private TaskStatus status;

    //  PROJECT INFO
    private Long projectId;
    private String projectTitle;

    public TaskDto() {}

    public TaskDto(
            Long id,
            String title,
            String description,
            LocalDate dueDate,
            TaskStatus status,
            Long projectId,
            String projectTitle
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.status = status;
        this.projectId = projectId;
        this.projectTitle = projectTitle;
    }

    // ================= GETTERS / SETTERS =================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public String getProjectTitle() {
        return projectTitle;
    }

    public void setProjectTitle(String projectTitle) {
        this.projectTitle = projectTitle;
    }
}
