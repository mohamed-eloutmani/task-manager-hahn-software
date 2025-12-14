package com.hahn.taskmanager.domain.project;

import com.hahn.taskmanager.domain.task.TaskStatus;
import com.hahn.taskmanager.domain.user.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public Project createProject(String title, String description, User owner) {
        Project project = new Project(title, description, owner);
        return projectRepository.save(project);
    }

    @Override
    public List<Project> getUserProjects(Long userId) {
        return projectRepository.findByOwnerId(userId);
    }

    @Override
    public Project getById(Long id) {
        return projectRepository.findById(id)
                .orElse(null);
    }

    @Override
    public void deleteProject(Project project) {
        projectRepository.delete(project);
    }

    @Override
    public long countTasks(Long projectId) {
        return projectRepository.countTasksByProjectId(projectId);
    }

    @Override
    public long countDoneTasks(Long projectId) {
        return projectRepository.countTasksByProjectIdAndStatus(
                projectId,
                TaskStatus.DONE
        );
    }
}
