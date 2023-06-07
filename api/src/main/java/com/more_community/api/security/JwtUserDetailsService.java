package com.more_community.api.security;

import com.more_community.api.entity.User;
import com.more_community.api.exceptions.UserNotFound;
import com.more_community.api.security.jwt.JwtUserFactory;
import com.more_community.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {
    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UserNotFound {
        try {
            User user = userService.getByUsername(username);

            return JwtUserFactory.create(user);
        } catch (UserNotFound e) {
            throw new UserNotFound();
        }
    }
}
