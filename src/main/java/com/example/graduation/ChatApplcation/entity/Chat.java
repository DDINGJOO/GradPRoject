package com.example.graduation.ChatApplcation.entity;


import com.example.graduation.Member.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_id")
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "room_id")
    private ChatRoom room;



    @OnDelete(action = OnDeleteAction.CASCADE)
    private String sender;



    @Column(columnDefinition = "TEXT")
    private String message;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime sendDate;

    @Builder
    public Chat(ChatRoom room, String sender, String message) {
        this.room = room;
        this.sender = sender;
        this.message = message;
        this.sendDate = LocalDateTime.now();
    }

    /**
     * 채팅 생성
     *
     * @param room   채팅 방
     * @param sender 보낸이
     * @return Chat Entity
     */
    public static Chat createChat(ChatRoom room, String sender, String message) {
        return Chat.builder()
                .room(room)
                .sender(sender)
                .message(message)
                .build();
    }
}
