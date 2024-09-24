package com.example.graduation.Profile.profileController;

import com.example.graduation.Member.entity.User;
import com.example.graduation.Member.repository.UserRepository;
import com.example.graduation.Profile.profileDto.ProfileUpdateCondition;
import com.example.graduation.Profile.profileService.ProfileService;
import com.example.graduation.response.Response;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;


@Api(value = "Profile Controller", tags = "Profile ")
@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class ProfileController {
    private final ProfileService profileService;
    private final UserRepository userRepository;


    @ApiOperation(value = "프로필 조회", notes = "프로필을 조회 합니다.")
    @GetMapping("/profile/view/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Response viewProfile(@ApiParam(value = "User ID", required = true) @PathVariable int id)
    {
        return Response.success(profileService.viewProfile(id));
    }

    @ApiOperation(value = "회원 프로필 정보 수정", notes = "회원의 프로필 정보를 수정")
    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/profile/edit/{id}")
    public Response editUserInfo(@ApiParam(value = "User ID", required = true) @PathVariable int id, ProfileUpdateCondition condition,MultipartFile profileImageFile) {
        return Response.success(profileService.editProfile(id, condition, profileImageFile));
    }


    @ApiOperation(value = "회원 프로필 정보 생성", notes = "회원의 프로필 정보를 생성")
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/profile/create/{id}")
    public Response createUserInfo(@ApiParam(value = "User ID", required = true) @PathVariable int id,ProfileUpdateCondition condition,MultipartFile profileImageFile) {
        return Response.success(profileService.createProfile(id, condition,profileImageFile));
    }
}
