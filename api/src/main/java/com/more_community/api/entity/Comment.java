package com.more_community.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Long id;
    private String content;
    @ManyToOne(optional = false)
    @JoinColumn(nullable=false)
    @JsonBackReference
    private Post post;
    @ManyToOne(optional = false)
    @JoinColumn(nullable=false)
    private User user;
}
