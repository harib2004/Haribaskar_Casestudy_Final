package com.hexaware.cozyhaven.controller;

import com.hexaware.cozyhaven.service.S3Service;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/images")
@CrossOrigin(origins = "http://localhost:5173")
public class ImageController {

    private final S3Service s3Service;

    public ImageController(S3Service s3Service) {
        this.s3Service = s3Service;
    }

    @GetMapping("/presign")
    public ResponseEntity<String> getPresignedUrl(
            @RequestParam String fileName,
            @RequestParam String contentType) {
        return ResponseEntity.ok(s3Service.generatePresignedUrl(fileName, contentType));
    }
}