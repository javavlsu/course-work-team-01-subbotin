package com.more_community.api.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.more_community.api.entity.User;
import com.more_community.api.security.jwt.JwtTokenProvider;

@RestController
@RequestMapping(value = "/test")
public class TestController {
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @GetMapping()
    public ResponseEntity test(HttpServletRequest req) {
        User user = jwtTokenProvider.getUser(req);

        return ResponseEntity.ok(user);
    }
}