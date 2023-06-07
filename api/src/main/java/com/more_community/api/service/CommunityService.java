package com.more_community.api.service;

import com.more_community.api.dto.request.SaveCommunityRequest;
import com.more_community.api.dto.response.CommunityResponse;
import com.more_community.api.dto.response.FollowResponse;
import com.more_community.api.dto.response.PaginationResponse;
import com.more_community.api.entity.Community;
import com.more_community.api.entity.User;
import com.more_community.api.exceptions.CommunityNotFound;
import com.more_community.api.exceptions.NoIsOwnerCommunity;
import com.more_community.api.repository.CommunityRepository;
import com.more_community.api.security.jwt.JwtTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@EnableTransactionManagement
public class CommunityService {
    @Autowired
    private CommunityRepository communityRepository;

    @Autowired
    private FileService fileService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public PaginationResponse<CommunityResponse> getAll(Integer page, Integer limit, HttpServletRequest req) {
        User user = jwtTokenProvider.getUser(req);
        Page<Community> communities = communityRepository.findAll(PageRequest.of(Math.max(page - 1, 0), limit));
        List<CommunityResponse> communitiesResponses = new ArrayList<>();

        for (Community community : communities) {
            CommunityResponse communityResponse = new CommunityResponse().setCommunityData(community);

            communityResponse.setCommunityOwner(user != null && Objects.equals(community.getOwner().getId(), user.getId()));
            communityResponse.setMyFollow(user != null && community.getFollowers().contains(user));
            communityResponse.setFollowersCount(community.getFollowers().size());

            communitiesResponses.add(communityResponse);
        }

        PaginationResponse<CommunityResponse> paginationResponse = new PaginationResponse<CommunityResponse>();

        paginationResponse.setItems(communitiesResponses);
        paginationResponse.setPage(communities.getNumber() + 1);
        paginationResponse.setLimit(limit);
        paginationResponse.setCount(communities.getTotalPages());

        return paginationResponse;
    }

    public CommunityResponse getById(Long communityId, HttpServletRequest req) throws CommunityNotFound {
        User user = jwtTokenProvider.getUser(req);

        Optional<Community> existingCommunity = communityRepository.findById(communityId);

        if (existingCommunity.isEmpty()) {
            throw new CommunityNotFound();
        }

        Community community = existingCommunity.get();
        CommunityResponse communityResponse = new CommunityResponse().setCommunityData(community);

        communityResponse.setCommunityOwner(user != null && Objects.equals(community.getOwner().getId(), user.getId()));
        communityResponse.setMyFollow(user != null && community.getFollowers().contains(user));
        communityResponse.setFollowersCount(community.getFollowers().size());

        return communityResponse;
    }

    public List<CommunityResponse> getUserFollowedCommunities(HttpServletRequest req) {
        User user = jwtTokenProvider.getUser(req);
        List<Community> communities = communityRepository.findByFollowersId(user.getId());
        List<CommunityResponse> communitiesResponses = new ArrayList<>();

        for (Community community : communities) {
            CommunityResponse communityResponse = new CommunityResponse().setCommunityData(community);

            communityResponse.setCommunityOwner(Objects.equals(community.getOwner().getId(), user.getId()));
            communityResponse.setMyFollow(community.getFollowers().contains(user));
            communityResponse.setFollowersCount(community.getFollowers().size());

            communitiesResponses.add(communityResponse);
        }

        return communitiesResponses;
    }

    public List<CommunityResponse> getOwnerCommunities(HttpServletRequest req) {
        User user = jwtTokenProvider.getUser(req);
        List<Community> communities = communityRepository.findCommunityByOwner(user);
        List<CommunityResponse> communitiesResponses = new ArrayList<>();

        for (Community community : communities) {
            CommunityResponse communityResponse = new CommunityResponse().setCommunityData(community);

            communityResponse.setCommunityOwner(Objects.equals(community.getOwner().getId(), user.getId()));
            communityResponse.setMyFollow(community.getFollowers().contains(user));
            communityResponse.setFollowersCount(community.getFollowers().size());

            communitiesResponses.add(communityResponse);
        }

        return communitiesResponses;
    }

