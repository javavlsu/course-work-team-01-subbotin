package com.more_community.api.service;

import com.more_community.api.dto.request.SaveVacancyRequest;
import com.more_community.api.dto.response.CommunityResponse;
import com.more_community.api.dto.response.PaginationResponse;
import com.more_community.api.dto.response.RespondToVacancyResponse;
import com.more_community.api.dto.response.VacancyResponse;
import com.more_community.api.entity.Community;
import com.more_community.api.entity.User;
import com.more_community.api.entity.Vacancy;
import com.more_community.api.exceptions.CommunityNotFound;
import com.more_community.api.exceptions.NoIsOwnerCommunity;
import com.more_community.api.exceptions.VacancyNotFound;
import com.more_community.api.repository.CommunityRepository;
import com.more_community.api.repository.VacancyRepository;
import com.more_community.api.security.jwt.JwtTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class VacancyService {
    @Autowired
    private VacancyRepository vacancyRepository;

    @Autowired
    private CommunityRepository communityRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public PaginationResponse<VacancyResponse> getAll(Integer page, Integer limit, HttpServletRequest req) {
        User user = jwtTokenProvider.getUser(req);
        Page<Vacancy> vacancies = vacancyRepository.findAll(PageRequest.of(Math.max(page - 1, 0), limit));
        List<VacancyResponse> vacanciesResponses = new ArrayList<>();

        for (Vacancy vacancy : vacancies) {
            VacancyResponse vacancyResponse = new VacancyResponse().setVacancyData(vacancy);

            vacancyResponse.setResponsesCount(vacancy.getResponses().size());
            vacancyResponse.setMyResponse(user != null && vacancy.getResponses().contains(user));
            vacancyResponse.setCommunityOwner(Objects.equals(vacancy.getCommunity().getOwner().getId(), user.getId()));

            vacanciesResponses.add(vacancyResponse);
        }

        PaginationResponse<VacancyResponse> paginationResponse = new PaginationResponse<VacancyResponse>();

        paginationResponse.setItems(vacanciesResponses);
        paginationResponse.setPage(vacancies.getNumber() + 1);
        paginationResponse.setLimit(limit);
        paginationResponse.setCount(vacancies.getTotalPages());

        return paginationResponse;
    }

    public VacancyResponse getById(Long vacancyId, HttpServletRequest req) throws VacancyNotFound {
        User user = jwtTokenProvider.getUser(req);
        Optional<Vacancy> existingVacancy = vacancyRepository.findById(vacancyId);

        if (existingVacancy.isEmpty()) {
            throw new VacancyNotFound();
        }

        Vacancy vacancy = existingVacancy.get();
        VacancyResponse vacancyResponse = new VacancyResponse();

        vacancyResponse.setVacancyData(vacancy);
        vacancyResponse.setResponsesCount(vacancy.getResponses().size());
        vacancyResponse.setMyResponse(user != null && vacancy.getResponses().contains(user));
        vacancyResponse.setCommunityOwner(Objects.equals(vacancy.getCommunity().getOwner().getId(), user.getId()));

        return vacancyResponse;
    }

    public List<VacancyResponse> getUserResponses(HttpServletRequest req) {
        User user = jwtTokenProvider.getUser(req);
        List<Vacancy> vacancies = vacancyRepository.findByResponsesId(user.getId());
        List<VacancyResponse> vacanciesResponses = new ArrayList<>();

        for (Vacancy vacancy : vacancies) {
            VacancyResponse vacancyResponse = new VacancyResponse().setVacancyData(vacancy);

            vacancyResponse.setResponsesCount(vacancy.getResponses().size());
            vacancyResponse.setMyResponse(vacancy.getResponses().contains(user));
            vacancyResponse.setCommunityOwner(Objects.equals(vacancy.getCommunity().getOwner().getId(), user.getId()));

            vacanciesResponses.add(vacancyResponse);
        }

        return vacanciesResponses;
    }

    public List<User> getVacancyResponses(Long vacancyId) {
        Optional<Vacancy> existingVacancy = vacancyRepository.findById(vacancyId);

        if (existingVacancy.isEmpty()) {
            throw new VacancyNotFound();
        }

        Vacancy vacancy = existingVacancy.get();

        return vacancy.getResponses();
    }

    public PaginationResponse<VacancyResponse> getCommunityVacancies(Integer page, Integer limit, Long communityId, HttpServletRequest req) throws CommunityNotFound {
        User user = jwtTokenProvider.getUser(req);
        Optional<Community> existingCommunity = communityRepository.findById(communityId);

        if (existingCommunity.isEmpty()) {
            throw new CommunityNotFound();
        }

        Community community = existingCommunity.get();
        Page<Vacancy> vacancies = vacancyRepository.findByCommunityOrderByCreatedAtDesc(community, PageRequest.of(Math.max(page - 1, 0), limit));
        List<VacancyResponse> vacanciesResponses = new ArrayList<>();

        for (Vacancy vacancy : vacancies) {
            VacancyResponse vacancyResponse = new VacancyResponse().setVacancyData(vacancy);

            vacancyResponse.setResponsesCount(vacancy.getResponses().size());
            vacancyResponse.setMyResponse(vacancy.getResponses().contains(user));
            vacancyResponse.setCommunityOwner(Objects.equals(community.getOwner().getId(), user.getId()));

            vacanciesResponses.add(vacancyResponse);
        }

        PaginationResponse<VacancyResponse> paginationResponse = new PaginationResponse<VacancyResponse>();

        paginationResponse.setItems(vacanciesResponses);
        paginationResponse.setPage(vacancies.getNumber() + 1);
        paginationResponse.setLimit(limit);
        paginationResponse.setCount(vacancies.getTotalPages());

        return paginationResponse;
    }

    public List<VacancyResponse> getLastCommunityVacancies(Long communityId, HttpServletRequest req) throws CommunityNotFound {
        User user = jwtTokenProvider.getUser(req);
        Optional<Community> existingCommunity = communityRepository.findById(communityId);

        if (existingCommunity.isEmpty()) {
            throw new CommunityNotFound();
        }

        Community community = existingCommunity.get();
        List<Vacancy> vacancies = vacancyRepository.findTop3ByCommunityOrderByCreatedAtDesc(community);
        List<VacancyResponse> vacanciesResponses = new ArrayList<>();

        for (Vacancy vacancy : vacancies) {
            VacancyResponse vacancyResponse = new VacancyResponse().setVacancyData(vacancy);

            vacancyResponse.setResponsesCount(vacancy.getResponses().size());
            vacancyResponse.setMyResponse(vacancy.getResponses().contains(user));
            vacancyResponse.setCommunityOwner(Objects.equals(community.getOwner().getId(), user.getId()));

            vacanciesResponses.add(vacancyResponse);
        }

        return vacanciesResponses;
    }

    public VacancyResponse save(SaveVacancyRequest request, HttpServletRequest req) throws CommunityNotFound, NoIsOwnerCommunity {
        User user = jwtTokenProvider.getUser(req);
        Optional<Community> existingCommunity = communityRepository.findById(request.getCommunityId());

        if (existingCommunity.isEmpty()) {
            throw new CommunityNotFound();
        }

        Community community = existingCommunity.get();

        if (!Objects.equals(community.getOwner().getId(), user.getId())) {
            throw new NoIsOwnerCommunity();
        }

        Vacancy model = new Vacancy();

        model.setTitle(request.getTitle());
        model.setContent(request.getContent());
        model.setKeywords(request.getKeywords());
        model.setCurrency(request.getCurrency());
        model.setMinSalary(request.getMinSalary());
        model.setMaxSalary(request.getMaxSalary());
        model.setViews(0);
        model.setCreatedAt(new Date());
        model.setCommunity(community);

        Vacancy vacancy = vacancyRepository.save(model);

        VacancyResponse vacancyResponse = new VacancyResponse();

        vacancyResponse.setVacancyData(vacancy);
        vacancyResponse.setResponsesCount(0);
        vacancyResponse.setMyResponse(false);
        vacancyResponse.setCommunityOwner(true);

        return vacancyResponse;
    }

    public VacancyResponse update(Long vacancyId, SaveVacancyRequest request, HttpServletRequest req) throws VacancyNotFound, CommunityNotFound, NoIsOwnerCommunity {
        User user = jwtTokenProvider.getUser(req);
        Optional<Vacancy> existingVacancy = vacancyRepository.findById(vacancyId);

        if (existingVacancy.isEmpty()) {
            throw new VacancyNotFound();
        }

        Vacancy vacancy = existingVacancy.get();

        Optional<Community> existingCommunity = communityRepository.findById(vacancy.getCommunity().getId());

        if (existingCommunity.isEmpty()) {
            throw new CommunityNotFound();
        }

        Community community = existingCommunity.get();

        if (!Objects.equals(community.getOwner().getId(), user.getId())) {
            throw new NoIsOwnerCommunity();
        }

        Vacancy model = new Vacancy();

        model.setId(vacancy.getId());
        model.setTitle(request.getTitle());
        model.setContent(request.getContent());
        model.setKeywords(request.getKeywords());
        model.setCurrency(request.getCurrency());
        model.setMinSalary(request.getMinSalary());
        model.setMaxSalary(request.getMaxSalary());
        model.setViews(vacancy.getViews());
        model.setCreatedAt(vacancy.getCreatedAt());
        model.setCommunity(community);
        model.setResponses(vacancy.getResponses());

        vacancy = vacancyRepository.save(model);

        VacancyResponse vacancyResponse = new VacancyResponse();

        vacancyResponse.setVacancyData(vacancy);
        vacancyResponse.setResponsesCount(vacancy.getResponses().size());
        vacancyResponse.setMyResponse(vacancy.getResponses().contains(user));
        vacancyResponse.setCommunityOwner(Objects.equals(community.getOwner().getId(), user.getId()));

        return vacancyResponse;
    }

    public void delete(Long vacancyId, HttpServletRequest req) throws VacancyNotFound, CommunityNotFound, NoIsOwnerCommunity {
        User user = jwtTokenProvider.getUser(req);
        Optional<Vacancy> existingVacancy = vacancyRepository.findById(vacancyId);

        if (existingVacancy.isEmpty()) {
            throw new VacancyNotFound();
        }

        Vacancy vacancy = existingVacancy.get();

        Optional<Community> existingCommunity = communityRepository.findById(vacancy.getCommunity().getId());

        if (existingCommunity.isEmpty()) {
            throw new CommunityNotFound();
        }

        Community community = existingCommunity.get();

        if (!Objects.equals(community.getOwner().getId(), user.getId())) {
            throw new NoIsOwnerCommunity();
        }

        vacancyRepository.deleteById(vacancy.getId());
    }

    @Transactional
    public RespondToVacancyResponse respond(Long vacancyId, HttpServletRequest req) throws VacancyNotFound {
        User user = jwtTokenProvider.getUser(req);
        Optional<Vacancy> existingVacancy = vacancyRepository.findById(vacancyId);

        if (existingVacancy.isEmpty()) {
            throw new VacancyNotFound();
        }

        Vacancy vacancy = existingVacancy.get();
        List<User> responses = vacancy.getResponses();

        if (responses.contains(user)) {
            responses.remove(user);
        } else {
            responses.add(user);
        }

        RespondToVacancyResponse response = new RespondToVacancyResponse();

        response.setMyResponse(responses.contains(user));
        response.setCount(responses.size());

        return response;
    }
}
