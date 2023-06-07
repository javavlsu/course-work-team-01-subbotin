package com.more_community.api.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Set;

@Data
public class SaveVacancyRequest {
    @NotNull(message = "Это поле обязательно")
    private Long communityId;
    @NotNull(message = "Это поле обязательно для заполнения")
    private String title;
    @NotNull(message = "Это поле обязательно для заполнения")
    private String content;
    @NotNull(message = "Это поле обязательно для заполнения")
    private Set<String> keywords;
    @NotNull(message = "Это поле обязательно для заполнения")
    private Number minSalary;
    private Number maxSalary;
    @NotNull(message = "Это поле обязательно для заполнения")
    private String currency;
}
