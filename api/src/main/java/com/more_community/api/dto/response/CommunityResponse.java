package com.more_community.api.dto.response;

import com.more_community.api.entity.Community;
import lombok.*;

import java.util.Date;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommunityResponse {
    public Long id;
    public String avatar;
    public String banner;
    public String name;
    public String description;
    public Set<String> keywords;
    public String streamId;
    public Date createdAt;
    public boolean isCommunityOwner;
    public boolean isMyFollow;
    public Integer followersCount;

    public CommunityResponse setCommunityData(Community community) {
        this.setId(community.getId());
        this.setAvatar(community.getAvatar());
        this.setBanner(community.getBanner());
        this.setName(community.getName());
        this.setDescription(community.getDescription());
        this.setKeywords(community.getKeywords());
        this.setStreamId(community.getStreamId());
        this.setCreatedAt(community.getCreatedAt());

        return this;
    }
}
