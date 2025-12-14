package com.hahn.taskmanager.api.dto;

public class ProjectProgressDto {

    private long totalTasks;
    private long completedTasks;
    private double progressPercentage;

    public ProjectProgressDto(long totalTasks, long completedTasks, double progressPercentage) {
        this.totalTasks = totalTasks;
        this.completedTasks = completedTasks;
        this.progressPercentage = progressPercentage;
    }

    public long getTotalTasks() {
        return totalTasks;
    }

    public long getCompletedTasks() {
        return completedTasks;
    }

    public double getProgressPercentage() {
        return progressPercentage;
    }
}
