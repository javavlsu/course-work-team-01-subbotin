package com.more_community.api.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateUserRequest {
    private String avatar;
    @NotNull(message = "Это поле обязательно для заполнения")
    private String username;
    @NotNull(message = "Это поле обязательно для заполнения")
    @Email(message = "Введите корректную почту")
    private String email;
}
