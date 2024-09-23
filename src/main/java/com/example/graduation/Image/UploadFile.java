package com.example.graduation.Image;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UploadFile {
    private String uploadFilename;  // 작성자가 업로드한 파일명
    private String storeFilename;   // 서버 내부에서 관리하는 파일명
}

/*

// TODO : Upload Image impl to -> content
private UploadFile attachFile;          // 첨부 파일
private List<UploadFile> imageFiles;    // 첨부 이미지
 */


// TODO : Use File Store int Controller
/*
    UploadFile attachFile = fileStore.storeFile(form.getAttachFile());
    List<UploadFile> imageFiles = fileStore.storeFiles(form.getImageFiles());
    content.setAttachFile(attachFile);
    content.setImageFiles(imageFiles);
 */