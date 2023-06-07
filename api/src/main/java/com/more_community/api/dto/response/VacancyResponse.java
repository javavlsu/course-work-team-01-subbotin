package com.more_community.api.dto.response;

import com.more_community.api.entity.Vacancy;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VacancyResponse {
    public Long id;
    public String title;
    public String content;
    public Set<String> keywords;
    public Number minSalary;
    public Number maxSalary;
    public String currency;
    public Number views;
    public Date createdAt;
    public Number responsesCount;
    public boolean isMyResponse;
    public boolean isCommunityOwner;

    public VacancyResponse setVacancyData(Vacancy vacancy) {
        this.setId(vacancy.getId());
        this.setTitle(vacancy.getTitle());
        this.setContent(vacancy.getContent());
        this.setKeywords(vacancy.getKeywords());
        this.setMinSalary(vacancy.getMinSalary());
        this.setMaxSalary(vacancy.getMaxSalary());
        this.setCurrency(vacancy.getCurrency());
        this.setViews(vacancy.getViews());
        this.setCreatedAt(vacancy.getCreatedAt());

        return this;
    }
}
