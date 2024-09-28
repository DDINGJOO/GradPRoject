package com.example.graduation.ChatApplcation.repository;

import com.example.graduation.ChatApplcation.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Long> {

    List<Chat> findAllByRoomId(Long roomId);
}
