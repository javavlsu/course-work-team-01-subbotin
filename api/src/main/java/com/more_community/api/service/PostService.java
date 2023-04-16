package com.more_community.api.service;

import com.more_community.api.entity.Community;
import com.more_community.api.entity.Post;
import com.more_community.api.entity.User;
import com.more_community.api.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public List<Post> getAll() { return (List<Post>) postRepository.findAll(); }

    public Optional<Post> getById(Long postId) { return postRepository.findById(postId); }

    public Post save(Post post) {
        return postRepository.save(post);
    }

    public void delete(Long postId) {
        postRepository.deleteById(postId);
    }

    public List<Post> getLikedPosts(Long userId) { return postRepository.findByLikesId(userId); }
    public List<Post> getCommunityPosts(Community community) { return postRepository.findByCommunity(community); }

    public Integer likePost(User user, Post post) {
        post.getLikes().add(user);

        return postRepository.save(post).getLikes().size();
    }

    public Integer unlikePost(User user, Post post) {
        List<User> likes = post.getLikes();

        likes.remove(user);

        return postRepository.save(post).getLikes().size();
    }
}
