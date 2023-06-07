package com.more_community.api.repository;

import com.more_community.api.entity.Community;
import com.more_community.api.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByLikesId(Long userId);

    Page<Post> findByCommunityOrderByCreatedAtDesc(Community community, Pageable pageable);
}
