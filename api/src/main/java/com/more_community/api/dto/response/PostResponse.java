package com.more_community.api.dto.response;

import com.more_community.api.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostResponse {
    public Long id;
    public String title;
    public String content;
    public Set<String> attachments;
    public Date createdAt;
    public boolean isMyLike;
    public Integer likesCount;
    public Integer commentsCount;
    public boolean isCommunityOwner;

    public PostResponse setPostData(Post post) {
        this.setId(post.getId());
        this.setTitle(post.getTitle());
        this.setContent(post.getContent());
        this.setAttachments(post.getAttachments());
        this.setCreatedAt(post.getCreatedAt());

        return this;
    }
}
