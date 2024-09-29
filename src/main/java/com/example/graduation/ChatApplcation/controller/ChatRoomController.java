package com.example.graduation.ChatApplcation.controller;

import com.example.graduation.ChatApplcation.dto.ChatRoomCreateRequest;
import com.example.graduation.ChatApplcation.entity.Chat;
import com.example.graduation.ChatApplcation.entity.ChatRoom;
import com.example.graduation.ChatApplcation.service.ChatService;
import com.example.graduation.response.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class ChatRoomController {

    private final ChatService chatRoomService;

    public ChatRoomController(ChatService chatRoomService) {
            this.chatRoomService = chatRoomService;
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Response createRoom(@RequestBody ChatRoomCreateRequest request) {
        ChatRoom chatRoom = chatRoomService.createRoom(request.getRoomName());
        return Response.success(chatRoom);
    }

    @GetMapping("/roomList")
    @ResponseStatus(HttpStatus.OK)
    public Response getRoomList() {
        List<ChatRoom> rooms = chatRoomService.findAllRoom();
        return Response.success(rooms);
    }
}