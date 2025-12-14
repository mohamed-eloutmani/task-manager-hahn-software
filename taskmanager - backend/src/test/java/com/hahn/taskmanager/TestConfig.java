package com.hahn.taskmanager;

import com.hahn.taskmanager.api.mapper.ProjectMapper;
import com.hahn.taskmanager.api.mapper.TaskMapper;
import org.mockito.Mockito;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;

@TestConfiguration
public class TestConfig {

    @Bean
    @Primary
    public ProjectMapper projectMapper() {
        return Mockito.mock(ProjectMapper.class);
    }

    @Bean
    @Primary
    public TaskMapper taskMapper() {
        return Mockito.mock(TaskMapper.class);
    }
}
