package com.more_community.api.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Set;

@Data
public class SaveCommunityRequest {
    @NotNull(message = "Это поле обязательно для заполнения")
    private String avatar;
    @NotNull(message = "Это поле обязательно для заполнения")
    private String banner;
    @NotNull(message = "Это поле обязательно для заполнения")
    private String name;
    @NotNull(message = "Это поле обязательно для заполнения")
    private String description;
    @NotNull(message = "Это поле обязательно для заполнения")
    private Set<String> keywords;
}
