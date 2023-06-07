package com.more_community.api.security;

import com.more_community.api.dto.request.QueryResponse;
import com.more_community.api.exceptions.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.sql.SQLException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<QueryResponse> handleAuthenticationExceptions(AuthenticationException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new QueryResponse(HttpStatus.FORBIDDEN.value()).withMessage("Возникли ошибки при авторизации, проверьте правильно ли вы ввели имя или пароль"));
    }

    @ExceptionHandler(SQLException.class)
    public ResponseEntity<QueryResponse> handleSQLException() {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new QueryResponse(HttpStatus.INTERNAL_SERVER_ERROR.value()).withMessage("Возникли проблемы на стороне сервера, попробуйте позже"));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<QueryResponse> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, List<String>> errorResponse = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(err -> errorResponse.put(err.getField(), Collections.singletonList(err.getDefaultMessage())));

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new QueryResponse(HttpStatus.BAD_REQUEST.value()).withMessage("Возникли ошибки при выполнении запроса").withErrors(errorResponse));
    }

    @ExceptionHandler(CommunityNotFound.class)
    public ResponseEntity<QueryResponse> handleCommunityNotFoundExceptions(CommunityNotFound ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new QueryResponse(HttpStatus.NOT_FOUND.value()).withMessage("Такого сообщества не существует"));
    }

    @ExceptionHandler(NoIsOwnerCommunity.class)
    public ResponseEntity<QueryResponse> handleMotIsOwnerCommunityExceptions(NoIsOwnerCommunity ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new QueryResponse(HttpStatus.FORBIDDEN.value()).withMessage("У вас нет прав"));
    }

    @ExceptionHandler(PostNotFound.class)
    public ResponseEntity<QueryResponse> handlePostNotFoundExceptions(PostNotFound ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new QueryResponse(HttpStatus.NOT_FOUND.value()).withMessage("Такого поста не существует"));
    }

    @ExceptionHandler(CommentNotFound.class)
    public ResponseEntity<QueryResponse> handleCommentNotFoundExceptions(CommentNotFound ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new QueryResponse(HttpStatus.NOT_FOUND.value()).withMessage("Такого комментария не существует"));
    }

    @ExceptionHandler(NoIsOwnerComment.class)
    public ResponseEntity<QueryResponse> handleMotIsOwnerCommentExceptions(NoIsOwnerComment ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new QueryResponse(HttpStatus.FORBIDDEN.value()).withMessage("У вас нет прав"));
    }

    @ExceptionHandler(VacancyNotFound.class)
    public ResponseEntity<QueryResponse> handleVacancyNotFoundExceptions(VacancyNotFound ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new QueryResponse(HttpStatus.NOT_FOUND.value()).withMessage("Такой вакансии не существует"));
    }

    @ExceptionHandler(UserNotFound.class)
    public ResponseEntity<QueryResponse> handleUserNotFoundExceptions(UserNotFound ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new QueryResponse(HttpStatus.NOT_FOUND.value()).withMessage("Такого пользователя не существует"));
    }
}
