package com.example.graduation.Member.service;


import com.example.graduation.Auth.entity.Authority;
import com.example.graduation.Member.dto.UserDto;
import com.example.graduation.Member.entity.User;
import com.example.graduation.Member.repository.UserRepository;
import com.example.graduation.exception.MemberNotEqualsException;
import com.example.graduation.exception.MemberNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<UserDto> findAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserDto> userDtos = new ArrayList<>();
        for(User user : users) {
            userDtos.add(UserDto.toDto(user));
        }
        return userDtos;
    }

    @Transactional(readOnly = true)
    public UserDto findUser(int id) {
        return UserDto.toDto(userRepository.findById(id).orElseThrow(MemberNotFoundException::new));
    }


    @Transactional
    public UserDto editUserInfo(int id, UserDto updateInfo) {
        User user = userRepository.findById(id).orElseThrow(() -> {
            return new MemberNotFoundException();
        });

        // 권한 처리
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(!authentication.getName().equals(user.getUsername())) {
            throw new MemberNotEqualsException();
        } else {
            user.setNickname(updateInfo.getNickname());
            user.setName(updateInfo.getName());
            return UserDto.toDto(user);
        }
    }


    public User findByUserName(String username) {
        Optional<User> member = Optional.ofNullable(userRepository.findByUsername(username));

        if (member.isPresent()) {
            return member.get();
        } else {
            throw new RuntimeException("member not found");
        }
    }

    @Transactional
    public void deleteUserInfo(int id) {
        User user = userRepository.findById(id).orElseThrow(MemberNotFoundException::new);

        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String auth = String.valueOf(authentication.getAuthorities());
        String authByAdmin = "[" + Authority.ROLE_ADMIN +"]";


        if(authentication.getName().equals(user.getUsername()) || auth.equals(authByAdmin)) {
            userRepository.deleteById(id);
        } else {
            throw new MemberNotEqualsException();
        }
    }
}
