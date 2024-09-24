package com.example.graduation.Profile.profileService;

import com.example.graduation.Member.entity.User;
import com.example.graduation.Member.repository.UserRepository;
import com.example.graduation.Profile.profileDto.ProfileDto;
import com.example.graduation.Profile.profileDto.ProfileUpdateCondition;
import com.example.graduation.Profile.profileEntity.Profile;
import com.example.graduation.Profile.profileRepository.ProfileRepositoy;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@RequiredArgsConstructor

public class ProfileService {

    private final UserRepository userRepository;
    private final ProfileRepositoy profileRepository;


    @Value("${imgLocation}")
    private String location;


    @Transactional
    public void profileChangeImage(int principalId, MultipartFile profileImageFile)
    {
        UUID uuid = UUID.randomUUID();
        String imageFileName = uuid+"_"+profileImageFile.getOriginalFilename();
        System.out.println("File Name : "+ imageFileName);

        Path imageFilePath  = Paths.get(location+imageFileName);

        try{
            Files.write(imageFilePath,profileImageFile.getBytes());
        } catch (Exception e) {
            e.printStackTrace();
        }

        User user = userRepository.findById(principalId).orElseThrow();
        Profile profile = profileRepository.findByUserId(principalId);
        profile.setProfileImage(imageFileName);
    }

    public ProfileDto viewProfile(int id)
    {
        Profile profile = profileRepository.findByUserId(id);
        return ProfileDto.toDto(profile);
    }



    @Transactional
    public ProfileDto editProfile(int id , ProfileUpdateCondition condition, MultipartFile profileImageFile)
    {
        Profile profile =  profileRepository.findByUserId(id);
        profile.setComment(condition.getComment());
        profile.setBio(condition.getBio());
        profile.setLocation(condition.getLocation());

        UUID uuid = UUID.randomUUID();
        String imageFileName = uuid+"_"+profileImageFile.getOriginalFilename();
        System.out.println("File Name : "+ imageFileName);

        Path imageFilePath  = Paths.get(location+imageFileName);

        try{
            Files.write(imageFilePath,profileImageFile.getBytes());
        } catch (Exception e) {
            e.printStackTrace();
        }

        profile.setProfileImage(imageFileName);
        profileRepository.save(profile);
        return ProfileDto.toDto(profile);
    }

    @Transactional
    public ProfileDto createProfile(int id , ProfileUpdateCondition condition,MultipartFile profileImageFile)
    {
        UUID uuid = UUID.randomUUID();
        String imageFileName = uuid+"_"+profileImageFile.getOriginalFilename();
        System.out.println("File Name : "+ imageFileName);

        Path imageFilePath  = Paths.get(location+imageFileName);

        try{
            Files.write(imageFilePath,profileImageFile.getBytes());
        } catch (Exception e) {
            e.printStackTrace();
        }
        User user = userRepository.findById(id).orElseThrow();
        Profile profile =new Profile(condition.getComment(),condition.getBio(),condition.getLocation(),user);
        profile.setUserId(user.getId());
        profile.setProfileImage(imageFileName);
        profileRepository.save(profile);
        return ProfileDto.toDto(profile);
    }


}
