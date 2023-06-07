package com.more_community.api.repository;

import com.more_community.api.entity.Community;
import com.more_community.api.entity.Vacancy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VacancyRepository extends JpaRepository<Vacancy, Long> {
    Page<Vacancy> findByCommunityOrderByCreatedAtDesc(Community community, Pageable pageable);

    List<Vacancy> findByResponsesId(Long userId);

    List<Vacancy> findTop3ByCommunityOrderByCreatedAtDesc(Community community);
}
