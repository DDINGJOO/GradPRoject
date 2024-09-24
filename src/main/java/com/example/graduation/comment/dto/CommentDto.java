package com.example.graduation.comment.dto;

import com.example.graduation.Member.dto.UserDto;
import com.example.graduation.comment.entity.Comment;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDate;
import java.util.List;



@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {

    private int id;
    private String content;
    private UserDto userDto;
    private LocalDate createdAt;

    public CommentDto toDto(Comment comment) {
        return new CommentDto(
                comment.getId(),
                comment.getContent(),
                UserDto.toDto(comment.getUser()),
                comment.getCreateDate()
        );
    }
}