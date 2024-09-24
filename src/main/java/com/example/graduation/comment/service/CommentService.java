package com.example.graduation.comment.service;

import com.example.graduation.Board.entity.Board;
import com.example.graduation.Board.repository.BoardRepository;
import com.example.graduation.Member.entity.User;
import com.example.graduation.Member.repository.UserRepository;
import com.example.graduation.comment.dto.CommentCreateRequest;
import com.example.graduation.comment.dto.CommentDto;
import com.example.graduation.comment.dto.CommentReadCondition;
import com.example.graduation.comment.entity.Comment;
import com.example.graduation.comment.repository.CommentRepository;
import com.example.graduation.exception.BoardNotFoundException;
import com.example.graduation.exception.CommentNotFoundException;
import com.example.graduation.exception.MemberNotEqualsException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
@Slf4j
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final BoardRepository boardRepository;

    @Transactional(readOnly = true)
    public List<CommentDto> findAll(CommentReadCondition condition) {
        List<Comment> commentList = commentRepository.findByBoardId(condition.getBoardId());
        List<CommentDto> commentDtoList = new ArrayList<>();
        commentList.stream().forEach(i -> commentDtoList.add(new CommentDto().toDto(i)));
        return commentDtoList;
    }

    @Transactional
    public CommentDto create(CommentCreateRequest req, User user) {
        Board board = boardRepository.findById(req.getBoardId()).orElseThrow(BoardNotFoundException::new);

        Comment comment = new Comment(req.getContent(), user, board);
        commentRepository.save(comment);
        return new CommentDto().toDto(comment);
    }

    @Transactional
    public void delete(int id, User user) {
        Comment comment = commentRepository.findById(id).orElseThrow(CommentNotFoundException::new);
        Board board = boardRepository.findById(comment.getBoard().getId()).orElseThrow(BoardNotFoundException::new);
        if(comment.getUser().equals(user)) {
            // 삭제 진행
            commentRepository.delete(comment);
        } else {
            throw new MemberNotEqualsException();
        }
    }


}