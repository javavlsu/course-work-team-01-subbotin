package com.more_community.api.service;

import com.more_community.api.entity.Community;
import com.more_community.api.entity.User;
import com.more_community.api.repository.CommunityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommunityService {
    @Autowired
    private CommunityRepository communityRepository;

    public List<Community> getAll() {
        return (List<Community>) communityRepository.findAll();
    }
    public Optional<Community> getById(Long communityId) { return communityRepository.findById(communityId); }

    public Community save(Community community) {
        return communityRepository.save(community);
    }

    public void delete(Long communityId) {
        communityRepository.deleteById(communityId);
    }

    public List<Community> getFollowedCommunities(Long userId) {
        return communityRepository.findByFollowersId(userId);
    }
    public List<Community> getOwnerCommunities(User user) {
        return communityRepository.findCommunityByOwner(user);
    }

    public List<User> followCommunity(User user, Community community) {
        community.getFollowers().add(user);

        return communityRepository.save(community).getFollowers();
    }

    public List<User> unfollowCommunity(User user, Community community) {
        List<User> followers = community.getFollowers();

        followers.remove(user);

        return communityRepository.save(community).getFollowers();
    }
}
