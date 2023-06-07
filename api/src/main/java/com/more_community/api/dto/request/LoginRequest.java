package com.more_community.api.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LoginRequest {
    @NotNull(message = "Это поле обязательно для заполнения")
    private String username;
    @NotNull(message = "Это поле обязательно для заполнения")
    private String password;
}
