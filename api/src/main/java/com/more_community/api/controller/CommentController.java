package com.more_community.api.controller;

import com.more_community.api.annotation.IsLogined;
import com.more_community.api.dto.*;
import com.more_community.api.entity.Comment;
import com.more_community.api.entity.Post;
import com.more_community.api.entity.User;
import com.more_community.api.security.jwt.JwtAuthenticationException;
import com.more_community.api.security.jwt.JwtTokenProvider;
import com.more_community.api.service.CommentService;
import com.more_community.api.service.PostService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping(value = "/comments")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @Autowired
    private PostService postService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @GetMapping
    public ResponseEntity getAll() {
        List<Comment> comments = commentService.getAll();

        return ResponseEntity.ok(comments);
    }

    @PostMapping
    @IsLogined
    public ResponseEntity create(@Valid @RequestBody SaveCommentRequest request, HttpServletRequest req) throws JwtAuthenticationException {
        User user = jwtTokenProvider.getUser(req);

        Optional<Post> existingPost = postService.getById(request.getPostId());

        if (existingPost.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new QueryResponse(HttpStatus.NOT_FOUND.value()).withMessage("Такого поста не существует"));
        }

        Comment model = Comment.builder().content(request.getContent()).post(existingPost.get()).user(user).build();

        commentService.save(model);

        return ResponseEntity.status(HttpStatus.CREATED).body(new QueryResponse(HttpStatus.OK.value()).withData(model));
    }

    @GetMapping("/{id}")
    public ResponseEntity getById(@PathVariable("id") long commentId) {
        Optional<Comment> existingComment = commentService.getById(commentId);

        if (existingComment.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new QueryResponse(HttpStatus.NOT_FOUND.value()).withMessage("Такого комментария не существует"));
        }

        return ResponseEntity.ok(existingComment.get());
    }

    @PutMapping("/{id}")
    @IsLogined
    public ResponseEntity update(@Valid @RequestBody UpdateCommentRequest request, @PathVariable("id") long commentId, HttpServletRequest req) throws JwtAuthenticationException {
        User user = jwtTokenProvider.getUser(req);

        Optional<Comment> existingComment = commentService.getById(commentId);

        if (existingComment.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new QueryResponse(HttpStatus.NOT_FOUND.value()).withMessage("Такого комментария не существует"));
        }

        Comment comment = existingComment.get();

        Optional<Post> existingPost = postService.getById(request.getPostId());

        if (existingPost.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new QueryResponse(HttpStatus.NOT_FOUND.value()).withMessage("Такого поста не существует"));
        }

        if (comment.getId() != commentId) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new QueryResponse(HttpStatus.NOT_FOUND.value()).withMessage("Такого поста не существует"));
        }

        if (!Objects.equals(comment.getUser(), user)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new QueryResponse(HttpStatus.FORBIDDEN.value()).withMessage("Нет доступа"));
        }

        Comment model = Comment.builder().id(comment.getId()).content(request.getContent()).post(existingPost.get()).user(user).build();

        commentService.save(model);

        return ResponseEntity.status(HttpStatus.CREATED).body(new QueryResponse(HttpStatus.OK.value()).withData(model));
    }

    @DeleteMapping("/{id}")
    @IsLogined
    public ResponseEntity delete(@PathVariable("id") long commentId, HttpServletRequest req) throws JwtAuthenticationException {
        User user = jwtTokenProvider.getUser(req);

        Optional<Comment> existingComment = commentService.getById(commentId);

        if (existingComment.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new QueryResponse(HttpStatus.NOT_FOUND.value()).withMessage("Такого комментария не существует"));
        }

        Comment comment = existingComment.get();

        if (!Objects.equals(comment.getUser(), user)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new QueryResponse(HttpStatus.FORBIDDEN.value()).withMessage("Нет доступа"));
        }

        commentService.delete(commentId);

        return ResponseEntity.ok(true);
    }

    @GetMapping("/post/{id}")
    public ResponseEntity getCommunityPosts(@PathVariable("id") long postId) {
        Optional<Post> existingPost = postService.getById(postId);

        if (existingPost.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new QueryResponse(HttpStatus.NOT_FOUND.value()).withMessage("Такого поста не существует"));
        }

        Post post = existingPost.get();

        List<Comment> comments = commentService.getPostComments(post);

        return ResponseEntity.ok(comments);
    }
}
