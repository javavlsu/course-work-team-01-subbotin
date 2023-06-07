package com.more_community.api.repository;

import com.more_community.api.entity.Community;
import com.more_community.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommunityRepository extends JpaRepository<Community, Long> {
    List<Community> findByFollowersId(Long userId);

    List<Community> findCommunityByOwner(User user);
}
