package com.more_community.api.controller;

import com.more_community.api.annotation.IsLogined;
import com.more_community.api.dto.*;
import com.more_community.api.entity.Community;
import com.more_community.api.entity.Post;
import com.more_community.api.entity.User;
import com.more_community.api.security.jwt.JwtAuthenticationException;
import com.more_community.api.security.jwt.JwtTokenProvider;
import com.more_community.api.service.CommunityService;
import com.more_community.api.service.PostService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping(value = "/posts")
public class PostController {
    @Autowired
    private PostService postService;

    @Autowired
    private CommunityService communityService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @GetMapping
    public ResponseEntity getAll() {
        List<Post> posts = postService.getAll();

        return ResponseEntity.ok(posts);
    }

    @PostMapping
    @IsLogined
    public ResponseEntity create(@Valid @RequestBody SavePostRequest request, HttpServletRequest req) throws JwtAuthenticationException {
        User user = jwtTokenProvider.getUser(req);

        Optional<Community> existingCommunity = communityService.getById(request.getCommunityId());

        if (existingCommunity.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new QueryResponse(HttpStatus.NOT_FOUND.value()).withMessage("Такого сообщества не существует"));
        }

        Community community = existingCommunity.get();

        if (!Objects.equals(community.getOwner(), user)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new QueryResponse(HttpStatus.FORBIDDEN.value()).withMessage("Нет доступа"));
        }

        Post model = Post.builder().title(request.getTitle()).content(request.getContent()).likes(new ArrayList<>()).community(community).build();

        postService.save(model);

        return ResponseEntity.status(HttpStatus.CREATED).body(new QueryResponse(HttpStatus.OK.value()).withData(model));
    }

    @GetMapping("/{id}")
    public ResponseEntity getById(@PathVariable("id") long postId) {
        Optional<Post> existingPost = postService.getById(postId);

        if (existingPost.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new QueryResponse(HttpStatus.NOT_FOUND.value()).withMessage("Такого поста не существует"));
        }

        return ResponseEntity.ok(existingPost.get());
    }

    @PutMapping("/{id}")
    @IsLogined
    public ResponseEntity update(@Valid @RequestBody UpdatePostRequest request, @PathVariable("id") long postId, HttpServletRequest req) throws JwtAuthenticationException {
        User user = jwtTokenProvider.getUser(req);

        Optional<Post> existingPost = postService.getById(postId);

        if (existingPost.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new QueryResponse(HttpStatus.NOT_FOUND.value()).withMessage("Такого поста не существует"));
        }

        Post post = existingPost.get();

        if (post.getId() != postId) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new QueryResponse(HttpStatus.NOT_FOUND.value()).withMessage("Такого поста не существует"));
        }

        Optional<Community> existingCommunity = communityService.getById(post.getId());

        if (existingCommunity.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new QueryResponse(HttpStatus.NOT_FOUND.value()).withMessage("Такого сообщества не существует"));
        }

        Community community = existingCommunity.get();

        if (!Objects.equals(community.getOwner(), user)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new QueryResponse(HttpStatus.FORBIDDEN.value()).withMessage("Нет доступа"));
        }

        Post model = Post.builder().id(post.getId()).title(request.getTitle()).content(request.getContent()).likes(new ArrayList<>()).community(community).build();

        postService.save(model);

        return ResponseEntity.status(HttpStatus.CREATED).body(new QueryResponse(HttpStatus.OK.value()).withData(model));
    }

    @DeleteMapping("/{id}")
    @IsLogined
    public ResponseEntity delete(@PathVariable("id") long postId, HttpServletRequest req) throws JwtAuthenticationException {
        User user = jwtTokenProvider.getUser(req);

        Optional<Post> existingPost = postService.getById(postId);

        if (existingPost.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new QueryResponse(HttpStatus.NOT_FOUND.value()).withMessage("Такого поста не существует"));
        }

        Post post = existingPost.get();

        Optional<Community> existingCommunity = communityService.getById(post.getId());

        if (existingCommunity.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new QueryResponse(HttpStatus.NOT_FOUND.value()).withMessage("Такого сообщества не существует"));
        }

        Community community = existingCommunity.get();

        if (!Objects.equals(community.getOwner(), user)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new QueryResponse(HttpStatus.FORBIDDEN.value()).withMessage("Нет доступа"));
        }

        postService.delete(postId);

        return ResponseEntity.ok(true);
    }

    @GetMapping("/community/{id}")
    public ResponseEntity getCommunityPosts(@PathVariable("id") long communityId) {
        Optional<Community> existingCommunity = communityService.getById(communityId);

        if (existingCommunity.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new QueryResponse(HttpStatus.NOT_FOUND.value()).withMessage("Такого сообщества не существует"));
        }

        Community community = existingCommunity.get();

        List<Post> posts = postService.getCommunityPosts(community);

        return ResponseEntity.ok(posts);
    }

    @GetMapping("/{id}/likes")
    public ResponseEntity getLikes(@PathVariable("id") long postId) {
        Optional<Post> existingPost = postService.getById(postId);

        if (existingPost.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new QueryResponse(HttpStatus.NOT_FOUND.value()).withMessage("Такого поста не существует"));
        }

        Post post = existingPost.get();

        List<User> likes = post.getLikes();

        return ResponseEntity.ok(likes);
    }

    @PostMapping("/{id}/like")
    @IsLogined
    public ResponseEntity like(@PathVariable("id") long postId, HttpServletRequest req) throws JwtAuthenticationException {
        User user = jwtTokenProvider.getUser(req);

        Optional<Post> existingPost = postService.getById(postId);

        if (existingPost.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new QueryResponse(HttpStatus.NOT_FOUND.value()).withMessage("Такого поста не существует"));
        }

        Post post = existingPost.get();

        List<User> likes = post.getLikes();

        if (likes.contains(user)) {
            postService.unlikePost(user, post);
        } else {
            postService.likePost(user, post);
        }

        return ResponseEntity.ok(likes.contains(user));
    }
}
