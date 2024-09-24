package com.example.graduation.Profile.profileRepository;

import com.example.graduation.Profile.profileEntity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProfileRepositoy extends JpaRepository<Profile, Integer> {
    Profile findById(int id);
    Profile findByUserId(int id);
}
