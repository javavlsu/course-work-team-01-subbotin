package com.more_community.api.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FileService {
    @Value("${cloudinary.name}")
    private String cloud_name;

    @Value("${cloudinary.api.key}")
    private String api_key;

    @Value("${cloudinary.api.secret}")
    private String api_secret;

    private Cloudinary cloudinary;

    public String upload(String fileBase64, List<String> tags) {
        try {
            Map params = ObjectUtils.asMap("tags", tags);

            Map uploadResult = cloudinary.uploader().upload(fileBase64, params);

            return uploadResult.get("url").toString();
        } catch (Exception ex) {
            return null;
        }
    }

    public String delete(String tag) {
        try {
            Map uploadResult = cloudinary.api().deleteResourcesByTag(tag, ObjectUtils.asMap());

            return uploadResult.toString();
        } catch (Exception ex) {
            return null;
        }
    }

    @PostConstruct
    private void init() {
        cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloud_name,
                "api_key", api_key,
                "api_secret", api_secret));
    }
}
