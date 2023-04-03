package com.more_community.api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Long id;
    private String avatar;
    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    @ManyToMany(mappedBy = "followers")
    private Set<Community> followedCommunities = new HashSet<>();
    @OneToMany(mappedBy="owner", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private Set<Community> myCommunities = new HashSet<>();
}
