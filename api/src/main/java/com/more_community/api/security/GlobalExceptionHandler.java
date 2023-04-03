package com.more_community.api.security;

import com.more_community.api.security.jwt.JwtAuthenticationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.more_community.api.dto.QueryResponse;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.sql.SQLException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity handleAuthenticationExceptions(AuthenticationException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new QueryResponse(HttpStatus.FORBIDDEN.value()).withMessage("Возникли ошибки при авторизации, проверьте правильно ли вы ввели имя или пароль"));
    }

    @ExceptionHandler(SQLException.class)
    public ResponseEntity handleSQLException(){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new QueryResponse(HttpStatus.INTERNAL_SERVER_ERROR.value()).withMessage("Возникли проблемы на стороне сервера, попробуйте позже"));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, List<String>> errorResponse = new HashMap<>();

        ex.getBindingResult().getFieldErrors().stream().forEach(err -> errorResponse.put(err.getField(), Collections.singletonList(err.getDefaultMessage())));

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new QueryResponse(HttpStatus.BAD_REQUEST.value()).withMessage("Возникли ошибки при выполнении запроса").withErrors(errorResponse));
    }
}
