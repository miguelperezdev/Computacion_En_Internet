package edu.co.icesi.introspringboot.security.filters;


import edu.co.icesi.introspringboot.security.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null) {
            System.out.println("Authorization Header: " + authHeader);
            // Separar el token: Bearer <<token>>
            if(authHeader.startsWith("Bearer ")) {
                String token = authHeader.replace("Bearer ", "");
                System.out.println("Token: " + token);
                // Extract claims
                try {
                    Claims claims = jwtService.extractAllClaims(token);
                    String email = claims.get("email").toString();
                    System.out.println("Email: " + email);
                    List<String> auths = claims.get("authorities", List.class);
                    System.out.println("Auths: " + auths);
                    List<SimpleGrantedAuthority> authorities = auths.stream().map(
                            string -> new SimpleGrantedAuthority(string)
                    ).toList();
                    //Autenticar el request
                    UsernamePasswordAuthenticationToken authtoken = new UsernamePasswordAuthenticationToken(
                            email, null, authorities
                    );
                    //Autenticamos poniendo al user en el security context holder
                    SecurityContextHolder.getContext().setAuthentication(authtoken);


                }catch (Exception e) {
                    e.printStackTrace();
                }
            }
        } else {
            System.out.println("No Authorization header present for " + request.getRequestURI());
        }
        filterChain.doFilter(request, response);
    }
}
