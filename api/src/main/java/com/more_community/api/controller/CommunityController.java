package com.more_community.api.controller;

import com.more_community.api.dto.QueryResponse;
import com.more_community.api.dto.SaveCommunityRequest;
import com.more_community.api.dto.UpdateCommunityRequest;
import com.more_community.api.entity.Community;
import com.more_community.api.entity.User;
import com.more_community.api.security.jwt.JwtTokenProvider;
import com.more_community.api.service.CommunityService;
import com.more_community.api.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping(value = "/communities")
public class CommunityController {
    @Autowired
    private CommunityService communityService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @GetMapping
    public ResponseEntity getAll() {
        List<Community> communities = communityService.getAll();

        return ResponseEntity.ok(communities);
    }

    @PostMapping
    public ResponseEntity create(@Valid @RequestBody SaveCommunityRequest request, HttpServletRequest req) {
        User user = jwtTokenProvider.getUser(req);

        Community model = Community.builder().followers(new ArrayList<>()).owner(user).name(request.getName()).avatar(request.getAvatar()).description(request.getDescription()).banner(request.getBanner()).keywords(request.getKeywords()).build();

        communityService.save(model);

        return ResponseEntity.status(HttpStatus.CREATED).body(new QueryResponse(HttpStatus.OK.value()).withData(model));
    }

    @GetMapping("/{id}")
    public ResponseEntity getById(@PathVariable("id") long communityId) {
        Optional<Community> existingCommunity = communityService.getById(communityId);

        if (existingCommunity.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new QueryResponse(HttpStatus.NOT_FOUND.value()).withMessage("Такого сообщества не существует"));
        }

        return ResponseEntity.ok(existingCommunity.get());
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@Valid @RequestBody UpdateCommunityRequest request, @PathVariable("id") long communityId, HttpServletRequest req) {
        User user = jwtTokenProvider.getUser(req);

        Optional<Community> existingCommunity = communityService.getById(communityId);

        if (existingCommunity.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new QueryResponse(HttpStatus.NOT_FOUND.value()).withMessage("Такого сообщества не существует"));
        }

        Community community = existingCommunity.get();

        if (community.getId() != communityId) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new QueryResponse(HttpStatus.NOT_FOUND.value()).withMessage("Такого сообщества не существует"));
        }

        Community model = Community.builder().id(community.getId()).owner(user).name(request.getName()).avatar(request.getAvatar()).description(request.getDescription()).banner(request.getBanner()).keywords(request.getKeywords()).build();

        communityService.save(model);

        return ResponseEntity.status(HttpStatus.CREATED).body(new QueryResponse(HttpStatus.OK.value()).withData(model));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable("id") long communityId) {
        Optional<Community> existingCommunity = communityService.getById(communityId);

        if (existingCommunity.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new QueryResponse(HttpStatus.NOT_FOUND.value()).withMessage("Такого сообщества не существует"));
        }

        communityService.delete(communityId);

        return ResponseEntity.ok(true);
    }

    @GetMapping("/{id}/followers")
    public ResponseEntity getFollowers(@PathVariable("id") long communityId) {
        Optional<Community> existingCommunity = communityService.getById(communityId);

        if (existingCommunity.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new QueryResponse(HttpStatus.NOT_FOUND.value()).withMessage("Такого сообщества не существует"));
        }

        Community community = existingCommunity.get();

        List<User> followers = community.getFollowers();

        return ResponseEntity.ok(followers);
    }

    @PostMapping("/{id}/follow")
    public ResponseEntity getFollowedCommunities(@PathVariable("id") long communityId, HttpServletRequest req) {
        User user = jwtTokenProvider.getUser(req);

        Optional<Community> existingCommunity = communityService.getById(communityId);

        if (existingCommunity.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new QueryResponse(HttpStatus.NOT_FOUND.value()).withMessage("Такого сообщества не существует"));
        }

        Community community = existingCommunity.get();

        List<User> followers = community.getFollowers();

        if (followers.contains(user)) {
            communityService.unfollowCommunity(user, community);
        } else {
            communityService.followCommunity(user, community);
        }

        return ResponseEntity.ok(followers.contains(user));
    }
}
