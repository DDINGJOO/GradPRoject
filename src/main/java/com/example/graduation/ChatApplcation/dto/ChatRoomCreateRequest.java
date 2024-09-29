package com.example.graduation.ChatApplcation.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter

public class ChatRoomCreateRequest {
    @NotBlank(message = "Room name is required")
    private String roomName;

    // getters and setters
}