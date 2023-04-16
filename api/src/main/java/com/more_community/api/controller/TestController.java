package com.more_community.api.controller;

import com.more_community.api.annotation.IsLogined;
import com.more_community.api.entity.User;
import com.more_community.api.security.jwt.JwtAuthenticationException;
import com.more_community.api.security.jwt.JwtTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/test")
public class TestController {
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @GetMapping("/test")
    public ResponseEntity test() {
        return ResponseEntity.ok("Сервер жив");
    }

    @GetMapping("/test_login")
    @IsLogined
    public ResponseEntity testLogin(HttpServletRequest req) throws JwtAuthenticationException {
        User user = jwtTokenProvider.getUser(req);

        return ResponseEntity.ok(user);
    }
}
