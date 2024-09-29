package com.example.graduation.ChatApplcation.dto;

import com.example.graduation.Member.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessage {

    private Long roomId;
    private String message;
    private String sender;
    private LocalDateTime sendDate;

}