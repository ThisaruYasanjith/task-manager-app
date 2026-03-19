package com.example.taskmanager.controller;

import com.example.taskmanager.dto.TaskRequestResponse;
import com.example.taskmanager.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    public List<TaskRequestResponse> getAll() {
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public TaskRequestResponse getById(@PathVariable Long id) {
        return taskService.getTaskById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TaskRequestResponse create(@Valid @RequestBody TaskRequestResponse request) {
        return taskService.createTask(request);
    }

    @PutMapping("/{id}")
    public TaskRequestResponse update(@PathVariable Long id, @Valid @RequestBody TaskRequestResponse request) {
        return taskService.updateTask(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        taskService.deleteTask(id);
    }
}