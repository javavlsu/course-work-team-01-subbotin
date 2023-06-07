package com.more_community.api.controller;

import com.more_community.api.annotation.IsLogined;
import com.more_community.api.dto.request.QueryResponse;
import com.more_community.api.dto.request.SavePostRequest;
import com.more_community.api.dto.response.LikeResponse;
import com.more_community.api.dto.response.PaginationResponse;
import com.more_community.api.dto.response.PostResponse;
import com.more_community.api.entity.User;
import com.more_community.api.exceptions.CommunityNotFound;
import com.more_community.api.exceptions.NoIsOwnerCommunity;
import com.more_community.api.exceptions.PostNotFound;
import com.more_community.api.service.PostService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping(value = "/posts")
public class PostController {
    @Autowired
    private PostService postService;

    @GetMapping
    public ResponseEntity<QueryResponse> getAll(HttpServletRequest req) {
        List<PostResponse> postsResponse = postService.getAll(req);

        return ResponseEntity.ok(new QueryResponse(HttpStatus.OK.value()).withData(postsResponse));
    }

    @PostMapping
    @IsLogined
    public ResponseEntity<QueryResponse> create(@Valid @RequestBody SavePostRequest request, HttpServletRequest req) throws CommunityNotFound, NoIsOwnerCommunity {
        try {
            PostResponse postResponse = postService.save(request, req);

            return ResponseEntity.status(HttpStatus.CREATED).body(new QueryResponse(HttpStatus.OK.value()).withData(postResponse));
        } catch (CommunityNotFound e) {
            throw new CommunityNotFound();
        } catch (NoIsOwnerCommunity e) {
            throw new NoIsOwnerCommunity();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<QueryResponse> getById(@PathVariable("id") long postId, HttpServletRequest req) throws PostNotFound {
        try {
            PostResponse postResponse = postService.getById(postId, req);

            return ResponseEntity.ok(new QueryResponse(HttpStatus.OK.value()).withData(postResponse));
        } catch (PostNotFound e) {
            throw new PostNotFound();
        }
    }

    @PutMapping("/{id}")
    @IsLogined
    public ResponseEntity<QueryResponse> update(@Valid @RequestBody SavePostRequest request, @PathVariable("id") long postId, HttpServletRequest req) throws PostNotFound, CommunityNotFound, NoIsOwnerCommunity {
        try {
            PostResponse postResponse = postService.update(postId, request, req);

            return ResponseEntity.status(HttpStatus.CREATED).body(new QueryResponse(HttpStatus.OK.value()).withData(postResponse));
        } catch (PostNotFound e) {
            throw new PostNotFound();
        } catch (CommunityNotFound e) {
            throw new CommunityNotFound();
        } catch (NoIsOwnerCommunity e) {
            throw new NoIsOwnerCommunity();
        }
    }

    @DeleteMapping("/{id}")
    @IsLogined
    public ResponseEntity<QueryResponse> delete(@PathVariable("id") long postId, HttpServletRequest req) throws PostNotFound, CommunityNotFound, NoIsOwnerCommunity {
        try {
            postService.delete(postId, req);

            return ResponseEntity.ok(new QueryResponse(HttpStatus.OK.value()).withData(true));
        } catch (PostNotFound e) {
            throw new PostNotFound();
        } catch (CommunityNotFound e) {
            throw new CommunityNotFound();
        } catch (NoIsOwnerCommunity e) {
            throw new NoIsOwnerCommunity();
        }
    }

    @GetMapping("/community/{id}")
    public ResponseEntity<QueryResponse> getCommunityPosts(@RequestParam(value = "page", defaultValue = "1") Integer page, @RequestParam(value = "limit", defaultValue = "10") Integer limit, @PathVariable("id") long communityId, HttpServletRequest req) throws CommunityNotFound {
        try {
            PaginationResponse<PostResponse> postsResponses = postService.getCommunityPosts(page, limit, communityId, req);

            return ResponseEntity.ok(new QueryResponse(HttpStatus.OK.value()).withData(postsResponses));
        } catch (CommunityNotFound e) {
            throw new CommunityNotFound();
        }
    }

    @GetMapping("/{id}/likes")
    public ResponseEntity<QueryResponse> getLikes(@PathVariable("id") long postId) throws PostNotFound {
        try {
            List<User> likes = postService.getPostLikes(postId);

            return ResponseEntity.ok(new QueryResponse(HttpStatus.OK.value()).withData(likes));
        } catch (PostNotFound e) {
            throw new PostNotFound();
        }
    }

    @PostMapping("/{id}/like")
    @IsLogined
    public ResponseEntity<QueryResponse> like(@PathVariable("id") long postId, HttpServletRequest req) throws PostNotFound {
        try {
            LikeResponse response = postService.like(postId, req);

            return ResponseEntity.ok(new QueryResponse(HttpStatus.OK.value()).withData(response));
        } catch (PostNotFound e) {
            throw new PostNotFound();
        }
    }
}
