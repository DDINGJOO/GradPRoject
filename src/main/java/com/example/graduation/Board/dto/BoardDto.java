package com.example.graduation.Board.dto;

import com.example.graduation.Board.entity.Board;
import com.example.graduation.Member.dto.UserDto;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardDto {
    private int id;
    private String title;
    private String content;
    private UserDto userDto;
    private List<BoardImageDto> images;
    private LocalDate createdAt;


    public static BoardDto toDto(Board board) {
        return new BoardDto(
                board.getId(),
                board.getTitle(),
                board.getContent(),
                UserDto.toDto(board.getUser()),
                board.getImages().stream().map(i -> BoardImageDto.toDto(i)).collect(toList()),
                board.getCreateDate()
        );
    }
}