package com.more_community.api.controller;

import com.more_community.api.annotation.IsLogined;
import com.more_community.api.dto.request.QueryResponse;
import com.more_community.api.dto.request.SaveCommunityRequest;
import com.more_community.api.dto.response.CommunityResponse;
import com.more_community.api.dto.response.FollowResponse;
import com.more_community.api.dto.response.PaginationResponse;
import com.more_community.api.entity.User;
import com.more_community.api.exceptions.CommunityNotFound;
import com.more_community.api.exceptions.NoIsOwnerCommunity;
import com.more_community.api.exceptions.UserNotFound;
import com.more_community.api.service.CommunityService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping(value = "/communities")
public class CommunityController {
    @Autowired
    private CommunityService communityService;

    @GetMapping
    public ResponseEntity<QueryResponse> getAll(@RequestParam(value = "page", defaultValue = "1") Integer page, @RequestParam(value = "limit", defaultValue = "12") Integer limit, HttpServletRequest req) {
        PaginationResponse<CommunityResponse> communitiesResponse = communityService.getAll(page, limit, req);

        return ResponseEntity.ok(new QueryResponse(HttpStatus.OK.value()).withData(communitiesResponse));
    }

    @PostMapping
    @IsLogined
    public ResponseEntity<QueryResponse> create(@Valid @RequestBody SaveCommunityRequest request, HttpServletRequest req) throws UserNotFound {
        try {
            CommunityResponse communityResponse = communityService.save(request, req);

            return ResponseEntity.status(HttpStatus.CREATED).body(new QueryResponse(HttpStatus.OK.value()).withData(communityResponse));
        } catch (UserNotFound e) {
            throw new UserNotFound();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<QueryResponse> getById(@PathVariable("id") long communityId, HttpServletRequest req) throws CommunityNotFound {
        try {
            CommunityResponse communityResponse = communityService.getById(communityId, req);

            return ResponseEntity.ok(new QueryResponse(HttpStatus.OK.value()).withData(communityResponse));
        } catch (CommunityNotFound e) {
            throw new CommunityNotFound();
        }
    }

    @PutMapping("/{id}")
    @IsLogined
    public ResponseEntity<QueryResponse> update(@Valid @RequestBody SaveCommunityRequest request, @PathVariable("id") long communityId, HttpServletRequest req) throws CommunityNotFound, NoIsOwnerCommunity {
        try {
            CommunityResponse communityResponse = communityService.update(communityId, request, req);

            return ResponseEntity.status(HttpStatus.CREATED).body(new QueryResponse(HttpStatus.OK.value()).withData(communityResponse));
        } catch (CommunityNotFound e) {
            throw new CommunityNotFound();
        } catch (NoIsOwnerCommunity e) {
            throw new NoIsOwnerCommunity();
        }
    }

    @DeleteMapping("/{id}")
    @IsLogined
    public ResponseEntity<QueryResponse> delete(@PathVariable("id") long communityId, HttpServletRequest req) throws CommunityNotFound, NoIsOwnerCommunity {
        try {
            communityService.delete(communityId, req);

            return ResponseEntity.ok(new QueryResponse(HttpStatus.OK.value()).withData(true));
        } catch (CommunityNotFound e) {
            throw new CommunityNotFound();
        } catch (NoIsOwnerCommunity e) {
            throw new NoIsOwnerCommunity();
        }
    }

    @GetMapping("/{id}/followers")
    public ResponseEntity<QueryResponse> getFollowers(@PathVariable("id") long communityId) throws CommunityNotFound {
        try {
            List<User> followers = communityService.getCommunityFollowers(communityId);

            return ResponseEntity.ok(new QueryResponse(HttpStatus.OK.value()).withData(followers));
        } catch (CommunityNotFound e) {
            throw new CommunityNotFound();
        }
    }

    @PostMapping("/{id}/follow")
    @IsLogined
    public ResponseEntity<QueryResponse> follow(@PathVariable("id") long communityId, HttpServletRequest req) throws CommunityNotFound {
        try {
            FollowResponse followResponse = communityService.follow(communityId, req);

            return ResponseEntity.ok(new QueryResponse(HttpStatus.OK.value()).withData(followResponse));
        } catch (CommunityNotFound e) {
            throw new CommunityNotFound();
        }
    }
}
