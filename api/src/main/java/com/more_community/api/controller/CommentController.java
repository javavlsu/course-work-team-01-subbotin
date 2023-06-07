package com.more_community.api.controller;

import com.more_community.api.annotation.IsLogined;
import com.more_community.api.dto.request.QueryResponse;
import com.more_community.api.dto.request.SaveCommentRequest;
import com.more_community.api.entity.Comment;
import com.more_community.api.exceptions.CommentNotFound;
import com.more_community.api.exceptions.NoIsOwnerComment;
import com.more_community.api.exceptions.PostNotFound;
import com.more_community.api.service.CommentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping(value = "/comments")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @GetMapping
    public ResponseEntity<QueryResponse> getAll() {
        List<Comment> comments = commentService.getAll();

        return ResponseEntity.ok(new QueryResponse(HttpStatus.OK.value()).withData(comments));
    }

    @PostMapping
    @IsLogined
    public ResponseEntity<QueryResponse> create(@Valid @RequestBody SaveCommentRequest request, HttpServletRequest req) throws PostNotFound {
        try {
            Comment comment = commentService.save(request, req);

            return ResponseEntity.status(HttpStatus.CREATED).body(new QueryResponse(HttpStatus.OK.value()).withData(comment));
        } catch (PostNotFound e) {
            throw new PostNotFound();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<QueryResponse> getById(@PathVariable("id") long commentId) throws CommentNotFound {
        try {
            Comment comment = commentService.getById(commentId);

            return ResponseEntity.ok(new QueryResponse(HttpStatus.OK.value()).withData(comment));
        } catch (CommentNotFound e) {
            throw new CommentNotFound();
        }
    }

    @PutMapping("/{id}")
    @IsLogined
    public ResponseEntity<QueryResponse> update(@Valid @RequestBody SaveCommentRequest request, @PathVariable("id") long commentId, HttpServletRequest req) throws CommentNotFound, PostNotFound, NoIsOwnerComment {
        try {
            Comment comment = commentService.update(commentId, request, req);

            return ResponseEntity.status(HttpStatus.CREATED).body(new QueryResponse(HttpStatus.OK.value()).withData(comment));
        } catch (CommentNotFound e) {
            throw new CommentNotFound();
        } catch (PostNotFound e) {
            throw new PostNotFound();
        } catch (NoIsOwnerComment e) {
            throw new NoIsOwnerComment();
        }
    }

    @DeleteMapping("/{id}")
    @IsLogined
    public ResponseEntity<QueryResponse> delete(@PathVariable("id") long commentId, HttpServletRequest req) throws CommentNotFound, NoIsOwnerComment {
        try {
            commentService.delete(commentId, req);

            return ResponseEntity.ok(new QueryResponse(HttpStatus.OK.value()).withData(true));
        } catch (CommentNotFound e) {
            throw new CommentNotFound();
        } catch (NoIsOwnerComment e) {
            throw new NoIsOwnerComment();
        }
    }

    @GetMapping("/post/{id}")
    public ResponseEntity<QueryResponse> getPostComments(@PathVariable("id") long postId) throws PostNotFound {
        try {
            List<Comment> comments = commentService.getPostComments(postId);

            return ResponseEntity.ok(new QueryResponse(HttpStatus.OK.value()).withData(comments));
        } catch (PostNotFound e) {
            throw new PostNotFound();
        }
    }
}
