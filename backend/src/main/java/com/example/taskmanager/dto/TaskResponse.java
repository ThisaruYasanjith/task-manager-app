package com.example.taskmanager.dto;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public record TaskResponse(
        Long id,
        @NotBlank(message = "Title is required") String title,
        String description,
        String status,
        LocalDateTime createdAt
) {}