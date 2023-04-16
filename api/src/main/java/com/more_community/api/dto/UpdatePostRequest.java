package com.more_community.api.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdatePostRequest {
    @NotNull(message = "Это поле обязательно")
    private String id;
    @NotNull(message = "Это поле обязательно для заполнения")
    private String title;
    @NotNull(message = "Это поле обязательно для заполнения")
    private String content;
    @NotNull(message = "Это поле обязательно")
    private Long communityId;
}
