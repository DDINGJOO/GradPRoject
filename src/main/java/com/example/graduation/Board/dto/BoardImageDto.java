package com.example.graduation.Board.dto;

import com.example.graduation.Board.entity.BoardImage;
import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class BoardImageDto {
    private int id;
    private String originName;
    private String uniqueName;

    public static BoardImageDto toDto(BoardImage image) {
        return new BoardImageDto(image.getId(), image.getOriginName(), image.getUniqueName());
    }

}
