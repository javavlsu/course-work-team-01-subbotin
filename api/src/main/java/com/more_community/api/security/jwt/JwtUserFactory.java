package com.more_community.api.security.jwt;

import com.more_community.api.entity.User;

public final class JwtUserFactory {
    public JwtUserFactory() {
    }

    public static JwtUser create(User user) {
        return new JwtUser(
                user.getId(),
                user.getUsername(),
                user.getPassword(),
                user.getEmail()
        );
    }
}
