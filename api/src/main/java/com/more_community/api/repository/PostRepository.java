package com.more_community.api.repository;

import com.more_community.api.entity.Community;
import com.more_community.api.entity.Post;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PostRepository extends CrudRepository<Post, Long> {
    List<Post> findByLikesId(Long userId);
    List<Post> findByCommunity(Community community);
}
