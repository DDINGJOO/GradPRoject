package com.example.graduation.Profile.profileEntity;

import com.example.graduation.Member.entity.User;
import lombok.*;


import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
public class Profile {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private int id;


    @Column(nullable = true)
    private String bio;

    @Column
    private String location;


    @Column
    private String comment;


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER", nullable = false)
    private User user;

    @Column
    private String profileImage;



    @Column
    private int userId;


    @Builder
    public Profile(String comment, String bio, String location,User user)
    {
        this.comment = comment;
        this.bio = bio;
        this.location = location;
        this.user = user;
    }


}
