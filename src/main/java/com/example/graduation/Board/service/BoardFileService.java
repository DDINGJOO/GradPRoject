package com.example.graduation.Board.service;

import org.springframework.web.multipart.MultipartFile;

public interface BoardFileService {
    void upload(MultipartFile file, String filename);
    void delete(String filename);
}
