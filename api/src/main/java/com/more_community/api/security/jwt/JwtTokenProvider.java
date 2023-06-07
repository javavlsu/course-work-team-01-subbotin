package com.more_community.api.security.jwt;

import com.more_community.api.entity.User;
import com.more_community.api.exceptions.UserNotFound;
import com.more_community.api.service.UserService;
import io.jsonwebtoken.*;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Date;
import java.util.Optional;

@Component
public class JwtTokenProvider {
    @Value("${jwt.token.secret}")
    private String secret;

    @Value("${jwt.token.expired}")
    private long validityInMilliseconds;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserService userService;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @PostConstruct
    protected void init() {
        secret = Base64.getEncoder().encodeToString(secret.getBytes());
    }

    public String createToken(String username) {

        Claims claims = Jwts.claims().setSubject(username);

        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        return Jwts.builder().setClaims(claims).setIssuedAt(now).setExpiration(validity).signWith(SignatureAlgorithm.HS256, secret).compact();
    }

    public Authentication getAuthentication(String token) throws UserNotFound {
        try {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(getUsername(token));

            return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
        } catch (UserNotFound e) {
            throw new UserNotFound();
        }
    }

    public String getUsername(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody().getSubject();
    }

    public String resolveToken(HttpServletRequest req) {
        String bearerToken = req.getHeader("Authorization");

        if (bearerToken == null) {
            return null;
        }

        if (bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }

        return null;
    }

    public User getUser(HttpServletRequest req) throws UserNotFound {
        try {
            String token = resolveToken(req);

            if (token != null) {
                Authentication auth = getAuthentication(token);

                JwtUser jwtUser = (JwtUser) auth.getPrincipal();

                    Optional<User> existingUser = userService.getByIdForJWTTokenProvider(jwtUser.getId());

                return existingUser.orElse(null);
            }

            return null;
        } catch (UserNotFound e) {
            throw new UserNotFound();
        }
    }

    public boolean validateToken(HttpServletRequest req) throws JwtAuthenticationException {
        String token = resolveToken(req);

        if (token != null) {
            try {
                Jws<Claims> claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token);

                return !claims.getBody().getExpiration().before(new Date());
            } catch (JwtException | IllegalArgumentException e) {
                throw new JwtAuthenticationException("");
            }
        }

        return true;
    }
}
