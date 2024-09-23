package com.example.graduation.Message.Repository;

import com.example.graduation.Member.entity.User;
import com.example.graduation.Message.Entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {
    List<Message> findAllByReceiverAndDeletedByReceiverFalseOrderByIdDesc(User user);
    List<Message> findAllBySenderAndDeletedBySenderFalseOrderByIdDesc(User user);

}
