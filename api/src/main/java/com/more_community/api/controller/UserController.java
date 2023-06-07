package com.more_community.api.controller;

import com.more_community.api.annotation.IsLogined;
import com.more_community.api.dto.request.QueryResponse;
import com.more_community.api.dto.request.UpdateUserRequest;
import com.more_community.api.dto.response.CommunityResponse;
import com.more_community.api.dto.response.PostResponse;
import com.more_community.api.dto.response.VacancyResponse;
import com.more_community.api.entity.Comment;
import com.more_community.api.entity.User;
import com.more_community.api.exceptions.NullUser;
import com.more_community.api.exceptions.UserNotFound;
import com.more_community.api.security.jwt.JwtAuthenticationException;
import com.more_community.api.service.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping(value = "/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private CommunityService communityService;

    @Autowired
    private PostService postService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private VacancyService vacancyService;

    @GetMapping
    public ResponseEntity<QueryResponse> get(HttpServletRequest req) throws UserNotFound, NullUser, JwtAuthenticationException {
        try {
            User user = userService.getFromToken(req);

            return ResponseEntity.ok(new QueryResponse(HttpStatus.OK.value()).withData(user));
        } catch (UserNotFound e) {
            throw new UserNotFound();
        } catch (NullUser e) {
            return ResponseEntity.ok(new QueryResponse(HttpStatus.OK.value()));
        }
    }

    @PutMapping
    @IsLogined
    public ResponseEntity<QueryResponse> update(@Valid @RequestBody UpdateUserRequest request, HttpServletRequest req) throws UserNotFound {
        try {
            User user = userService.update(request, req);

            return ResponseEntity.ok(new QueryResponse(HttpStatus.CREATED.value()).withData(user));
        } catch (UserNotFound e) {
            throw new UserNotFound();
        }
    }

    @DeleteMapping
    @IsLogined
    public ResponseEntity<QueryResponse> delete(HttpServletRequest req) throws UserNotFound {
        try {
            userService.delete(req);

            return ResponseEntity.ok(new QueryResponse(HttpStatus.OK.value()).withData(true));
        } catch (UserNotFound e) {
            throw new UserNotFound();
        }
    }

    @GetMapping("/followed-communities")
    @IsLogined
    public ResponseEntity<QueryResponse> getFollowedCommunities(HttpServletRequest req) throws UserNotFound {
        List<CommunityResponse> communitiesResponse = communityService.getUserFollowedCommunities(req);

        return ResponseEntity.ok(new QueryResponse(HttpStatus.OK.value()).withData(communitiesResponse));
    }

    @GetMapping("/my-communities")
    @IsLogined
    public ResponseEntity<QueryResponse> getMyCommunities(HttpServletRequest req) {
        List<CommunityResponse> communitiesResponse = communityService.getOwnerCommunities(req);

        return ResponseEntity.ok(new QueryResponse(HttpStatus.OK.value()).withData(communitiesResponse));
    }

    @GetMapping("/my-likes")
    @IsLogined
    public ResponseEntity<QueryResponse> getMyLikes(HttpServletRequest req) {
        List<PostResponse> postsResponse = postService.getUserLikedPosts(req);

        return ResponseEntity.ok(new QueryResponse(HttpStatus.OK.value()).withData(postsResponse));
    }

    @GetMapping("/my-comments")
    @IsLogined
    public ResponseEntity<QueryResponse> getMyComments(HttpServletRequest req) {
        List<Comment> comments = commentService.getUserComments(req);

        return ResponseEntity.ok(new QueryResponse(HttpStatus.OK.value()).withData(comments));
    }

    @GetMapping("/my-vacancies-responses")
    @IsLogined
    public ResponseEntity<QueryResponse> getMyVacanciesResponses(HttpServletRequest req) {
        List<VacancyResponse> vacanciesResponse = vacancyService.getUserResponses(req);

        return ResponseEntity.ok(new QueryResponse(HttpStatus.OK.value()).withData(vacanciesResponse));
    }
}
