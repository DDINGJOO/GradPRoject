package com.example.graduation.ChatApplcation.repository;


import com.example.graduation.ChatApplcation.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
}