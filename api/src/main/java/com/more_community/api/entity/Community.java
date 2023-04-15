package com.more_community.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Community {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Long id;
    private String avatar;
    private String banner;
    private String name;
    private String description;
    @ElementCollection
    private Set<String> keywords;
    private String streamId;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
        name = "community_followers",
        joinColumns = { @JoinColumn(name = "community_id") },
        inverseJoinColumns = { @JoinColumn(name = "follower_id") }
    )
    @JsonBackReference
    private List<User> followers;
    @ManyToOne(optional = false)
    @JoinColumn(nullable=false)
    @JsonBackReference
    private User owner;
}
