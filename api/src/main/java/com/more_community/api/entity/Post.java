package com.more_community.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Long id;
    private String title;
    private String content;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "post_likes",
            joinColumns = { @JoinColumn(name = "post_id") },
            inverseJoinColumns = { @JoinColumn(name = "user_id") }
    )
    @JsonBackReference
    private List<User> likes;
    @ManyToOne(optional = false)
    @JoinColumn(nullable=false)
    @JsonBackReference
    private Community community;
}
