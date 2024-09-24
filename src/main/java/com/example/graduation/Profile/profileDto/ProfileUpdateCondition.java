package com.example.graduation.Profile.profileDto;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@ApiOperation(value = "프로필 업데이트 요청")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileUpdateCondition {

    @ApiModelProperty(value = "소개", notes = "소개를 입력해주세요.", required = false, example = "example band")
    @NotBlank(message = "소개 입력해주세요, 없으면 없음")
    private String comment;


    @ApiModelProperty(value = "신체정보", notes = "신체정보를 입력해주세요.", required = false, example = "example bio")
    @NotBlank(message = "신체정보를 입력해주세요, 없으면 없음")
    private String bio;

    @ApiModelProperty(value = "지역", notes = "지역을입역해주세요", required = false, example = "example bio")
    @NotBlank(message = "지역을 입력해주세요, 없으면 없음")
    private String location;

}