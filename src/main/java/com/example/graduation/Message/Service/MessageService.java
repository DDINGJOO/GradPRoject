package com.example.graduation.Message.Service;

import com.example.graduation.Member.entity.User;
import com.example.graduation.Member.repository.UserRepository;
import com.example.graduation.Message.Dto.MessageCreateRequest;
import com.example.graduation.Message.Dto.MessageDto;
import com.example.graduation.Message.Entity.Message;
import com.example.graduation.Message.Repository.MessageRepository;
import com.example.graduation.exception.MemberNotEqualsException;
import com.example.graduation.exception.MemberNotFoundException;
import com.example.graduation.exception.MessageNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;

    @Transactional
    public MessageDto createMessage(User sender, MessageCreateRequest req) {
        User receiver = userRepository.findByNickname(req.getReceiverNickname()).orElseThrow(MemberNotFoundException::new);

        Message message = new Message(req.getTitle(), req.getContent(), sender, receiver);
        return MessageDto.toDto(messageRepository.save(message));
    }

    @Transactional(readOnly = true)
    public List<MessageDto> receiveMessages(User user) {

        List<MessageDto> messageDtoList = new ArrayList<>();
        List<Message> messageList = messageRepository.findAllByReceiverAndDeletedByReceiverFalseOrderByIdDesc(user);

        for(Message message : messageList) {
            messageDtoList.add(MessageDto.toDto(message));
        }
        return messageDtoList;
    }


    @Transactional(readOnly = true)
    public MessageDto receiveMessage(int id, User user) {
        Message message = messageRepository.findById(id).orElseThrow(MessageNotFoundException::new);


        if(message.getReceiver() != user) {
            throw new MemberNotEqualsException();
        }

        if(message.isDeletedByReceiver()) {
            throw new MessageNotFoundException();
        }
        return MessageDto.toDto(message);
    }

    @Transactional(readOnly = true)
    public List<MessageDto> sendMessages(User user) {

        List<MessageDto> messageDtoList = new ArrayList<>();
        List<Message> messageList = messageRepository.findAllBySenderAndDeletedBySenderFalseOrderByIdDesc(user);

        for(Message message : messageList) {
            messageDtoList.add(MessageDto.toDto(message));
        }
        return messageDtoList;
    }

    @Transactional(readOnly = true)
    public MessageDto sendMessage(int id, User user) {
        Message message = messageRepository.findById(id).orElseThrow(MessageNotFoundException::new);

        if(message.getSender() != user) {
            throw new MemberNotEqualsException();
        }

        if(message.isDeletedByReceiver()) {
            throw new MessageNotFoundException();
        }
        return MessageDto.toDto(message);
    }

    @Transactional
    public void deleteMessageByReceiver(int id, User user) {
        Message message = messageRepository.findById(id).orElseThrow(MessageNotFoundException::new);

        if(message.getReceiver() == user) {
            message.deleteByReceiver();
        } else {
            throw new MemberNotEqualsException();
        }

        if(message.isDeletedMessage()) {
            // 수신, 송신자 둘다 삭제할 경우
            messageRepository.delete(message);
        }
    }

    @Transactional
    public void deleteMessageBySender(int id, User user) {
        Message message = messageRepository.findById(id).orElseThrow(MessageNotFoundException::new);


        if(message.getSender() == user) {
            message.deleteBySender();
        } else {
            throw new MemberNotEqualsException();
        }

        if(message.isDeletedMessage()) {
            messageRepository.delete(message);
        }
    }
}
