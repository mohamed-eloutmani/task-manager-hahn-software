package com.hahn.taskmanager.service;

import com.hahn.taskmanager.domain.project.*;
import com.hahn.taskmanager.domain.user.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProjectServiceTest {

    private ProjectRepository projectRepository;
    private ProjectService projectService;

    @BeforeEach
    void setup() {
        projectRepository = mock(ProjectRepository.class);
        projectService = new ProjectServiceImpl(projectRepository);
    }

    @Test
    void testCreateProject() {
        User owner = new User("test@mail.com", "pwd");
        Project saved = new Project("Title", "Desc", owner);

        when(projectRepository.save(any(Project.class))).thenReturn(saved);

        Project result = projectService.createProject("Title", "Desc", owner);

        assertNotNull(result);
        assertEquals("Title", result.getTitle());
        assertEquals(owner, result.getOwner());
    }

    @Test
    void testGetUserProjects() {
        User owner = new User("test@mail.com", "pwd");
        Project p1 = new Project("P1", "D1", owner);
        Project p2 = new Project("P2", "D2", owner);

        when(projectRepository.findByOwnerId(1L))
                .thenReturn(List.of(p1, p2));

        List<Project> projects = projectService.getUserProjects(1L);

        assertEquals(2, projects.size());
    }

    @Test
    void testGetByIdFound() {
        Project project = new Project("X", "Y", new User());
        project.setId(10L);

        when(projectRepository.findById(10L))
                .thenReturn(Optional.of(project));

        Project result = projectService.getById(10L);

        assertNotNull(result);
        assertEquals(10L, result.getId());
    }

    @Test
    void testGetByIdNotFound() {
        when(projectRepository.findById(999L))
                .thenReturn(Optional.empty());

        Project result = projectService.getById(999L);

        assertNull(result);
    }
}