    public List<User> getCommunityFollowers(Long communityId) throws CommunityNotFound {
        Optional<Community> existingCommunity = communityRepository.findById(communityId);

        if (existingCommunity.isEmpty()) {
            throw new CommunityNotFound();
        }

        Community community = existingCommunity.get();

        return community.getFollowers();
    }

    public CommunityResponse save(SaveCommunityRequest request, HttpServletRequest req) {
        User user = jwtTokenProvider.getUser(req);
        Community model = new Community();

        model.setAvatar(request.getAvatar());
        model.setBanner(request.getBanner());
        model.setName(request.getName());
        model.setDescription(request.getDescription());
        model.setKeywords(request.getKeywords());
        model.setOwner(user);
        model.setStreamId("");
        model.setFollowers(new ArrayList<>());
        model.setCreatedAt(new Date());

        Community community = communityRepository.save(model);

        community.setAvatar(fileService.upload(request.getAvatar(), Arrays.asList("community_" + community.getId(), "community_" + community.getId() + "_avatar")));
        community.setBanner(fileService.upload(request.getBanner(), Arrays.asList("community_" + community.getId(), "community_" + community.getId() + "_banner")));

        community = communityRepository.save(community);

        CommunityResponse communityResponse = new CommunityResponse().setCommunityData(community);

        communityResponse.setCommunityOwner(true);
        communityResponse.setMyFollow(false);
        communityResponse.setFollowersCount(0);

        return communityResponse;
    }

    public CommunityResponse update(Long communityId, SaveCommunityRequest request, HttpServletRequest req) throws CommunityNotFound, NoIsOwnerCommunity {
        User user = jwtTokenProvider.getUser(req);
        Optional<Community> existingCommunity = communityRepository.findById(communityId);

        if (existingCommunity.isEmpty()) {
            throw new CommunityNotFound();
        }

        Community community = existingCommunity.get();

        if (!Objects.equals(community.getOwner().getId(), user.getId())) {
            throw new NoIsOwnerCommunity();
        }

        Community model = new Community();

        model.setId(community.getId());
        model.setAvatar(request.getAvatar());
        model.setBanner(request.getBanner());
        model.setName(request.getName());
        model.setDescription(request.getDescription());
        model.setKeywords(request.getKeywords());
        model.setOwner(user);
        model.setStreamId(community.getStreamId());
        model.setFollowers(community.getFollowers());
        model.setCreatedAt(community.getCreatedAt());

        model.setAvatar(fileService.upload(request.getAvatar(), Arrays.asList("community_" + model.getId(), "community_" + model.getId() + "_avatar")));
        model.setBanner(fileService.upload(request.getBanner(), Arrays.asList("community_" + model.getId(), "community_" + model.getId() + "_banner")));

        communityRepository.save(model);

        CommunityResponse communityResponse = new CommunityResponse().setCommunityData(model);

        communityResponse.setCommunityOwner(Objects.equals(community.getOwner().getId(), user.getId()));
        communityResponse.setMyFollow(community.getFollowers().contains(user));
        communityResponse.setFollowersCount(community.getFollowers().size());

        return communityResponse;
    }

    public void delete(Long communityId, HttpServletRequest req) {
        User user = jwtTokenProvider.getUser(req);
        Optional<Community> existingCommunity = communityRepository.findById(communityId);

        if (existingCommunity.isEmpty()) {
            throw new CommunityNotFound();
        }

        Community community = existingCommunity.get();

        if (!Objects.equals(community.getOwner().getId(), user.getId())) {
            throw new NoIsOwnerCommunity();
        }

        fileService.delete("community_" + communityId);
        communityRepository.deleteById(community.getId());
    }

    @Transactional
    public FollowResponse follow(Long communityId, HttpServletRequest req) throws CommunityNotFound {
        User user = jwtTokenProvider.getUser(req);

        Optional<Community> existingCommunity = communityRepository.findById(communityId);

        if (existingCommunity.isEmpty()) {
            throw new CommunityNotFound();
        }

        Community community = existingCommunity.get();
        List<User> followers = community.getFollowers();

        if (followers.contains(user)) {
            followers.remove(user);
        } else {
            followers.add(user);
        }

        FollowResponse response = new FollowResponse();

        response.setMyFollow(followers.contains(user));
        response.setCount(followers.size());

        return response;
    }
}
