package com.hahn.taskmanager.api.mapper;

import com.hahn.taskmanager.api.dto.TaskDto;
import com.hahn.taskmanager.domain.task.Task;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TaskMapper {

    public TaskDto toDto(Task task) {
        if (task == null) return null;

        return new TaskDto(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getDueDate(),
                task.getStatus(),
                task.getProject().getId(),       //  projectId
                task.getProject().getTitle()     //  projectTitle
        );
    }

    public List<TaskDto> toDtoList(List<Task> tasks) {
        return tasks.stream()
                .map(this::toDto)
                .toList();
    }
}
