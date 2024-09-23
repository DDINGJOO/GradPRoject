package com.example.graduation.Member.repository;

import com.example.graduation.Member.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByUsernameAndPassword(String username, String password);
    Optional<User> findByNickname(String nickname);
    Optional<User> findByUsername(String username);
    public boolean existsByUsername(String username);
    public boolean existsByNickname(String nickname);
}
