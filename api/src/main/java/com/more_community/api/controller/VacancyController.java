package com.more_community.api.controller;

import com.more_community.api.annotation.IsLogined;
import com.more_community.api.dto.request.QueryResponse;
import com.more_community.api.dto.request.SaveVacancyRequest;
import com.more_community.api.dto.response.*;
import com.more_community.api.entity.User;
import com.more_community.api.exceptions.CommunityNotFound;
import com.more_community.api.exceptions.NoIsOwnerCommunity;
import com.more_community.api.exceptions.VacancyNotFound;
import com.more_community.api.service.VacancyService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping(value = "/vacancies")
public class VacancyController {
    @Autowired
    private VacancyService vacancyService;

    @GetMapping
    public ResponseEntity<QueryResponse> getAll(@RequestParam(value = "page", defaultValue = "1") Integer page, @RequestParam(value = "limit", defaultValue = "20") Integer limit, HttpServletRequest req) {
        PaginationResponse<VacancyResponse> vacanciesResponse = vacancyService.getAll(page, limit, req);

        return ResponseEntity.ok(new QueryResponse(HttpStatus.OK.value()).withData(vacanciesResponse));
    }

    @PostMapping
    @IsLogined
    public ResponseEntity<QueryResponse> create(@Valid @RequestBody SaveVacancyRequest request, HttpServletRequest req) throws CommunityNotFound, NoIsOwnerCommunity {
        try {
            VacancyResponse vacancyResponse = vacancyService.save(request, req);

            return ResponseEntity.status(HttpStatus.CREATED).body(new QueryResponse(HttpStatus.CREATED.value()).withData(vacancyResponse));
        } catch (CommunityNotFound e) {
            throw new CommunityNotFound();
        } catch (NoIsOwnerCommunity e) {
            throw new NoIsOwnerCommunity();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<QueryResponse> getById(@PathVariable("id") long vacancyId, HttpServletRequest req) throws VacancyNotFound {
        try {
            VacancyResponse vacancyResponse = vacancyService.getById(vacancyId, req);

            return ResponseEntity.ok(new QueryResponse(HttpStatus.OK.value()).withData(vacancyResponse));
        } catch (VacancyNotFound e) {
            throw new VacancyNotFound();
        }
    }

    @PutMapping("/{id}")
    @IsLogined
    public ResponseEntity<QueryResponse> update(@Valid @RequestBody SaveVacancyRequest request, @PathVariable("id") long vacancyId, HttpServletRequest req) throws VacancyNotFound, CommunityNotFound, NoIsOwnerCommunity {
        try {
            VacancyResponse vacancyResponse = vacancyService.update(vacancyId, request, req);

            return ResponseEntity.status(HttpStatus.CREATED).body(new QueryResponse(HttpStatus.CREATED.value()).withData(vacancyResponse));
        } catch (VacancyNotFound e) {
            throw new VacancyNotFound();
        } catch (CommunityNotFound e) {
            throw new CommunityNotFound();
        } catch (NoIsOwnerCommunity e) {
            throw new NoIsOwnerCommunity();
        }
    }

    @DeleteMapping("/{id}")
    @IsLogined
    public ResponseEntity<QueryResponse> delete(@PathVariable("id") long vacancyId, HttpServletRequest req) throws VacancyNotFound, CommunityNotFound, NoIsOwnerCommunity {
        try {
            vacancyService.delete(vacancyId, req);

            return ResponseEntity.status(HttpStatus.OK).body(new QueryResponse(HttpStatus.OK.value()).withData(true));
        } catch (VacancyNotFound e) {
            throw new VacancyNotFound();
        } catch (CommunityNotFound e) {
            throw new CommunityNotFound();
        } catch (NoIsOwnerCommunity e) {
            throw new NoIsOwnerCommunity();
        }
    }

    @GetMapping("/community/{id}")
    public ResponseEntity<QueryResponse> getCommunityVacancies(@RequestParam(value = "page", defaultValue = "1") Integer page, @RequestParam(value = "limit", defaultValue = "10") Integer limit, @PathVariable("id") long communityId, HttpServletRequest req) throws CommunityNotFound {
        try {
            PaginationResponse<VacancyResponse> vacanciesResponse = vacancyService.getCommunityVacancies(page, limit, communityId, req);

            return ResponseEntity.ok(new QueryResponse(HttpStatus.OK.value()).withData(vacanciesResponse));
        } catch (CommunityNotFound e) {
            throw new CommunityNotFound();
        }
    }

    @GetMapping("/community/{id}/last")
    public ResponseEntity<QueryResponse> getLastCommunityVacancies(@PathVariable("id") long communityId, HttpServletRequest req) throws CommunityNotFound {
        try {
            List<VacancyResponse> vacanciesResponse = vacancyService.getLastCommunityVacancies(communityId, req);

            return ResponseEntity.ok(new QueryResponse(HttpStatus.OK.value()).withData(vacanciesResponse));
        } catch (CommunityNotFound e) {
            throw new CommunityNotFound();
        }
    }

    @GetMapping("/{id}/responses")
    public ResponseEntity<QueryResponse> getResponses(@PathVariable("id") long vacancyId) throws VacancyNotFound {
        try {
            List<User> responses = vacancyService.getVacancyResponses(vacancyId);

            return ResponseEntity.ok(new QueryResponse(HttpStatus.OK.value()).withData(responses));
        } catch (VacancyNotFound e) {
            throw new VacancyNotFound();
        }
    }

    @PostMapping("/{id}/respond")
    @IsLogined
    public ResponseEntity<QueryResponse> respond(@PathVariable("id") long vacancyId, HttpServletRequest req) throws VacancyNotFound {
        try {
            RespondToVacancyResponse response = vacancyService.respond(vacancyId, req);

            return ResponseEntity.ok(new QueryResponse(HttpStatus.OK.value()).withData(response));
        } catch (VacancyNotFound e) {
            throw new VacancyNotFound();
        }
    }
}
