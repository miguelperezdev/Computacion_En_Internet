package edu.co.icesi.introspringboot.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {

    @Value("${app.security.secretkey}")
    private String secret;

    @Value("${app.security.expirationMinutes}")
    private int expirationMinutes;

    public String generateToken(UserDetails userDetails) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + 1000L * 60L * expirationMinutes);

        return Jwts.builder()
                //.setSubject(userDetails.getUsername()) // Claims del token
                .setClaims(createClaims(userDetails))
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(Keys.hmacShaKeyFor(secret.getBytes()))
                .compact();
    }

    public Map<String, Object> createClaims(UserDetails userDetails){
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", userDetails.getUsername());
        claims.put("authorities",
                userDetails.getAuthorities()
                        .stream()
                        .map(authority -> authority.getAuthority())
                        .toList());
        return claims;
    }

    public Claims extractAllClaims(String token) {
        try{
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(secret.getBytes()))
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return claims;
        } catch (ExpiredJwtException e) {
            System.out.println("Token expirado: " + e.getMessage());
            throw e;
        } catch (UnsupportedJwtException e) {
            System.out.println("Token no soportado: " + e.getMessage());
            throw e;
        } catch (MalformedJwtException e) {
            System.out.println("Token mal formado: " + e.getMessage());
            throw e;
        } catch (SignatureException e) {
            System.out.println("Firma JWT inválida: " + e.getMessage());
            throw e;
        } catch (IllegalArgumentException e) {
            System.out.println("Token vacío o nulo: " + e.getMessage());
            throw e;
        }
    }




}
