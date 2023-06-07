package com.more_community.api.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateCommentRequest {
    @NotNull(message = "Это поле обязательно")
    private String id;
    @NotNull(message = "Это поле обязательно для заполнения")
    private String content;
    @NotNull(message = "Это поле обязательно")
    private Long postId;
}
