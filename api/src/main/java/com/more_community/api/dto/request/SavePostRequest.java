package com.more_community.api.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class SavePostRequest {
    @NotNull(message = "Это поле обязательно для заполнения")
    private String title;
    @NotNull(message = "Это поле обязательно для заполнения")
    private String content;
    @NotNull(message = "Это поле обязательно")
    private Long communityId;
    private List<String> files;
}
