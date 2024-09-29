package com.example.graduation.ChatApplcation.service;


import com.example.graduation.ChatApplcation.entity.Chat;
import com.example.graduation.ChatApplcation.entity.ChatRoom;
import com.example.graduation.ChatApplcation.repository.ChatRepository;
import com.example.graduation.ChatApplcation.repository.ChatRoomRepository;
import com.example.graduation.Member.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatRoomRepository roomRepository;
    private final ChatRepository chatRepository;

    public List<ChatRoom> findAllRoom() {
        return roomRepository.findAll();
    }

    public ChatRoom findRoomById(Long id) {
        return roomRepository.findById(id).orElseThrow();
    }

    public ChatRoom createRoom(String name) {
        return roomRepository.save(ChatRoom.createRoom(name));
    }

    public Chat createChat(Long roomId, String sender, String message) {
        ChatRoom room = roomRepository.findById(roomId).orElseThrow();  //방 찾기 -> 없는 방일 경우 여기서 예외처리
        return chatRepository.save(Chat.createChat(room, sender, message));
    }


    // 채팅방 채팅내용 불러오기
    public List<Chat> findAllChatByRoomId(Long roomId) {
        return chatRepository.findAllByRoomId(roomId);
    }


}