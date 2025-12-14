package com.hahn.taskmanager.domain.task;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByProjectId(Long projectId);

    long countByProjectIdAndStatus(
        Long projectId,
        TaskStatus status
    );
    List<Task> findByProjectOwnerId(Long ownerId);

}

