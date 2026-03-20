package com.example.taskmanager.service;

import com.example.taskmanager.dto.TaskRequestResponse;
import com.example.taskmanager.model.Task;
import com.example.taskmanager.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TaskService {

    private final TaskRepository taskRepository;

    @Transactional(readOnly = true)
    public List<TaskRequestResponse> getAllTasks() {
        return taskRepository.findAll().stream()
                .map(this::mapToResponse)
                .toList();
    }

    public TaskRequestResponse getTaskById(Long id) {
        return taskRepository.findById(id)
                .map(this::mapToResponse) 
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
    }

    public TaskRequestResponse createTask(TaskRequestResponse request) {
        Task task = Task.builder()
                .title(request.title())
                .description(request.description())
                .status(request.status())
                .build();
        return mapToResponse(taskRepository.save(task));
    }

    public TaskRequestResponse updateTask(Long id, TaskRequestResponse request) {
        return taskRepository.findById(id)
                .map(task -> {
                    task.setTitle(request.title());
                    task.setDescription(request.description());
                    task.setStatus(request.status());
                    return mapToResponse(taskRepository.save(task));
                })
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
    }

    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new RuntimeException("Task not found with id: " + id);
        }
        taskRepository.deleteById(id);
    }

    private TaskRequestResponse mapToResponse(Task task) {
        return new TaskRequestResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getCreatedAt()
        );
    }
}