package com.hahn.taskmanager.api.mapper;

import com.hahn.taskmanager.api.dto.ProjectDto;
import com.hahn.taskmanager.domain.project.Project;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProjectMapper {

    public ProjectDto toDto(Project project) {
        if (project == null) return null;
        return new ProjectDto(
                project.getId(),
                project.getTitle(),
                project.getDescription()
        );
    }

    public List<ProjectDto> toDtoList(List<Project> projects) {
        return projects.stream().map(this::toDto).toList();
    }
}
