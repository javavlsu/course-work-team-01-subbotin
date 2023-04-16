package com.more_community.api.controller;

import com.more_community.api.annotation.IsLogined;
import com.more_community.api.entity.Community;
import com.more_community.api.entity.Post;
import com.more_community.api.entity.User;
import com.more_community.api.security.jwt.JwtAuthenticationException;
import com.more_community.api.security.jwt.JwtTokenProvider;
import com.more_community.api.service.CommunityService;
import com.more_community.api.service.PostService;
import com.more_community.api.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private CommunityService communityService;

    @Autowired
    private PostService postService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @GetMapping("/followed-communities")
    @IsLogined
    public ResponseEntity getFollowedCommunities(HttpServletRequest req) throws JwtAuthenticationException {
        User user = jwtTokenProvider.getUser(req);

        List<Community> communities = communityService.getFollowedCommunities(user.getId());

        return ResponseEntity.ok(communities);
    }

    @GetMapping("/my-communities")
    @IsLogined
    public ResponseEntity getMyCommunities(HttpServletRequest req) throws JwtAuthenticationException {
        User user = jwtTokenProvider.getUser(req);

        List<Community> communities = communityService.getOwnerCommunities(user);

        return ResponseEntity.ok(communities);
    }

    @GetMapping("/my-likes")
    @IsLogined
    public ResponseEntity getMyLikes(HttpServletRequest req) throws JwtAuthenticationException {
        User user = jwtTokenProvider.getUser(req);

        List<Post> posts = postService.getLikedPosts(user.getId());

        return ResponseEntity.ok(posts);
    }
}
