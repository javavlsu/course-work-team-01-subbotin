package com.more_community.api.service;

import com.more_community.api.entity.Comment;
import com.more_community.api.entity.Community;
import com.more_community.api.entity.Post;
import com.more_community.api.entity.User;
import com.more_community.api.repository.CommentRepository;
import com.more_community.api.repository.CommunityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    public List<Comment> getAll() {
        return (List<Comment>) commentRepository.findAll();
    }
    public Optional<Comment> getById(Long commentId) { return commentRepository.findById(commentId); }

    public Comment save(Comment comment) {
        return commentRepository.save(comment);
    }

    public void delete(Long commentId) {
        commentRepository.deleteById(commentId);
    }

    public List<Comment> getPostComments(Post post) {
        return commentRepository.findByPost(post);
    }
    public List<Comment> getUserComments(User user) {
        return commentRepository.findCommentByUser(user);
    }
}
