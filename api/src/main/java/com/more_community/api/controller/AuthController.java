package com.more_community.api.controller;

import com.more_community.api.dto.request.LoginRequest;
import com.more_community.api.dto.request.QueryResponse;
import com.more_community.api.dto.request.RegistrationRequest;
import com.more_community.api.entity.User;
import com.more_community.api.exceptions.IsNoUserUniqueEmail;
import com.more_community.api.exceptions.IsNoUserUniqueUsername;
import com.more_community.api.exceptions.UserNotFound;
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

import java.util.*;

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
    public ResponseEntity<QueryResponse> login(@RequestBody LoginRequest request) throws UserNotFound {
        try {
            User user = userService.login(request);

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

            String token = jwtTokenProvider.createToken(request.getUsername());

            Map<Object, Object> response = new HashMap<>();
            response.put("username", user.getUsername());
            response.put("token", token);

            return ResponseEntity.status(HttpStatus.OK).body(new QueryResponse(HttpStatus.OK.value()).withData(response));
        } catch (UserNotFound e) {
            throw new UserNotFound();
        }
    }

    @PostMapping("registration")
    public ResponseEntity<QueryResponse> registration(@Valid @RequestBody RegistrationRequest request) throws IsNoUserUniqueEmail, IsNoUserUniqueUsername {
        try {
            User user = userService.registration(request);

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

            String token = jwtTokenProvider.createToken(user.getUsername());

            Map<Object, Object> response = new HashMap<>();
            response.put("username", user.getUsername());
            response.put("token", token);

            return ResponseEntity.status(HttpStatus.OK).body(new QueryResponse(HttpStatus.OK.value()).withData(response));
        } catch (IsNoUserUniqueUsername e) {
            Map<Object, Object> errors = new HashMap<>();

            errors.put("username", "Такой логин уже занят");

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new QueryResponse(HttpStatus.BAD_REQUEST.value()).withErrors(errors));
        } catch (IsNoUserUniqueEmail e) {
            Map<Object, Object> errors = new HashMap<>();

            errors.put("email", "Такая почта уже занята");

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new QueryResponse(HttpStatus.BAD_REQUEST.value()).withErrors(errors));
        }
    }
}
