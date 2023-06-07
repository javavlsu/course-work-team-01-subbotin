package com.more_community.api.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class UploadFilesRequest {
    private List<String> files;
    private List<String> tags;
}
