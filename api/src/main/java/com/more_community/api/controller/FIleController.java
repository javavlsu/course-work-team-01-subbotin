package com.more_community.api.controller;

import com.more_community.api.annotation.IsLogined;
import com.more_community.api.dto.QueryResponse;
import com.more_community.api.dto.UploadFileRequest;
import com.more_community.api.dto.UploadFilesRequest;
import com.more_community.api.entity.Post;
import com.more_community.api.entity.User;
import com.more_community.api.service.FileService;
import com.more_community.api.service.PostService;
import com.more_community.api.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping(value = "/files")
public class FIleController {
    @Autowired
    private FileService fileService;

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @PostMapping
    @IsLogined
    public ResponseEntity upload(@Valid @RequestBody UploadFilesRequest request, HttpServletRequest req) {
        List<String> urls = new ArrayList<String>();

        for (String fileBase64 : request.getFiles()
        ) {
            urls.add(fileService.upload(fileBase64, Arrays.asList("other")));
        }

        return ResponseEntity.ok(urls);
    }

    @DeleteMapping("/delete/{tag}")
    @IsLogined
    public ResponseEntity detete(@PathVariable("tag") String tag, HttpServletRequest req) {
        return ResponseEntity.ok(fileService.delete(tag));
    }
}
