package com.hahn.taskmanager.domain.project;

import com.hahn.taskmanager.domain.task.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByOwnerId(Long userId);

    @Query("""
        select count(t)
        from Task t
        where t.project.id = :projectId
    """)
    long countTasksByProjectId(@Param("projectId") Long projectId);

    @Query("""
        select count(t)
        from Task t
        where t.project.id = :projectId
        and t.status = :status
    """)
    long countTasksByProjectIdAndStatus(
            @Param("projectId") Long projectId,
            @Param("status") TaskStatus status
    );
}
