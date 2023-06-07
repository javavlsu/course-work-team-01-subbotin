package com.more_community.api.service;

import com.more_community.api.dto.request.SavePostRequest;
import com.more_community.api.dto.response.LikeResponse;
import com.more_community.api.dto.response.PaginationResponse;
import com.more_community.api.dto.response.PostResponse;
import com.more_community.api.dto.response.VacancyResponse;
import com.more_community.api.entity.Community;
import com.more_community.api.entity.Post;
import com.more_community.api.entity.User;
import com.more_community.api.exceptions.CommunityNotFound;
import com.more_community.api.exceptions.NoIsOwnerCommunity;
import com.more_community.api.exceptions.PostNotFound;
import com.more_community.api.repository.CommunityRepository;
import com.more_community.api.repository.PostRepository;
import com.more_community.api.security.jwt.JwtTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@EnableTransactionManagement
public class PostService {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommunityRepository communityRepository;

    @Autowired
    private FileService fileService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public List<PostResponse> getAll(HttpServletRequest req) {
        User user = jwtTokenProvider.getUser(req);
        List<Post> posts = postRepository.findAll();
        List<PostResponse> postsResponses = new ArrayList<>();

        for (Post post : posts) {
            PostResponse postResponse = new PostResponse();

            postResponse.setPostData(post);
            postResponse.setMyLike(user != null && post.getLikes().contains(user));
            postResponse.setLikesCount(post.getLikes().size());
            postResponse.setCommentsCount(post.getComments().size());
            postResponse.setCommunityOwner(user != null && Objects.equals(post.getCommunity().getOwner().getId(), user.getId()));

            postsResponses.add(postResponse);
        }

        return postsResponses;
    }

    public PostResponse getById(Long postId, HttpServletRequest req) throws PostNotFound {
        User user = jwtTokenProvider.getUser(req);
        Optional<Post> existingPost = postRepository.findById(postId);

        if (existingPost.isEmpty()) {
            throw new PostNotFound();
        }

        Post post = existingPost.get();
        PostResponse postResponse = new PostResponse();

        postResponse.setPostData(post);
        postResponse.setMyLike(user != null && post.getLikes().contains(user));
        postResponse.setLikesCount(post.getLikes().size());
        postResponse.setCommentsCount(post.getComments().size());
        postResponse.setCommunityOwner(user != null && Objects.equals(post.getCommunity().getOwner().getId(), user.getId()));

        return postResponse;
    }

    public List<PostResponse> getUserLikedPosts(HttpServletRequest req) {
        User user = jwtTokenProvider.getUser(req);
        List<Post> posts = postRepository.findByLikesId(user.getId());
        List<PostResponse> postsResponses = new ArrayList<>();

        for (Post post : posts) {
            PostResponse postResponse = new PostResponse();

            postResponse.setPostData(post);
            postResponse.setMyLike(post.getLikes().contains(user));
            postResponse.setLikesCount(post.getLikes().size());
            postResponse.setCommentsCount(post.getComments().size());
            postResponse.setCommunityOwner(Objects.equals(post.getCommunity().getOwner().getId(), user.getId()));

            postsResponses.add(postResponse);
        }

        return postsResponses;
    }

    public PaginationResponse<PostResponse> getCommunityPosts(Integer page, Integer limit, Long communityId, HttpServletRequest req) throws CommunityNotFound {
        User user = jwtTokenProvider.getUser(req);
        Optional<Community> existingCommunity = communityRepository.findById(communityId);

        if (existingCommunity.isEmpty()) {
            throw new CommunityNotFound();
        }

        Community community = existingCommunity.get();
        Page<Post> posts = postRepository.findByCommunityOrderByCreatedAtDesc(community, PageRequest.of(Math.max(page - 1, 0), limit));
        List<PostResponse> postsResponses = new ArrayList<>();

        for (Post post : posts) {
            PostResponse postResponse = new PostResponse();

            postResponse.setPostData(post);
            postResponse.setMyLike(user != null && post.getLikes().contains(user));
            postResponse.setLikesCount(post.getLikes().size());
            postResponse.setCommentsCount(post.getComments().size());
            postResponse.setCommunityOwner(user != null && Objects.equals(community.getOwner().getId(), user.getId()));

            postsResponses.add(postResponse);
        }

        PaginationResponse<PostResponse> paginationResponse = new PaginationResponse<PostResponse>();

        paginationResponse.setItems(postsResponses);
        paginationResponse.setPage(posts.getNumber() + 1);
        paginationResponse.setLimit(limit);
        paginationResponse.setCount(posts.getTotalPages());

        return paginationResponse;
    }

