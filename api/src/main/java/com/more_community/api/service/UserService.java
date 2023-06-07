package com.more_community.api.service;

import com.more_community.api.dto.request.LoginRequest;
import com.more_community.api.dto.request.RegistrationRequest;
import com.more_community.api.dto.request.UpdateUserRequest;
import com.more_community.api.entity.User;
import com.more_community.api.exceptions.IsNoUserUniqueEmail;
import com.more_community.api.exceptions.IsNoUserUniqueUsername;
import com.more_community.api.exceptions.NullUser;
import com.more_community.api.exceptions.UserNotFound;
import com.more_community.api.repository.UserRepository;
import com.more_community.api.security.jwt.JwtAuthenticationException;
import com.more_community.api.security.jwt.JwtTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FileService fileService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public Optional<User> getByIdForJWTTokenProvider(Long userId) {
        return userRepository.findById(userId);
    }

    public User getFromToken(HttpServletRequest req) throws UserNotFound, NullUser, JwtAuthenticationException {
        if (jwtTokenProvider.resolveToken(req) == null || !jwtTokenProvider.validateToken(req)) {
            throw new NullUser();
        }

        User user = jwtTokenProvider.getUser(req);

        Optional<User> existingUser = userRepository.findById(user.getId());

        if (existingUser.isEmpty()) {
            throw new UserNotFound();
        }

        user = existingUser.get();

        return user;
    }

    public User getByUsername(String username) throws UserNotFound {
        Optional<User> existingUser = userRepository.findByUsername(username);

        if (existingUser.isEmpty()) {
            throw new UserNotFound();
        }

        return existingUser.get();
    }

    public User registration(RegistrationRequest request) throws IsNoUserUniqueEmail, IsNoUserUniqueUsername {
        Optional<User> existingUserByUsername = userRepository.findByEmail(request.getEmail());
        Optional<User> existingUserByEmail = userRepository.findByEmail(request.getEmail());

        if (existingUserByUsername.isPresent() || existingUserByEmail.isPresent()) {

            if (existingUserByUsername.isPresent()) throw new IsNoUserUniqueUsername();
            if (existingUserByEmail.isPresent()) throw new IsNoUserUniqueEmail();
        }

        User model = new User();

        String passHash = jwtTokenProvider.passwordEncoder().encode(request.getPassword());

        model.setUsername(request.getUsername());
        model.setEmail(request.getEmail());
        model.setPassword(passHash);
        model.setCreatedAt(new Date());
        model.setFollowedCommunities(new ArrayList<>());

        User user = userRepository.save(model);

        if (request.getAvatar() != null) {
            user.setAvatar(fileService.upload(request.getAvatar(), Arrays.asList("user_" + user.getId(), "user_" + user.getId() + "_avatar")));

            userRepository.save(user);
        }

        return user;
    }

    public User update(UpdateUserRequest request, HttpServletRequest req) throws UserNotFound {
        User user = jwtTokenProvider.getUser(req);

        Optional<User> existingUser = userRepository.findById(user.getId());

        if (existingUser.isEmpty()) {
            throw new UserNotFound();
        }

        user = existingUser.get();

        User model = new User();

        model.setId(user.getId());
        model.setUsername(request.getUsername());
        model.setEmail(request.getEmail());
        model.setPassword(user.getPassword());
        model.setFollowedCommunities(user.getFollowedCommunities());
        model.setCreatedAt(new Date());

        if (request.getAvatar() != null) {
            model.setAvatar(fileService.upload(request.getAvatar(), Arrays.asList("user_" + model.getId(), "user_" + model.getId() + "_avatar")));
        }

        user = userRepository.save(model);

        return user;
    }

    public User login(LoginRequest request) throws UserNotFound {
        Optional<User> existingUser = userRepository.findByUsername(request.getUsername());

        if (existingUser.isEmpty()) {
            throw new UserNotFound();
        }

        return existingUser.get();
    }

    public void delete(HttpServletRequest req) throws UserNotFound {
        User user = jwtTokenProvider.getUser(req);

        Optional<User> existingUser = userRepository.findById(user.getId());

        if (existingUser.isEmpty()) {
            throw new UserNotFound();
        }

        user = existingUser.get();

        fileService.delete("user_" + user.getId());
        userRepository.deleteById(user.getId());
    }
}
