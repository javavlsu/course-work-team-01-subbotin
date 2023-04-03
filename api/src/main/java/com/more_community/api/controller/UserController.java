package com.more_community.api.controller;

import com.more_community.api.entity.Community;
import com.more_community.api.entity.User;
import com.more_community.api.security.jwt.JwtTokenProvider;
import com.more_community.api.service.CommunityService;
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
    private JwtTokenProvider jwtTokenProvider;

    @GetMapping("/followed-communities")
    public ResponseEntity getFollowedCommunities(HttpServletRequest req) {
        User user = jwtTokenProvider.getUser(req);

        List<Community> communities = communityService.getFollowedCommunities(user.getId());

        return ResponseEntity.ok(communities);
    }

    @GetMapping("/my-communities")
    public ResponseEntity getMyCommunities(HttpServletRequest req) {
        User user = jwtTokenProvider.getUser(req);

        List<Community> communities = communityService.getOwnerCommunities(user);

        return ResponseEntity.ok(communities);
    }
}
