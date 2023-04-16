package com.more_community.api.repository;

import com.more_community.api.entity.Comment;
import com.more_community.api.entity.Post;
import com.more_community.api.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CommentRepository extends CrudRepository<Comment, Long> {
    List<Comment> findByPost(Post post);
    List<Comment> findCommentByUser(User user);
}
