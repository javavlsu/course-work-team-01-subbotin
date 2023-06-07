package com.more_community.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Vacancy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Long id;
    private String title;
    private String content;
    @ElementCollection
    private Set<String> keywords;
    private Number minSalary;
    private Number maxSalary;
    private String currency;
    private Number views;
    @ManyToOne(optional = false)
    @JoinColumn(nullable = false)
    @JsonBackReference
    private Community community;
    @ManyToMany
    @JoinTable(name = "vacansy_responses", joinColumns = {@JoinColumn(name = "vacancy_id")}, inverseJoinColumns = {@JoinColumn(name = "user_id")})
    @JsonBackReference
    private List<User> responses;
    private Date createdAt;
}
