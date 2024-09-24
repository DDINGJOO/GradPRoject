package com.example.graduation.Board.service;


import com.example.graduation.exception.FileUploadFailureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;


@Service
@Slf4j
public class LocalBoardFileService implements BoardFileService {

    //TODO : !! 이미지 경로 수정하기
    private String location = "C:/Users/soh10/Desktop/Graduation/image";


    @PostConstruct
    void postConstruct() {
        File dir = new File(location);
        if (!dir.exists()) {
            dir.mkdir();
        }
    }

    @Override
    public void upload(MultipartFile file, String filename) {
        try {
            file.transferTo(new File(location + filename));
        } catch(IOException e) {
            throw new FileUploadFailureException(e);
        }
    }

    @Override
    public void delete(String filename) {
        new File(location + filename).delete();
    }
}
