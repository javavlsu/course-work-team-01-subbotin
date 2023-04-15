package com.more_community.api.controller;

import com.more_community.api.dto.LoginRequest;
import com.more_community.api.dto.QueryResponse;
import com.more_community.api.dto.RegistrationRequest;
import com.more_community.api.entity.Community;
import com.more_community.api.entity.User;
import com.more_community.api.security.jwt.JwtTokenProvider;
import com.more_community.api.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(value = "/authentication")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserService userService;


    @PostMapping("login")
    public ResponseEntity login(@RequestBody LoginRequest request) {
        User user = userService.getByUsername(request.getUsername());

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new QueryResponse(HttpStatus.NOT_FOUND.value()).withMessage("Такого пользователя не существует"));
        }

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        String token = jwtTokenProvider.createToken(request.getUsername());

        Map<Object, Object> response = new HashMap<>();
        response.put("username", user.getUsername());
        response.put("token", token);

        return ResponseEntity.status(HttpStatus.OK).body(new QueryResponse(HttpStatus.OK.value()).withData(response));
    }

    @PostMapping("registration")
    public ResponseEntity registration(@Valid @RequestBody RegistrationRequest request) {
        User existingUserByUsername = userService.getByUsername(request.getUsername());
        Optional<User> existingUserByEmail = userService.getByEmail(request.getEmail());

        if (existingUserByUsername != null || !existingUserByEmail.isEmpty()) {
            Map<Object, Object> errors = new HashMap<>();

            if (existingUserByUsername != null) errors.put("username", "Такой логин уже занят");
            if (!existingUserByEmail.isEmpty()) errors.put("email", "Такая почта уже занята");

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new QueryResponse(HttpStatus.BAD_REQUEST.value()).withErrors(errors));
        }

        User model = User.builder().username(request.getUsername()).avatar(request.getAvatar()).email(request.getEmail()).password(jwtTokenProvider.passwordEncoder().encode(request.getPassword())).followedCommunities(new ArrayList<>()).build();

        User user = userService.save(model);

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        String token = jwtTokenProvider.createToken(user.getUsername());

        Map<Object, Object> response = new HashMap<>();
        response.put("username", user.getUsername());
        response.put("token", token);

        return ResponseEntity.status(HttpStatus.OK).body(new QueryResponse(HttpStatus.OK.value()).withData(response));
    }
}
