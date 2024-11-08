package com.example.graduation.Board.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
@AllArgsConstructor
public class BoardListDto {
    private Integer totalElements;
    private Integer totalPages;
    private boolean hasNext;
    private List<BoardSimpleDto> boardList;

    public static BoardListDto toDto(Page<BoardSimpleDto> page) {
        return new BoardListDto(page.getTotalPages(), (int) page.getTotalElements(),  page.hasNext(), page.getContent());
    }
}