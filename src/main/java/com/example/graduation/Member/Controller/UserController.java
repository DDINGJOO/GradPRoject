package com.example.graduation.Member.Controller;

import com.example.graduation.Member.dto.UserDto;
import com.example.graduation.Member.entity.User;
import com.example.graduation.Member.service.UserService;
import com.example.graduation.response.Response;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@Api(value = "User Controller", tags = "User")
@RequestMapping("/api")
@RequiredArgsConstructor
@RestController
public class UserController {

    private final UserService userService;

    @ApiOperation(value = "전체 회원 조회", notes = "전체 회원을 조회")
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/users")
    public Response findAllUsers() {
        return Response.success(userService.findAllUsers());
    }

    @ApiOperation(value = "개별 회원 조회", notes = "개별 회원을 조회")
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/users/{id}")
    public Response findUser(@ApiParam(value = "User ID", required = true) @PathVariable int id) {
        return Response.success(userService.findUser(id));
    }

    @ApiOperation(value = "회원 정보 수정", notes = "회원의 정보를 수정")
    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/users/{id}")
    public Response editUserInfo(@ApiParam(value = "User ID", required = true) @PathVariable int id, @RequestBody UserDto userDto) {
        return Response.success(userService.editUserInfo(id, userDto));
    }

    @ApiOperation(value = "회원 탈퇴", notes = "회원을 탈퇴 시킴")
    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/users/{id}")
    public Response deleteUserInfo(@ApiParam(value = "User ID", required = true) @PathVariable int id) {
        userService.deleteUserInfo(id);
        return Response.success();
    }


    @ApiOperation(value = "현제 로그인 중인 유저 ", notes = "현제 로그인 중인 유저id조회")
    @GetMapping("/users/current")
    public Response getCurrentUser() {
        // 현재 인증된 사용자의 정보 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 사용자 이름(username)을 통해 유저 정보 가져오기
        String username = authentication.getName();
        User user = userService.findByUserName(username);
        return Response.success(UserDto.toDto(user));
    }
}