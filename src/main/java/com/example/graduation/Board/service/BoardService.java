package com.example.graduation.Board.service;


import com.example.graduation.Board.dto.*;
import com.example.graduation.Board.entity.Board;
import com.example.graduation.Board.entity.BoardImage;
import com.example.graduation.Board.repository.BoardRepository;
import com.example.graduation.Category.entity.Category;
import com.example.graduation.Category.repository.CategoryRepository;
import com.example.graduation.Member.entity.User;
import com.example.graduation.Member.repository.UserRepository;
import com.example.graduation.exception.BoardNotFoundException;
import com.example.graduation.exception.CategoryNotFoundException;
import com.example.graduation.exception.MemberNotEqualsException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

import static java.util.stream.Collectors.toList;

@RequiredArgsConstructor
@Service
public class BoardService {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final BoardFileService boardFileService;

    private final CategoryRepository categoryRepository;

    @Transactional
    public BoardCreateResponse create(BoardCreateRequest req, int categoryId, User user) {
        List<BoardImage> images = req.getImages().stream().map(i -> new BoardImage(i.getOriginalFilename())).collect(toList());
        Category category = categoryRepository.findById(categoryId).orElseThrow(CategoryNotFoundException::new);
        Board board = boardRepository.save(new Board(req.getTitle(), req.getContent(), user, category, images));

        uploadImages(board.getImages(), req.getImages());
        return new BoardCreateResponse(board.getId(), board.getTitle(), board.getContent());
    }

    @Transactional(readOnly = true)
    public List<BoardSimpleDto> findAllBoards(Pageable pageable, int categoryId) {
        Page<Board> boards = boardRepository.findAllByCategoryId(pageable, categoryId);
        List<BoardSimpleDto> boardSimpleDtoList = new ArrayList<>();
        boards.stream().forEach(i -> boardSimpleDtoList.add(new BoardSimpleDto().toDto(i)));
        return boardSimpleDtoList;
    }

    @Transactional(readOnly = true)
    public BoardDto findBoard(int id) {
        return BoardDto.toDto(boardRepository.findById(id).orElseThrow(BoardNotFoundException::new));
    }




    @Transactional
    public BoardDto editBoard(int id, BoardUpdateRequest req, User user) {
        Board board = boardRepository.findById(id).orElseThrow(BoardNotFoundException::new);

        if (user != board.getUser()) {
            throw new MemberNotEqualsException();
        }

        Board.ImageUpdatedResult result = board.update(req);
        uploadImages(result.getAddedImages(), result.getAddedImageFiles());
        deleteImages(result.getDeletedImages());
        return BoardDto.toDto(board);
    }

    @Transactional
    public void deleteBoard(int id, User user) {
        Board board = boardRepository.findById(id).orElseThrow(BoardNotFoundException::new);

        if (user != board.getUser()) {
            throw new MemberNotEqualsException();
        }
        deleteImages(board.getImages());
        boardRepository.delete(board);
    }

    @Transactional(readOnly = true)
    public List<BoardSimpleDto> search(String keyword, Pageable pageable) {
        Page<Board> boards = boardRepository.findByTitleContaining(keyword, pageable);
        List<BoardSimpleDto> boardSimpleDtoList = new ArrayList<>();
        boards.stream().forEach(i -> boardSimpleDtoList.add(new BoardSimpleDto().toDto(i)));
        return boardSimpleDtoList;
    }


    private void uploadImages(List<BoardImage> images, List<MultipartFile> fileImages) {
        IntStream.range(0, images.size()).forEach(i -> boardFileService.upload(fileImages.get(i), images.get(i).getUniqueName()));
    }

    private void deleteImages(List<BoardImage> images) {
        images.stream().forEach(i -> boardFileService.delete(i.getUniqueName()));
    }
}