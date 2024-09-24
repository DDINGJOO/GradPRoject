package com.example.graduation.Profile.profileDto;

import com.example.graduation.Profile.profileEntity.Profile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProfileDto {

    private int id;
    private String comment;
    private String bio;
    private String profileImage;
    private String location;
    private int userId;


    public static ProfileDto toDto(Profile profile)
    {
        return new ProfileDto(
                profile.getId(), profile.getComment(), profile.getBio(),profile.getProfileImage(),profile.getLocation(),profile.getUserId()
        );
    }

}
