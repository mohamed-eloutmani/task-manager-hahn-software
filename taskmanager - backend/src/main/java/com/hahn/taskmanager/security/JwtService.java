package com.hahn.taskmanager.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    // 24h expiry
    private static final long EXPIRATION_MS = 24 * 60 * 60 * 1000;

    private Algorithm getAlgorithm() {
        return Algorithm.HMAC256(secret);
    }

    public String generateToken(String email) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + EXPIRATION_MS);

        return JWT.create()
                .withSubject(email)
                .withIssuedAt(now)
                .withExpiresAt(expiry)
                .sign(getAlgorithm());
    }

    public String extractEmail(String token) {
        return JWT.require(getAlgorithm())
                .build()
                .verify(token)
                .getSubject();
    }

    public boolean isTokenValid(String token, String email) {
        String subject = extractEmail(token);
        return subject != null && subject.equals(email);
    }
}
