package com.more_community.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    @ManyToMany
    @JoinTable(name = "post_likes", joinColumns = {@JoinColumn(name = "post_id")}, inverseJoinColumns = {@JoinColumn(name = "user_id")})
    @JsonBackReference
    private List<User> likes;
    @ManyToOne(optional = false)
    @JoinColumn
    @JsonBackReference
    private Community community;
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonBackReference
    private Set<Comment> comments = new HashSet<>();
    @ElementCollection
    private Set<String> attachments;
    private Date createdAt;
}
