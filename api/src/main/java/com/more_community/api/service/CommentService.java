package com.more_community.api.service;

import com.more_community.api.dto.request.SaveCommentRequest;
import com.more_community.api.entity.Comment;
import com.more_community.api.entity.Post;
import com.more_community.api.entity.User;
import com.more_community.api.exceptions.CommentNotFound;
import com.more_community.api.exceptions.NoIsOwnerComment;
import com.more_community.api.exceptions.PostNotFound;
import com.more_community.api.repository.CommentRepository;
import com.more_community.api.repository.PostRepository;
import com.more_community.api.security.jwt.JwtTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public List<Comment> getAll() {
        return (List<Comment>) commentRepository.findAll();
    }

    public Comment getById(Long commentId) throws CommentNotFound {
        Optional<Comment> existingComment = commentRepository.findById(commentId);

        if (existingComment.isEmpty()) {
            throw new CommentNotFound();
        }

        return existingComment.get();
    }

    public List<Comment> getPostComments(Long postId) throws PostNotFound {
        Optional<Post> existingPost = postRepository.findById(postId);

        if (existingPost.isEmpty()) {
            throw new PostNotFound();
        }

        Post post = existingPost.get();

        return commentRepository.findByPost(post);
    }

    public List<Comment> getUserComments(HttpServletRequest req) {
        User user = jwtTokenProvider.getUser(req);

        return commentRepository.findCommentByUser(user);
    }

    public Comment save(SaveCommentRequest request, HttpServletRequest req) throws PostNotFound {
        User user = jwtTokenProvider.getUser(req);
        Optional<Post> existingPost = postRepository.findById(request.getPostId());

        if (existingPost.isEmpty()) {
            throw new PostNotFound();
        }

        Post post = existingPost.get();
        Comment model = new Comment();

        model.setContent(request.getContent());
        model.setCreatedAt(new Date());
        model.setPost(post);
        model.setUser(user);

        return commentRepository.save(model);
    }

    public Comment update(Long commentId, SaveCommentRequest request, HttpServletRequest req) throws CommentNotFound, PostNotFound, NoIsOwnerComment {
        User user = jwtTokenProvider.getUser(req);
        Optional<Comment> existingComment = commentRepository.findById(commentId);

        if (existingComment.isEmpty()) {
            throw new CommentNotFound();
        }

        Comment comment = existingComment.get();

        Optional<Post> existingPost = postRepository.findById(comment.getPost().getId());

        if (existingPost.isEmpty()) {
            throw new PostNotFound();
        }

        if (!Objects.equals(comment.getUser(), user)) {
            throw new NoIsOwnerComment();
        }

        Comment model = new Comment();

        model.setContent(request.getContent());
        model.setCreatedAt(comment.getCreatedAt());
        model.setPost(comment.getPost());
        model.setUser(comment.getUser());

        return commentRepository.save(model);
    }

    public void delete(Long commentId, HttpServletRequest req) throws CommentNotFound, NoIsOwnerComment {
        User user = jwtTokenProvider.getUser(req);

        Optional<Comment> existingComment = commentRepository.findById(commentId);

        if (existingComment.isEmpty()) {
            throw new CommentNotFound();
        }

        Comment comment = existingComment.get();

        if (!Objects.equals(comment.getUser(), user)) {
            throw new NoIsOwnerComment();
        }

        commentRepository.deleteById(comment.getId());
    }
}
