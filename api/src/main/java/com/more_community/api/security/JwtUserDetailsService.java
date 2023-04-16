package com.more_community.api.security;

import com.more_community.api.entity.User;
import com.more_community.api.security.jwt.JwtUser;
import com.more_community.api.security.jwt.JwtUserFactory;
import com.more_community.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {
    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.getByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("");
        }

        return JwtUserFactory.create(user);
    }
}
