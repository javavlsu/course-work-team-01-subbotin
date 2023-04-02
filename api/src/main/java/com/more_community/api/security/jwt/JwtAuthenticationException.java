package com.more_community.api.security.jwt;

import javax.naming.AuthenticationException;

public class JwtAuthenticationException extends AuthenticationException {
    public JwtAuthenticationException(String msg, Throwable t) {
        super(msg);
    }

    public JwtAuthenticationException(String msg) {
        super(msg);
    }
}
