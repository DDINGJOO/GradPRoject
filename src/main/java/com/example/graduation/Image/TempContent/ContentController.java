package com.example.graduation.Image.TempContent;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;



//TODO : exam : Upload Image
/*
    @PostMapping("/content/write")
    public String writeContent(ContentForm form) throws IOException {
        Content content = new Content();
        content.setTitle(form.getTitle());
        content.setWriter(form.getWriter());
        content.setTexts(form.getTexts());

        LocalDateTime NowTime = LocalDateTime.now();
        String formatDate = NowTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        content.setUpdateDate(formatDate);

        // 첨부파일, 이미지들 처리하는 부분
        UploadFile attachFile = fileStore.storeFile(form.getAttachFile());
        List<UploadFile> imageFiles = fileStore.storeFiles(form.getImageFiles());
        content.setAttachFile(attachFile);
        content.setImageFiles(imageFiles);

        contentService.writeContent(content);

        return "redirect:/basic-board";
    }
}
*/

/*
//TODO : exam : view Image controller
@ResponseBody
@GetMapping("/images/{filename}")
public Resource showImage(@PathVariable String filename) throws MalformedURLException {
    return new UrlResource("file:" + fileStore.getFullPath(filename));
}
*/

/*
//TODO : exam : file attach controller
@GetMapping("/attach/{id}")
public ResponseEntity<Resource> downloadAttach(@PathVariable int id) throws MalformedURLException {
    Content content = contentService.getContent(id);

    System.out.println(content.getAttachFile());
    String storeFilename = content.getAttachFile().getStoreFilename();
    String uploadFilename = content.getAttachFile().getUploadFilename();
    System.out.println(fileStore.getFullPath(storeFilename));

    UrlResource urlResource = new UrlResource("file:" + fileStore.getFullPath(storeFilename));

    // 업로드 한 파일명이 한글인 경우 아래 작업을 안해주면 한글이 깨질 수 있음
    String encodedUploadFileName = UriUtils.encode(uploadFilename, StandardCharsets.UTF_8);
    String contentDisposition = "attachment; filename=\"" + encodedUploadFileName + "\"";

    // header에 CONTENT_DISPOSITION 설정을 통해 클릭 시 다운로드 진행
    return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
            .body(urlResource);
}
 */

//TODO : exam : DTO for images,files
/*
@Data
public class ContentForm {

    private int id;
    private String title;
    private String texts;

    private String writer;
    private String password;

    private String updateDate;

    private MultipartFile attachFile;          // 첨부 파일
    private List<MultipartFile> imageFiles;    // 첨부 이미지
}
 */