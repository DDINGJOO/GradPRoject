package com.example.graduation.Board.repository;

import com.example.graduation.Board.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Integer> {

    Page<Board> findByTitleContaining(String keyword, Pageable pageable);
    Page<Board> findAll(Pageable pageable);

    Page<Board> findAllByCategoryId(Pageable pageable, int categoryId);
}

