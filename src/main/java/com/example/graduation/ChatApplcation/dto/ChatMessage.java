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
    private User sender;
    private String senderEmail;
    private String message;
    private LocalDateTime sendDate;

}