    public List<User> getPostLikes(Long postId) throws PostNotFound {
        Optional<Post> existingPost = postRepository.findById(postId);

        if (existingPost.isEmpty()) {
            throw new PostNotFound();
        }

        Post post = existingPost.get();

        return post.getLikes();
    }

    public PostResponse save(SavePostRequest request, HttpServletRequest req) throws CommunityNotFound, NoIsOwnerCommunity {
        User user = jwtTokenProvider.getUser(req);
        Optional<Community> existingCommunity = communityRepository.findById(request.getCommunityId());

        if (existingCommunity.isEmpty()) {
            throw new CommunityNotFound();
        }

        Community community = existingCommunity.get();

        if (!Objects.equals(community.getOwner().getId(), user.getId())) {
            throw new NoIsOwnerCommunity();
        }

        Post model = new Post();

        model.setTitle(request.getTitle());
        model.setContent(request.getContent());
        model.setLikes(new ArrayList<>());
        model.setCreatedAt(new Date());
        model.setCommunity(community);

        Post post = postRepository.save(model);

        Set<String> attachments = new HashSet<>();

        for (String fileBase64 : request.getFiles()) {
            attachments.add(fileService.upload(fileBase64, Arrays.asList("community_" + post.getCommunity().getId(), "post_" + post.getId())));
        }

        post.setAttachments(attachments);

        post = postRepository.save(post);

        PostResponse postResponse = new PostResponse();

        postResponse.setPostData(post);
        postResponse.setMyLike(false);
        postResponse.setLikesCount(0);
        postResponse.setCommentsCount(0);
        postResponse.setCommunityOwner(Objects.equals(community.getOwner().getId(), user.getId()));

        return postResponse;
    }

    public PostResponse update(Long postId, SavePostRequest request, HttpServletRequest req) throws PostNotFound, CommunityNotFound, NoIsOwnerCommunity {
        User user = jwtTokenProvider.getUser(req);
        Optional<Post> existingPost = postRepository.findById(postId);

        if (existingPost.isEmpty()) {
            throw new PostNotFound();
        }

        Post post = existingPost.get();
        Optional<Community> existingCommunity = communityRepository.findById(post.getCommunity().getId());

        if (existingCommunity.isEmpty()) {
            throw new CommunityNotFound();
        }

        Community community = existingCommunity.get();

        if (!Objects.equals(community.getOwner().getId(), user.getId())) {
            throw new NoIsOwnerCommunity();
        }

        Post model = new Post();

        model.setId(post.getId());
        model.setTitle(request.getTitle());
        model.setContent(request.getContent());
        model.setLikes(post.getLikes());
        model.setCreatedAt(post.getCreatedAt());
        model.setCommunity(community);

        Set<String> attachments = new HashSet<>();

        for (String fileBase64 : request.getFiles()) {
            attachments.add(fileService.upload(fileBase64, Arrays.asList("community_" + post.getCommunity().getId(), "post_" + post.getId())));
        }

        post.setAttachments(attachments);

        post = postRepository.save(model);

        PostResponse postResponse = new PostResponse();

        postResponse.setPostData(post);
        postResponse.setMyLike(post.getLikes().contains(user));
        postResponse.setLikesCount(post.getLikes().size());
        postResponse.setCommentsCount(post.getComments().size());
        postResponse.setCommunityOwner(Objects.equals(community.getOwner().getId(), user.getId()));

        return postResponse;
    }

    public void delete(Long postId, HttpServletRequest req) throws PostNotFound, CommunityNotFound, NoIsOwnerCommunity {
        User user = jwtTokenProvider.getUser(req);
        Optional<Post> existingPost = postRepository.findById(postId);

        if (existingPost.isEmpty()) {
            throw new PostNotFound();
        }

        Post post = existingPost.get();

        Optional<Community> existingCommunity = communityRepository.findById(post.getCommunity().getId());

        if (existingCommunity.isEmpty()) {
            throw new CommunityNotFound();
        }

        Community community = existingCommunity.get();

        if (!Objects.equals(community.getOwner().getId(), user.getId())) {
            throw new NoIsOwnerCommunity();
        }

        fileService.delete("post_" + post.getId());
        postRepository.deleteById(post.getId());
    }

    @Transactional
    public LikeResponse like(Long postId, HttpServletRequest req) throws PostNotFound {
        User user = jwtTokenProvider.getUser(req);
        Optional<Post> existingPost = postRepository.findById(postId);

        if (existingPost.isEmpty()) {
            throw new PostNotFound();
        }

        Post post = existingPost.get();
        List<User> likes = post.getLikes();

        if (likes.contains(user)) {
            likes.remove(user);
        } else {
            likes.add(user);
        }

        LikeResponse response = new LikeResponse();

        response.setMyLike(likes.contains(user));
        response.setCount(likes.size());

        return response;
    }
}
